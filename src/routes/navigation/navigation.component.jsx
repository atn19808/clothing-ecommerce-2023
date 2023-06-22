import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/card-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as Crwnlogo } from '../../assets/crown.svg'
import { signOutUser } from "../../utils/firebase/firebase.util";

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

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
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;