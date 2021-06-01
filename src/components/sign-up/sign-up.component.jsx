import React , { useState} from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.action';
import {auth , createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss'

const SignUp = ({ signUpStart }) =>  {
    const [userCredentials , setUserCredentials] = useState({ 
        displayName : '',
        email : '',
        password : '',
        confirmPassword : ''});

        const { displayName , email , password , confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        

        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        signUpStart({ displayName , email , password});

        // try{
        //     const {user} = await auth.createUserWithEmailAndPassword(email , password);
        //     await createUserProfileDocument(user , {displayName});
        //     this.setState({
        //         displayName : '',
        //         email : '',
        //         password : '',
        //         confirmPassword : ''
        //     });

        // }catch(error){
        //     console.error(error);
        // }

    };

    const handleChange = event => {
        const { name , value } = event.target;

        setUserCredentials({...userCredentials , [name] : value})
    };

        return(
            <div className='sign-up'>
                <h2 className='title'> I do not have a account</h2>
                <span>Sign Up with your email and password</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput type='text' name='displayName' required
                    value={displayName} onChange={handleChange} label='Name'/>
                    
                    <FormInput type='email' name='email' required
                    value={email} onChange={handleChange} label='Email'/>

                    <FormInput type='password' name='password' required
                    value={password} onChange={handleChange} label='Password'/>      

                    <FormInput type='password' name='confirmPassword' required
                    value={confirmPassword} onChange={handleChange} label='Confirm Password'/>

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }

const mapDispatchToProps = dispatch => ({
    signUpStart : userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null , mapDispatchToProps) (SignUp) ;