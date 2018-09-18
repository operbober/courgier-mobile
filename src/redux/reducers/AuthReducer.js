import {SIGN_IN_FAILURE, SIGN_IN_REQUEST, SIGN_IN_SUCCESS} from '../actions/AuthActions';

export const authReducer = (state = {
    loading: false,
    user: null
}, action) => {
    switch (action.type) {

        case SIGN_IN_REQUEST:
            return {
                loading: true,
                user: null,
                error: null
            };

        case SIGN_IN_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: null
            };

        case SIGN_IN_FAILURE:
            return {
                loading: false,
                user: null
            };

        default:
            return state;
    }
};
