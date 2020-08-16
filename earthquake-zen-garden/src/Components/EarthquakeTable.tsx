import React from 'react';
import {RawDataFeature} from '../store/rawdata';
import {Loading} from './Loading';
import {Link} from 'react-router-dom';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
	magnitude: {
		textAlign: "center"
	}
});
	
interface EarthquakeTableProps {
	earthquakes: RawDataFeature[]
}

export const EarthquakeTable: React.FunctionComponent<EarthquakeTableProps> = (props) => {
	const classes = useStyles();

	const {earthquakes} = props;
	
	if(!earthquakes) {
		return <Loading/>;
	}
	return (
		<table>
			<thead>
				<tr>
					<th>Place</th>
					<th>Magnitude</th>
					<th>Time</th>
				</tr>
			</thead>
			<tbody>
				{earthquakes.map(earthquake => (
					<tr key={earthquake.properties.ids}>
						<td>
							<Link to={"/earthquake/"+earthquake.properties.ids}>
								{earthquake.properties.place}
							</Link>
						</td>
						<td className={classes.magnitude}>
							{earthquake.properties.mag}
						</td>
						<td>{new Date(earthquake.properties.time).toString()}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
