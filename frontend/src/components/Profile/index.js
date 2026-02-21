import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import Header from "../Header"
import './index.css'

function Profile(){

    const [details, setDetails] = useState([])
    const [posts, setPosts] = useState([])
    const [caption, setCaption] = useState("")
    const [editCation, setEditCation] = useState(false)
    const [postId, setPostid] = useState("")
    const [addPost, setAddPost] = useState(false)
    const [file, setFile] = useState(null)

    const {id} = useParams();

  useEffect(()=>{
  const fetchData = async () =>{
    const profileRes = await fetch(`https://userpost-management.onrender.com/users/${id}`);
    const profileData = await profileRes.json();
    setDetails(profileData)

    const postRes = await fetch(`https://userpost-management.onrender.com/posts/${id}`);
    const postData = await postRes.json();
    setPosts(postData)
  }
  fetchData()
    },[id])

  const onSaveCaption = async ()=> {
    const url =`https://userpost-management.onrender.com/posts/${postId}`
    const newData = {caption}
    const options ={
      method : 'PUT',
      headers : {
            "Content-Type" : "application/json"
        },
            body : JSON.stringify(newData),
    }
    await fetch(url, options)
    setCaption("")
  
  }

  const onChangeCaption =e =>{
    setCaption(e.target.value)
  }

  const onClickEdit = (id) => {
    setEditCation(true)
    setPostid(id)
  }

  const onClickDelPost = async id =>{
    const url =`https://userpost-management.onrender.com/posts/${id}`

    const options = {
      method : 'DELETE',
    }

    await fetch(url, options)
    
  }

  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", id)
    formData.append("caption", caption)
    
    const response = await fetch("https://userpost-management.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    await response.json();
    if (response.ok){
      console.log("image uploaded successfully")
    }
  }

  const {email, name} = details

  return (
    <div className="profile-bg">
      <Header />
      <div className="profile-bio">
        <h1 className="profile-head">Profile</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
      </div>
      <hr/>
      {editCation && <div className="caption-input">
              <input type="text" onChange={onChangeCaption} placeholder="Enter New Caption"/>
              <button onClick={onSaveCaption}>Save</button>
              </div>}
      {addPost && <div className="caption-input">
        <input type='file'  accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e) => setFile(e.target.files[0])}/>
        <br/>
        <input type="text" onChange={onChangeCaption} placeholder="Enter New Caption"/>
        <button onClick={uploadImage}>Add</button>
        </div>
        }
      <ul className="profile-posts">
        <div className="post-head">
          <h1 className="profile-head">Posts</h1>
          <button onClick={()=>setAddPost(true)}>Add Post</button>
        </div>
        {posts.map(each => (
          <li key={each.post_id} className="profile-list">
            <img src={each.img} className="profile-img" alt="post"/>
            <p>{each.caption}</p>
            <div className="button-div">
            <button className="edit-btn" onClick={() =>onClickEdit(each.post_id)}>Edit caption</button>
            <button className="del-btn" onClick={()=>onClickDelPost(each.post_id)}>Del Post</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile