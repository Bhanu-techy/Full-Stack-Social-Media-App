import {useState} from 'react'
import {BsHeart} from 'react-icons/bs'
import { Link} from 'react-router-dom'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

function PostCard({details}) {

    const [isLiked, setLiked] = useState(false)

    const onClickLike = (id) => {
      setLiked((prevState) => !prevState)
    }

    const {user_id, name, img, caption, post_id}= details
    
  return (
    <li className='post-card'>
        <Link to={`profile/${user_id}`}>
        <p className='text'>{name}</p>
        </Link>
        <img src={img} alt="post_img" className='image'/>
        <div className='icons-div'>
            {isLiked ? <FcLike onClick={()=>onClickLike(post_id)}/> : <BsHeart onClick={()=>onClickLike(post_id)}/>}
            <FaRegComment/>
            <BiShareAlt/>
        </div>
        <p className='text'>{caption}</p>
    </li>
  )
}

export default PostCard