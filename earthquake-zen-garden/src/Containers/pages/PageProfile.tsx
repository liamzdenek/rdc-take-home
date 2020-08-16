import React from 'react';
import {PageWrap} from '../../Components/PageWrap';
import {createUseStyles} from 'react-jss';
import {useSelector} from 'react-redux';
import {getUserData} from '../../store/modules/data';
import {TwoColumnTable} from '../../Components/TwoColumnTable';

const useStyles = createUseStyles({
	profileBox: {
		display: "flex",
		flexDirection: "row",
		maxWidth: "500px",
	},
	imageBox: {
		flex: "0 0 auto",
		margin: "5px",
		"& img": {
			maxWidth: "150px"
		}
	},
	table: {
		flex: "1 1 auto",
		margin: "5px",
	}
});

export const PageProfile: React.FunctionComponent<{}> = () => {
	const classes = useStyles();
	const userData = useSelector(getUserData);

	return (
		<PageWrap>
			<h2>
				Profile
			</h2>
			<div className={classes.profileBox}>
				<div className={classes.imageBox}>
					<img src={userData?.avatarImage} alt={userData?.firstName+"'s avatar"}/>
				</div>
				<div className={classes.table}>
					<TwoColumnTable
						data={[
							["First name", userData?.firstName],
							["Last name", userData?.lastName],
							["Phone", userData?.phone],
							["Email", userData?.email],
							["Bio", userData?.bio],
						]}
					/>
				</div>
			</div>
		</PageWrap>
	);
}
