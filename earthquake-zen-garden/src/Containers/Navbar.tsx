import React from 'react';
import {createUseStyles} from 'react-jss';
import logo from './realtor-com.png';
import {Link} from 'react-router-dom';

const useStyles = createUseStyles({
	header: {
		backgroundColor: "#ddd",
		padding: "10px",
		display: "flex",
		maxHeight: "50px",
	},
	logo: {
		flex: "0 0 auto",
		maxWidth: "50px",
		"& img": {
			maxHeight: "100%"
		}
	},
	title: {
		flex: "1 1 auto",
		textAlign: "center",
	},
	userLink: {
		flex: "0 0 auto",
	}
});

export const Navbar: React.FunctionComponent<{}> = () => {
	const classes = useStyles();

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<Link to="/">
					<img src={logo} alt="Realtor.com logo"/>
				</Link>
			</div>
			<span className={classes.title}>
				Earthquake Zen Garden
			</span>
			<div className={classes.userLink}>
				<Link to="/user/sally">
					Welcome, Sally
				</Link>
			</div>
		</header>
	);
}
