import {data} from './rawdata';
import {store} from './index';
import {putData} from './modules/data';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getDataPromise = async (): Promise<typeof data> => {
	await wait(350);
	return data;
}

export async function initStore() {
	const data = await getDataPromise();
	store.dispatch(putData(data));
}
