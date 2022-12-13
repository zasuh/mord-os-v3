import * as React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import useLocalStorage from 'use-local-storage';
import './../assets/scss/App.scss';
import Login from './pages/Login';
import Home from './pages/Home';

const lightTheme = {
	backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
	backgroundColor: 'white',
	backgroundColorSecondary: 'white',
	color: 'black',
	primary: '#757ce8',
	secondary: '#ff7961',
	accent: '#757ce8',
};

const darkTheme = {
	backgroundImage: 'linear-gradient(to right, #434343 0%, black 100%)',
	backgroundColor: '#424345',
	backgroundColorSecondary: '#757575',
	color: 'white',
	primary: '#002884',
	secondary: '#ba000d',
	accent: '#a1bff0',
};

function App() {
	const navigate = useNavigate();
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage(
		'theme',
		defaultDark ? 'dark' : 'light'
	);

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

	const switchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<Routes>
				<Route path="/login" element={<Login login={login} />} />
				<Route path="/" element={<Home switchTheme={switchTheme} />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
