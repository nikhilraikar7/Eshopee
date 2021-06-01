import { render } from '@testing-library/react';
import React , {useEffect} from 'react';
import { connect } from 'react-redux';
import { Switch , Route , Redirect} from 'react-router-dom';
import './App.css';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector} from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component'; 
import { checkUserSession } from './redux/user/user.action';

const App = ({ checkUserSession , currentUser }) => {
  useEffect(() => {
    checkUserSession()
  } , [checkUserSession]);

  //unsubscribeFromAuth = null 

  // componentDidMount(){

  //   const { checkUserSession } = this.props;
  //   checkUserSession();
    
  //   // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //   //   if(userAuth){
  //   //     const userRef = await createUserProfileDocument(userAuth);
  //   //     userRef.onSnapshot(snapShot => {
  //   //         this.props.setCurrentUser  ({
  //   //           id : snapShot.id,
  //   //           ...snapShot.data()
  //   //         });
  //   //     });
  //   //   }
  //   //   setCurrentUser(userAuth);
  //   //   });
  // }

  // componentWillUnmount(){
  //   this.unsubscribeFromAuth()
  // }

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' 
          render={() => currentUser ? (<Redirect to='/'/>):(<SignInAndSignUpPage/>)}/>
        </Switch>
        
      </div>
    );
  }

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser 

});

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
});

export default connect(mapStateToProps , mapDispatchToProps)(App);
