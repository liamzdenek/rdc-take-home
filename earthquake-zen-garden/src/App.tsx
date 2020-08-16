import React from 'react';

import {RouterSetup} from './Containers/RouterSetup';
import {Routes} from './Containers/Routes';
import {Navbar} from './Containers/Navbar';
import {Provider} from 'react-redux';
import {store} from './store';

function App() {
	return (
		<Provider store={store}>
			<RouterSetup>
				<Navbar/>
				<Routes/>
			</RouterSetup>
		</Provider>
	);
}

export default App;
