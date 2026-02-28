const express = require('express');
const path = require('path');

const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const multer = require("multer");
const dotenv = require('dotenv');

app.use(cors());
app.use(express.json());

dotenv.config();

const bcrypt = require('bcrypt')

const dbPath = path.join(__dirname, 'database.db');

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(5000, () => {
      console.log('Server Running at http://localhost:5000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ dest: "temp/" });


const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Login api
app.post('/login', async (request, response) => {
  const {email, password} = request.body
  const getQuery = `select * from users where email = '${email}'`
  const dbUser = await db.get(getQuery)

  if (dbUser === undefined) {
    response.status(400)
    response.send({error_msg: 'Invalid User'})
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)

    if (isPasswordMatched === true) {
      const payload = {id: dbUser.id, email: dbUser.email}
      const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN')
      response.status(200)
      response.send({jwt_token: jwtToken, userId : dbUser.id})
    } else {
      response.status(400)
      response.json({error_msg: 'Invalid Password'})
    }
  }
})

app.post('/posts', async (req, res) => {
  const {user_id, caption, img} = req.body
  const addQuery = `insert into posts(user_id, caption, img)
  values(${user_id}, '${caption}', '${img}')`
  const response = await db.run(addQuery)
  const newId = response.lastID
  res.send(`added post ${newId}`)
})

app.get('/users/:userId', async (req, res) => {
  const {userId} = req.params
  const getquery = `select * from users where id = ${userId}`
  const response = await db.get(getquery)
  res.send(response)
})

app.get('/posts/:userId', async (req, res) => {
  const {userId} = req.params
  const getquery = `select * from posts where user_id = ${userId}`
  const response = await db.all(getquery)
  res.send(response)
})

app.delete('/posts/:postId', async (req, res) => {
  const {postId} = req.params
  const deleteQuery = `delete from posts where post_id = ${postId}`
  await db.run(deleteQuery)
  res.send('Post removed')
})

app.get('/posts', async (req, res) => {
  const getquery = `select u.name, p.post_id, p.user_id, p.caption, p.img from posts p inner join users u on
  p.user_id= u.id order by caption`
  const response = await db.all(getquery)
  res.send(response)
})

app.put('/posts/:postId', async (req, res) => {
  const {postId} = req.params
  const {caption} = req.body
  const updateQuery = `update posts set caption = '${caption}'
  where post_id = ${postId}`
  await db.run(updateQuery)
  res.send('caption updated successfully')
})

const fs = require("fs");

app.post("/upload", upload.single("image"),async (req, res) => {
  const {user_id, caption} = req.body
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "my_app_images",
    });

    // Cloud URL
    const imageUrl = result.secure_url;
    
    db.run(
      "INSERT INTO posts (user_id, caption, img) VALUES (?, ?, ?)",
      [ user_id, caption, imageUrl],
      function (err) {
        if (err) return res.status(500).json(err);

        res.json({
          id: this.lastID,
          imageUrl,
        });
      }
    );
     // Remove temp file
    fs.unlinkSync(req.file.path);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.get('/userprofile/:id', async (req, res)=>{
  const {id} = req.params
  const addQuery = `select * from user_profiles where user_id =${id}`
  const response = await db.all(addQuery)
  res.send(response)
})

module.exports = app
