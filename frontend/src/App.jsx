import { useState, useEffect } from 'react';
import './App.css'

function App() {
  
  const [file, setFile] = useState(null)
  const [images, setImages] = useState([])
  const [user_id, setUserID] = useState(1)
  const [caption, setCaption] = useState("All is Well")

  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }


    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", user_id)
    formData.append("caption", caption)
    
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    await response.json();
    if (response.ok){
      console.log("image uploaded successfully")
     
    }
  }

  useEffect(()=>{
    const getImages = async () => {
      const response = await fetch("http://localhost:5000/images")
      const data = await response.json()
      setImages(data)
    }
    getImages()
  },[])



  return (
    <>
      <div className='container'>
        <div className='form'>
          <h1>Hello</h1>
          <input type='file'  accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e) => setFile(e.target.files[0])}/>
          
          <button onClick={uploadImage} >Upload</button>
        </div>
        <ul>{images.map(each => (
          <li key={each.id}>
            <img src={each.image} alt="image"/>
          </li>
        ))
          
          }

        </ul>
      </div>
    </>
  )
}

export default App
