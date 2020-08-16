import React, {useState, useEffect} from 'react';
import {data} from './data';

// for future forward compat, make default value null
// even though we have the answer synchronously
export const DataContext = React.createContext(null);

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getDataPromise = async (): Promise<typeof data> => {
	await wait(350);
	return data;
}

export const FileDataProvider: React.FunctionComponent<{}> = props => {

	const [storedData, setStoredData] = useState(null as typeof data);

	useEffect(() => {
		setStoredData(null);
		// TODO: exception handling
		getDataPromise().then(data => setStoredData(data));
	});

	return (
		<DataContext.Provider value={storedData}>
			{props.children}
		</DataContext.Provider>
	);
};
