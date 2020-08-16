import React from 'react';
import {PageWrap} from '../../Components/PageWrap';
import {useSelector} from 'react-redux';
import {getEarthquakeMetadata, getEarthquakeData} from '../../store/modules/data';
import {Loading} from '../../Components/Loading';
import {EarthquakeTable} from '../../Components/EarthquakeTable';

export const PageHome: React.FunctionComponent<{}> = () => {
	const earthquakeMetadata = useSelector(getEarthquakeMetadata);
	const earthquakeData = useSelector(getEarthquakeData);

	if(!earthquakeMetadata || !earthquakeData) {
		return <Loading/>
	}

	return (
		<PageWrap>
			<h2>
				{earthquakeMetadata.title}
			</h2>
			<EarthquakeTable earthquakes={earthquakeData}/>
		</PageWrap>
	);
}
