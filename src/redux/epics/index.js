import {combineEpics} from 'redux-observable';
import {authEpic} from './AuthEpic';

export const rootEpic = combineEpics(
    authEpic
);
