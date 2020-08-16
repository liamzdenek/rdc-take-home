import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {PageHome} from './pages/PageHome';
import {PageEarthquake} from './pages/PageEarthquake';
import {PageWelcome} from './pages/PageWelcome';

export const Routes: React.FunctionComponent<{}> = () => {
	return (
		<Switch>
			<Route path="/welcome/:userId">

				<PageWelcome/>
			</Route>
			<Route path="/earthquake/:quakeId">
				<PageEarthquake/>
			</Route>
			<Route path="/">
				<PageHome/>
			</Route>
		</Switch>
	);
}
