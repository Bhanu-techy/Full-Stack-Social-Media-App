import {useState, useEffect } from 'react'
import Header from '../Header'
import { Link} from 'react-router-dom'

import './index.css'

function Home() {

    const [posts, setData] = useState([])
    const [apistate, setApiState] = useState("progress")

    useEffect(()=>{        
        const getPosts = async () => {
            const url ='https://userpost-management.onrender.com/posts'
            const response = await fetch(url)
            const result =await response.json()
            setData(result)
            setApiState("success")
        }
        getPosts()
    },[])

    return(
            <div className='home-bg'>
            <Header/>
            <div className='home-container'>
                <div className='home'>
                <h1>Posts</h1>
                <ul>
                    {posts.map(each =>(
                        <li key={each.post_id} className='post-card'>
                            <Link to={`profile/${each.user_id}`}>
                            <p className='text'>{each.name}</p>
                            </Link>
                            <img src={each.img} alt="post" className='image'/>
                            <p className='text'>{each.caption}</p>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
            </div>
        )

}

export default Home