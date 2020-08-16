import React from 'react';
import {createUseStyles} from 'react-jss';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getSiteData, getUserData} from '../store/modules/data';
import {Loading} from '../Components/Loading';

const useStyles = createUseStyles({
	header: {
		backgroundColor: "#ddd",
		padding: "10px",
		maxHeight: "50px",
		display: "flex",
		alignItems: "center"
	},
	logo: {
		flex: "0 0 auto",
		"& img": {
			maxHeight: "50px"
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
	const siteData = useSelector(getSiteData);
	const userData = useSelector(getUserData);

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				{siteData?.logoImage ? (
					<Link to="/">
						<img src={siteData.logoImage} alt="Move logo"/>
					</Link>
				) : (
					<Loading/>
				)}
			</div>
			<span className={classes.title}>
				{siteData?.title ? siteData.title : <Loading/>}
			</span>
			<div className={classes.userLink}>
				{userData?.firstName ? (
					<Link to="/profile">
						Welcome, {userData.firstName}
					</Link>
				) : (
					<Loading/>
				)}
			</div>
		</header>
	);
}
