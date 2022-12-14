import * as React from 'react';
import styled from '@emotion/styled';
import Button from '../common/Button';
import { useTheme } from '@emotion/react';

interface LoginProps {
	login: (email: string, password: string) => void;
}
const Login = ({ login }: LoginProps) => {
	const [email, setEmail] = React.useState('borgoth@mordos.com');
	const [password, setPassword] = React.useState('12bindthem');
	const theme = useTheme();

	return (
		<Wrapper>
			<InnerWrapper>
				<Title>MORD OS</Title>
				<form
					onSubmit={(e: React.SyntheticEvent) => {
						e.preventDefault();
						const target = e.target as typeof e.target & {
							email: { value: string };
							password: { value: string };
						};
						const email = target.email.value;
						const password = target.password.value;
						login(email, password);
					}}
					autoComplete="off"
				>
					<LoginCard>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
							}}
						>
							<p style={{ marginBottom: 5 }}>Email</p>
							<Input
								type="email"
								name="email"
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
							}}
						>
							<p style={{ marginBottom: 5 }}>Password</p>
							<Input
								type="password"
								name="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
						</div>
						<Button
							text="Login"
							type="submit"
							onClick={() => login(email, password)}
							disabled={!email || !password}
							backgroundColor={theme.primary}
						/>
					</LoginCard>
				</form>
			</InnerWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.div(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	maxWidth: '100%',
	height: '100vh',
	backgroundImage: theme.backgroundImage,
	backgroundRepeat: 'no-repeat',
}));

const InnerWrapper = styled.div({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 20,
	boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
	borderRadius: 8,
	background: 'white',
});

const Title = styled.h1({
	fontWeight: 'bold',
	fontSize: 24,
	marginBottom: 10,
});

const LoginCard = styled.div({
	width: 300,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: 10,
});

const Input = styled.input({
	width: 200,
	padding: 10,
});

export default Login;
