import React from 'react';
import {Loading} from './Loading';
import {Link} from 'react-router-dom';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
	label: {
		fontWeight: "bold",
	}
});
	
interface TwoColumnTableProps {
	data: TwoColumnTableRow[]
}

type TwoColumnTableRow = (TwoColumnTableCell)[];

type TwoColumnTableCell = string | number | null | undefined; // cannot use React.ReactNode because this is used as a key

export const TwoColumnTable: React.FunctionComponent<TwoColumnTableProps> = (props) => {
	const classes = useStyles();
	const {data} = props;

	return (
		<table>
			<tbody>
				{data.map(([k, v]) => (
					<tr key={k}>
						<td className={classes.label}>
							{k}
						</td>
						<td>{v}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
