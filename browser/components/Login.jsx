import React from 'react';

export const Login = () => (
	<div>
		<div id="login-parent">
			<div id="login-child">
				<a href="/api/auth/login/google" className="btn btn-google btn-lg btn-social">
					<i className="fa fa-google"/>
					Sign in with Google
				</a>&nbsp;
				<a href="/api/auth/login/facebook" className="btn btn-facebook btn-lg btn-social">
					<i className="fa fa-facebook"/>
					Sign in with Facebook
				</a>&nbsp;
				<a href="/api/auth/login/github" className="btn btn-github btn-lg btn-social">
					<i className="fa fa-github"/>
					Sign in with Github
				</a>
			</div>
		</div>
	</div>
);
