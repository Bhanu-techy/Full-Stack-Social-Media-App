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
    const profileRes = await fetch(`https://userpost-management.onrender.com/users/${id}`);
    const profileData = await profileRes.json();
    setDetails(profileData)

    const postRes = await fetch(`https://userpost-management.onrender.com/posts/${id}`);
    const postData = await postRes.json();
    setPosts(postData)
  }
  fetchData()
    },[id])



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
      <div className="">
        <div className="post-head">
          <h1 className="profile-head">Posts</h1>
        </div>
        <ul className="profile-posts">
        {posts.map(each => (
          <li key={each.post_id} className="profile-list">
            <img src={each.img} className="profile-img" alt="post"/>
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