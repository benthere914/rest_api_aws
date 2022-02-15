import { Auth } from 'aws-amplify';
import { Alert, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
const LogOut = ({setUser}) => {
    const history = useHistory();
    const logOutHandler = async () => {
        const res = await Auth.signOut();
        setUser({email_verified: false});
        history.push('/')
    }





    return (
    <>
        <div className='auth-form'>
            <Alert variant='info'>
                <Alert.Heading>Log Out</Alert.Heading>
                <p>
                    Are you sure you want to log out?
                    You will not be able to comment or post any other content.
                </p>
                <Button variant='success' onClick={logOutHandler}>Log Out</Button>{' '}
                <Button variant='success' onClick={() => {history.push('/')}}>Cancel</Button>
            </Alert>
        </div>
    </>
    )
}

export default LogOut
