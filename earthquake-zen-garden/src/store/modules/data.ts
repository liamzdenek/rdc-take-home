import {RootState} from '../';
import {RawData} from '../rawdata';

const TYPES = {
	PUT_DATA: "data/PUT_DATA",
};

// REDUCER
interface DataState {
	rawData: RawData | null
}


const initialState: DataState = {
	rawData: null
};

export function dataReducer(state = initialState, action: DataActionTypes) {
	if(action.type === TYPES.PUT_DATA) {
		return {
			...state,
			rawData: action.data
		};
	}
	return state;
}

// ACTION CREATORS
type DataActionTypes =
	ReturnType<typeof putData>;

export const putData = (data: RawData) => ({ type: TYPES.PUT_DATA, data});

// SELECTORS
export const getDataReducer = (state: RootState) => state.dataReducer;
export const getSiteData = (state: RootState) => getDataReducer(state)?.rawData?.site;
export const getUserData = (state: RootState) => getDataReducer(state)?.rawData?.profile;
export const getEarthquakeMetadata = (state: RootState) => getDataReducer(state)?.rawData?.data.metadata;
export const getEarthquakeData = (state: RootState) => getDataReducer(state)?.rawData?.data.features;
