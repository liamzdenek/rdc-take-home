import React from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
	main: {
		margin: "10px",
		
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		"& h1,h2,h3,h4,h5,h6": {
			textAlign: "center"
		}
	}
});

export const PageWrap: React.FunctionComponent<{}> = (props) => {
	const classes = useStyles();
	return (
		<main className={classes.main}>
			{props.children}
		</main>
	);
}
