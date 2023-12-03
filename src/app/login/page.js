'use client'
import { useRouter } from 'next/navigation'
import { loginWithFacebook } from '../config/firebase'
import {useState} from 'react'


export default function Login() {
    const router = useRouter()
   
   
    const onLogin = async () => {
        try {
           const login = await loginWithFacebook();
           router.push('/dashboard', { scroll: false });

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div style={{ border: '1px solid lightBlue', backgroundColor: 'white', padding: '10px', borderRadius: '10px', height: '480px', boxShadow: '5px 5px 10px white', width: '370px', textAlign: 'center', margin: 'auto', marginTop: '40px', marginBottom: '40px' }}>
            <h1 style={{ marginTop: '20px', marginBottom: '10px', fontSize: 'large' }}>Welcome</h1>
            <p style={{ marginBottom: '20px' }}>Sign up or log in to continue</p>
            <button style={{ width: '90%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'white', backgroundColor: 'blue', marginBottom: '10px', border: '1px solid blue' }} onClick={onLogin}>Continue With Facebook</button>
            <button style={{ width: '90%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'black', backgroundColor: 'white', marginBottom: '10px', border: '1px solid grey' }}>Continue with Google</button>
            <button style={{ width: '90%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'white', backgroundColor: 'black', marginBottom: '10px', border: '1px solid black' }} >Continue with Apple</button>
            <p>or</p>
            <button style={{ width: '90%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'white', backgroundColor: 'deeppink', marginBottom: '10px', border: '1px solid deeppink' }} >Log In</button>
            <button style={{ width: '90%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'deeppink', backgroundColor: 'white', marginBottom: '10px', border: '1px solid deeppink' }} >Signup</button>
            <p>By signing up, you agree to our <span style={{ color: 'deeppink' }}>Terms and Conditions</span> and <span style={{ color: 'deeppink' }}>Privacy Policy</span></p>

        </div>
    )
}