import React from "react";
import {connect} from "react-redux";

export const Root = connect(
	({ auth }) => ({ user: auth })
) (
	({ user, children }) => (
		<div>
			{JSON.stringify(user)}
			{children}
		</div>
	)
);
