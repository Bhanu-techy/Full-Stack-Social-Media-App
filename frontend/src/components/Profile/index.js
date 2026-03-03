import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import Header from "../Header"
import './index.css'

function Profile(){

    const [details, setDetails] = useState([])
    const [posts, setPosts] = useState([])

    const {id} = useParams();

  useEffect(()=>{
  const fetchData = async () =>{
    const profileRes = await fetch(`https://userpost-management.onrender.com/userprofile/${id}`);
    const profileData = await profileRes.json();
    setDetails(profileData[0])

    const postRes = await fetch(`https://userpost-management.onrender.com/posts/${id}`);
    const postData = await postRes.json();
    setPosts(postData)
  }
  fetchData()
    },[id])

    
   const {username, bio, following_count, followers_count, profile_image} = details
   const post_count = posts.length

  return (
    <div className="profile-bg">
      <Header />
      <div className="profile-bio">
         <div className="profile-img-div">
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
      <div className="">
        <div className="post-head">
          <h1 className="profile-head">Posts</h1>
        </div>
        <ul className='profile-post-list'>
        {posts.map(each => (
          <li key={each.post_id} className="profile-post">
            <img src={each.img} className="profile-post-img" alt="post"/>
            <p>{each.caption}</p>
            <div className="button-div">
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}

export default Profile