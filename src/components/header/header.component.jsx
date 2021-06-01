import React, { Component } from 'react';
import {ReactComponent as Logo} from '../../assests/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import { createStructuredSelector} from 'reselect';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart} from '../../redux/user/user.action';
import { HeaderContainer , LogoContainer , OptionsContainer , OptionLink } from './header.styles';

import './header.styles.scss';

const Header = ({ currentUser , hidden , signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            {
                currentUser ? 
                (<OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>) 
                : 
                (<OptionLink to='/signin' >SIGN IN</OptionLink>)
            }
            <CartIcon/>
            
        </OptionsContainer>
        {hidden ? null : <CartDropDown/>}
    </HeaderContainer>
);

const mapStateToProps = (state) => createStructuredSelector({
    currentUser : selectCurrentUser, 
    hidden : selectCartHidden
});

const mapDispatchToprops = dispatch => ({
    signOutStart : () => dispatch(signOutStart())
})

export default connect(mapStateToProps , mapDispatchToprops)(Header) ;