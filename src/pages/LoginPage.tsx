import styleClasses from './LoginPage.module.scss'

const LoginPage = () => {
	return (
		<div className={styleClasses.login}>
			<div className={styleClasses.loginContainer}>
				<form className={styleClasses.loginForm} action="#" method="POST">
					<input className={styleClasses.loginFormInput} type="text" autoComplete='username' required placeholder='Логин' />
					<input className={styleClasses.loginFormInput} type="password" autoComplete='current-password' required placeholder='Пароль' />
					<button className={`${styleClasses.loginButton} ${styleClasses.loginButtonSubmit}`} type="submit">Войти</button>
				</form>
				<button className={styleClasses.loginButton}>Зарегистрироваться</button>
			</div>
		</div>
	)
}

export default LoginPage
