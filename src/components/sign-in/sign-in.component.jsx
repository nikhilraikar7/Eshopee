import React , { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart , emailSignInStart } from '../../redux/user/user.action';
import { connect } from 'react-redux';

const SignIn = ({ emailSignInStart }) => {

    const [userCredentials , setCredentials ] =  useState({ email : '' , password : ''})
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         email : '',
    //         password : ''
    //     };
    // }

    const { email , password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        

        emailSignInStart(email , password);

        // try{
        //     await auth.signInWithEmailAndPassword(email , password);
        //     this.setState({ email: '' , password:''})
        // }catch(error){
        //     console.log(error);
        // }
    };

    const handleChange = event => {
        const {value , name } = event.target;

        setCredentials({...userCredentials , [name] : value})
    };

    //const { googleSignInStart } = this.props;

        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign In with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput name="email" type="email" label="Email" 
                    value={email} handleChange={handleChange} required/>
                    <FormInput name="password" type="password" label="Password" 
                    value={password} handleChange={handleChange} required/>

                    <div className='buttons'>
                        <CustomButton type="submit"> SIGN IN </CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn> Sign In With Google </CustomButton>
                    </div>
                </form>

            </div>
        )
    }


const mapDispatchToProps = dispatch => ({
    googleSignInStart : () => dispatch(googleSignInStart()) , 
    emailSignInStart : (email , password) => dispatch(emailSignInStart({email , password}))
});

export default connect(null , mapDispatchToProps) (SignIn) ;