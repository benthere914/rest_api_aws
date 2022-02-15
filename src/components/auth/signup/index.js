import './index.css';
import { Auth } from 'aws-amplify';
import {Form, Button, Alert} from 'react-bootstrap'
import { useState } from 'react';
import { useHistory } from 'react-router';
const SignUp = ({setUser}) => {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState('')
    const submitSignUp = async () => {
        try {
            await Auth.signUp({username: email, password, attributes: {'custom:firstName': firstName, 'custom:lastName': lastName}})
            setCodeSent(true);
        } catch (error) {
            console.log(error)
        }
    }

    const confirmSignUpHandler = async () => {
        try {
            await Auth.confirmSignUp(email, code);
            const user = await Auth.signIn(email, password);
            await setUser(user?.attributes);
            history.push('/');

        } catch (error) {
            console.log(error)
        }
    }
	return (
		<>
            <div className='auth-form'>
			    <Alert variant='success'>
				    <Form>
                        {!codeSent ?
                        <>
                        <Form.Group className="mb-3" controlId="signUpFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="email" placeholder="Enter first name" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signUpLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="email" placeholder="Enter first name" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                        </Form.Group>

                        <Button variant="success" onClick={() => {submitSignUp()}}>Submit</Button>
                        </>
                        :
                        <>
                        <Form.Group className="mb-3" controlId="confirm email">
                            <Form.Label>Enter the code sent to your email</Form.Label>
                            <Form.Control type="text" value={code} onChange={(e) => {setCode(e.target.value)}}/>
                        </Form.Group>
                        <Button variant='success' onClick={() => {confirmSignUpHandler()}}>{'Confirm Account & Sign In'}</Button>
                        </>
                        }
				    </Form>
                </Alert>
            </div>

		</>
	);
};

export default SignUp;
