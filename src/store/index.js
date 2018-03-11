import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'portfolio',
	storage
};

const loggerMiddleware = createLogger();
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default createStore(
	persistedReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);
