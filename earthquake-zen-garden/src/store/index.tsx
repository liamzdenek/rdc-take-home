import {createStore, combineReducers} from 'redux';
import {initStore} from './initStore';
import {dataReducer} from './modules/data';

const rootReducer = combineReducers({
	dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
	rootReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

//export type RootDispatch = typeof store.dispatch;

// TODO: use a real side effect model like redux-observables
// TODO: add error handling to initStore
initStore();
