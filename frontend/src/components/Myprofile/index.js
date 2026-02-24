import {useState, useEffect} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import Postpopup from '../Postpopup'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import './index.css'

function Myprofile() {
    const userId = Cookies.get('userId')
 
     const [details, setDetails] = useState([])
     const [caption, setCaption] = useState("")
     const [posts, setPosts] = useState([])
     
     const [postId, setPostid] = useState("")
     
 
 
   useEffect(()=>{
   const fetchData = async () =>{
     const profileRes = await fetch(`https://userpost-management.onrender.com/userprofile/${userId}`);
     const profileData = await profileRes.json();
     setDetails(profileData[0])
 
     const postRes = await fetch(`https://userpost-management.onrender.com/posts/${userId}`);
     const postData = await postRes.json();
     setPosts(postData)
   }
   fetchData()
     },[userId])
 
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

   const onClickEdit = (id) => {
     setPostid(id)
   }
 
   const onClickDelPost = async id =>{
     const url =`https://userpost-management.onrender.com/posts/${id}`
 
     const options = {
       method : 'DELETE',
     }
 
     await fetch(url, options)
     
   }
 
  
 
   const {username, bio, followers_count, following_count, profile_image} = details
   const post_count = posts.length

   const PostSuccessView = () => (
    <div className="profile-posts-div">
         <div className="post-head">
           <h1 className="profile-head">Posts</h1>
           <Postpopup/>
         </div>
         <ul className='profile-post-list'>
         {posts.map(each => (
           <li key={each.post_id} className="profile-list">
             <img src={each.img} className="profile-post" alt="post"/>
             <p>{each.caption}</p>
             <div className="button-div">
             <div className="popup-container">
            <Popup
              modal
              trigger={
                <button className="edit-btn" onClick={() =>onClickEdit(each.post_id)}>Edit caption</button>
              }>
               <input type="text" onChange={(e)=>setCaption(e.target.value)} placeholder="Enter New Caption"/>
               <button onClick={onSaveCaption}>Save</button>
            </Popup>
          </div>
             <button className="del-btn" onClick={()=>onClickDelPost(each.post_id)}>Del Post</button>
             </div>
           </li>
         ))}
         </ul>
       </div>
   )
 
   return (
     <div className="profile-bg">
       <Header />
       <div className="profile-bio">
         <div className='profile-img-div'>
          <img src={profile_image} alt={username} className='profile-img'/>
          <p>{bio}</p>
         </div>
         <div>
          <h2>{username}</h2>
          <div className="profile-details">
            <p>{post_count} post</p>
            <p>{followers_count} followers</p>
            <p>{following_count} Following</p>
          </div>
         </div>
       </div>
       <hr/>
       <PostSuccessView />
     </div>
   )
}

export default Myprofile