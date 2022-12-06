import * as React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './../assets/scss/App.scss';
import Login from './pages/login';
import Home from './pages/home';

function App() {
	const navigate = useNavigate();

	React.useEffect(() => {
		const authToken = localStorage.getItem('Email');
		if (authToken) navigate('/');
		else navigate('/login');
	}, [navigate]);

	const login = (email, password) => {
		if (email === 'borgoth@mordos.com' && password === '12bindthem') {
			localStorage.setItem('Email', email);
			navigate('/');
		} else {
			alert('Please enter valid email/password');
		}
	};

	return (
		<>
			<Routes>
				<Route path="/login" element={<Login login={login} />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</>
	);
}

export default App;
