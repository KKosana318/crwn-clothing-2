import { useState } from "react"

import { signInWithGooglePopup, createUserDocumentFromAuth, signIn } from "../../utils/firebase/firebase.utils"

import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"

import './sign-in.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const {email, password} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await signIn(email, password)
            resetFormFields()
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password!")
                    break
                case 'auth/user-not-found':
                    alert("No user associated with this email.")
                    break
                default:
                    console.log(error)
            }
        }
    }

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email} />
                <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password} />
                <div className="buttons-container">
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton type='button' buttonType='google' onClick={signInWithGoogle}>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn
