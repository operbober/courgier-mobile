import {NavigationActions} from 'react-navigation';

export const goBack = () => NavigationActions.back();

export const setParams = (params) => (dispatch, getState) => {
    const nav = getState().nav;
    const key = nav.routes[nav.index].key;
    dispatch(NavigationActions.setParams({params, key}));
};
