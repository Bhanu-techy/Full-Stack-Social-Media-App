import {useState, useEffect} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import { MdDelete } from "react-icons/md";
import EditPopup from '../EditPopup';
import Postpopup from '../Postpopup'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import './index.css'

function Myprofile() {
    const userId = Cookies.get('userId')
 
     const [details, setDetails] = useState([])
     const [posts, setPosts] = useState([])
 
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
 
   const onClickDelPost = async id =>{
     const url =`https://userpost-management.onrender.com/posts/${id}`
 
     const options = {
       method : 'DELETE',
     }
     const response = await fetch(url, options)
     if (response.ok){
      alert("Post Deleted Successfully")
     }
     
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
           <li key={each.post_id} className="myprofile-post">
             <img src={each.img} className="profile-post-img" alt="post"/>
             <p className='profile-caption'>{each.caption}</p>
             <div className="button-div">
              <EditPopup post_id={each.post_id} />
          <div className="popup-container">
              <Popup
              modal
              trigger={
                <MdDelete size={25}/>
              }>
              <div className='caption-popup'>
                  <p>Are you sure you want to delete this item?</p>
                  <button className="del-btn" onClick={()=>onClickDelPost(each.post_id)}>Del Post</button>
               </div>
            </Popup>
            </div>
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
          <p className='bio-md'>{bio}</p>
         </div>
         <div>
          <h2>{username}</h2>
          <div className="profile-details">
            <p className='profile-count'>{post_count} <span>post</span> </p>
            <p className='profile-count'>{followers_count} <span>followers</span></p>
            <p className='profile-count'>{following_count} <span>following</span></p>
          </div>
          <p className='bio-sm'>{bio}</p>
         </div>
       </div>
       <hr/>
       <PostSuccessView />
     </div>
   )
}

export default Myprofile