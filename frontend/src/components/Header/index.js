import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

function Header() {

    const navigate = useNavigate()

     const logoutBtn = () => {
        Cookies.remove("jwt_token")
        navigate("/login")
    }
  return (
    <nav className='nav'>
        <img src="https://res.cloudinary.com/dsqphsoxb/image/upload/v1723546423/samples/logo.png" alt="logo" className='nav-logo'/>
        <Link to="/">
        <p>Home</p>
        </Link>
        <Link to="/myprofile">Myprofile</Link>
        <button onClick={logoutBtn} className='logout-btn'>Logout</button>
    </nav>
  )
}

export default Header