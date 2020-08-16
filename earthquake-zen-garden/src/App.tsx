import React from 'react';

import {RouterSetup} from './Containers/RouterSetup';
import {Routes} from './Containers/Routes';
import {Navbar} from './Containers/Navbar';

function App() {
	return (
		<RouterSetup>
			<Navbar/>
			<Routes/>
		</RouterSetup>
	);
}

export default App;
