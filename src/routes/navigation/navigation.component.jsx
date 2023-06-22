import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crwnlogo } from '../../assets/crown.svg'

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    const signOutHandler = async() => {
        const res = await signOutUser();
    };

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <Crwnlogo className="logo" />          
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {currentUser ? 
                    (<span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>) 
                    : 
                    (<Link className="nav-link" to='/authentication'>SIGN IN</Link>)
                }
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;