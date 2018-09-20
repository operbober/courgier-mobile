import {NavigationActions} from 'react-navigation';

export const navigate = (path, params = {}) => NavigationActions.navigate({
    routeName: path,
    params: params,
});

export const goBack = () => NavigationActions.back();

/*
    @deprecated
*/
export const setParams = (params) => (dispatch, getState) => {
    const nav = getState().nav;
    const key = nav.routes[nav.index].key;
    dispatch(NavigationActions.setParams({params, key}));
};
