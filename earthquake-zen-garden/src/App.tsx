import React from 'react';

import {RouterSetup} from './Containers/RouterSetup';
import {Routes} from './Containers/Routes';
import {Navbar} from './Containers/Navbar';
import {FileDataProvider} from './Containers/data/DataContext';

function App() {
	return (
		<FileDataProvider>
			<RouterSetup>
				<Navbar/>
				<Routes/>
			</RouterSetup>
		</FileDataProvider>
	);
}

export default App;
