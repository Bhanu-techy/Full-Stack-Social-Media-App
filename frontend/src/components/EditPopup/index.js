import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import { CiEdit } from "react-icons/ci";
import './index.css'

function EditPopup({post_id}) {

    const [caption, setCaption] = useState("")
    const [postId, setPostId] = useState("")

    const onSaveCaption = async id => {
      
      setPostId(id)
      console.log(postId)
     const url =`https://userpost-management.onrender.com/posts/${id}`
     const newData = {caption}
     const options ={
       method : 'PUT',
       headers : {
             "Content-Type" : "application/json"
         },
             body : JSON.stringify(newData),
     }
     
     const response = await fetch(url, options)
     if (response.ok){
     alert("Caption Changed Successfully")
     }
     console.log(response)
   }
   
  return (
    <div className="popup-container">
              <Popup
              modal
              trigger={
                <button ><CiEdit /></button>
              }>
              <div className='caption-popup'>
                  <input onChange={(e)=>setCaption(e.target.value)}/>
                  <button onClick={()=>onSaveCaption(post_id)}>save Post</button>
               </div>
            </Popup>
    </div>
  )
}

export default EditPopup