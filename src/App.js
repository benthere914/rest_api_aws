import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import SignUp from './components/auth/signup';
import LogIn from './components/auth/login';
import Demo from './components/auth/demo';
import LogOut from './components/auth/logout';
import { useEffect, useState } from 'react';
Amplify.configure(awsconfig);

function App() {
    const [user, setUser] = useState('');
    useEffect(async () => {
        const res = await Auth.currentAuthenticatedUser();
        setUser(res.attributes)
    }, [])
	return (
		<>
			<BrowserRouter>
				<NavBar user={user}/>
				<Switch>
					<Route path={'/'} exact={true}>
					</Route>
					<Route path={'/signup'}>
						<SignUp setUser={setUser}/>
					</Route>
					<Route path={'/login'}>
						<LogIn setUser={setUser}/>
					</Route>
					<Route path={'/demo'}>
						<Demo setUser={setUser}/>
					</Route>
                    <Route path={'/logout'}>
                        <LogOut setUser={setUser}/>
                    </Route>

				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
