import {useState, useEffect } from 'react'
import Header from '../Header'
import PostCard from '../PostCard'
import { Oval } from "react-loader-spinner";
import './index.css'

const stateConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'LOADING',
}

function Home() {

    const [posts, setData] = useState([])
    const [apistate, setApiState] = useState(stateConstants.in_progress)

    useEffect(()=>{        
        const getPosts = async () => {
            const url ='https://userpost-management.onrender.com/posts'
            const response = await fetch(url)
            
            if (response.ok){
                const result =await response.json()
                setApiState(stateConstants.success)
                setData(result)
                
            }else{
                setApiState(stateConstants.failure)
            }

        }
        getPosts()
    },[])

    if (apistate===stateConstants.in_progress){
        return (
            <>
            <Header />
            <div className='loader-container'>
            <Oval
            visible={true}
            height="80"
            width="80"
            color="#2511a7"
            ariaLabel="oval-loading"
            secondaryColor="#3a6be6"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          </div>
            </>
        )
    }

    return(
            <>
            <Header/>
            <div className='home-container'>
                <h1 className='heading'>Posts</h1>
                <ul  className='post-list'>
                    {posts.map(each =>(
                        <PostCard details={each} key={each.post_id}/>
                    ))}
                </ul>
            </div>
            </>
        )

}

export default Home