import {useState} from 'react'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

function Postpopup() {
  const userId = Cookies.get('userId')
  const [caption, setCaption] = useState("")
  const [file, setFile] = useState(null)

   const uploadImage = async () => {
     if (!file) {
       alert("Please select an image");
       return;
     }
 
     const formData = new FormData();
     formData.append("image", file);
     formData.append("user_id", userId)
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

  return (
    <div className="popup-container">
        <Popup
            modal
            trigger={
            <button className="edit-btn">Add Post +</button>
            }>
            <div className='popup-div'>
            <input type='file'  accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e) => setFile(e.target.files[0])}/>  
            <input type="text" className='caption' onChange={(e)=>setCaption(e.target.value)} placeholder="Enter Caption"/>
            <button onClick={uploadImage} className='add-post-btn'>Add</button>
            </div>
        </Popup>
    </div>
  )
}

export default Postpopup