import React from 'react';
import { HashRouter } from 'react-router-dom';

export const RouterSetup: React.FunctionComponent<{}> = (props) =>
	<HashRouter>
		{props.children}
	</HashRouter>
;
