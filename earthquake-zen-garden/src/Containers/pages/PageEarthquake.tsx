import React from 'react';
import {PageWrap} from '../../Components/PageWrap';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getEarthquakeDataByIds} from '../../store/modules/data';
import {TwoColumnTable} from '../../Components/TwoColumnTable';

export const PageEarthquake: React.FunctionComponent<{}> = () => {
	const { earthquakeIds } = useParams();  
	
	// not totally sure if caching works with this pattern
	// probably not
	const earthquakeData = useSelector(getEarthquakeDataByIds(earthquakeIds));

	return (
		<PageWrap>
			<h2>
				{earthquakeData?.properties.title}
			</h2>
			<TwoColumnTable
				data={[
					["Place", earthquakeData?.properties.place],
					["Magnitude", earthquakeData?.properties.mag.toString()],
					["Time", earthquakeData?.properties.time ? new Date(earthquakeData.properties.time).toString() : ""],
					["Status", earthquakeData?.properties.status],
					["Tsunami", earthquakeData?.properties.tsunami ? "Yes" : "No"],
					["Type", earthquakeData?.properties.type],
				]}
			/>
		</PageWrap>
	);
}
