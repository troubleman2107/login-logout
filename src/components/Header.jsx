import React from 'react'
import { Button } from 'reactstrap'
import Avatar from '../styles/imgs/avatar.png'
import LogoutIcon from '../styles/imgs/logout.png'
import {useState} from 'react'
import { logOut } from '../utils/helpers/auth'
import { useNavigate } from "react-router-dom";
import { fetchLogout } from '../redux/actions/api';
import { useDispatch } from 'react-redux';
import { getCookie } from '../utils/helpers/auth'
import { useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector((states) => states);
  const navigate = useNavigate();
  const [buttonShow, setButtonShow] = useState(false);
  const dispatch = useDispatch();
  const displayName = localStorage.getItem('displayName').replaceAll('"', '');

  console.log(user);

  const handleOnClick = () => {
    setButtonShow(!buttonShow)
  }

  const handleLogOut = async () => {
    const token = getCookie('token')
    dispatch(await fetchLogout(token));
    logOut();
    return navigate("/login");
  }

  console.log('localState',displayName);

  return (
    <div className='component__header'>
      <div className="component__header-user">
        <div className="user-info">
          <span className="user-name">{displayName || user?.displayName}</span>
          <span className="user-status">Available</span>
        </div>
        <img onClick={handleOnClick} className='user-avatar' src={Avatar} alt="" />
      </div>
      {
        buttonShow && <div className='log-out'>
            <Button onClick={handleLogOut}>
              Log out
              <img src={LogoutIcon} />
            </Button>
        </div>
      }
      
    </div>
  )
}

export default Header