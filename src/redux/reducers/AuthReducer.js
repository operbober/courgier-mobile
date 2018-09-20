import {
    AUTH_STATE_CHANGE,
    SIGN_IN_FAILURE,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS, SIGN_OUT,
    SUBSCRIBE_ON_AUTH_STATE_CHANGE
} from '../actions/AuthActions';

const defaultState = {
    loading: false,
    user: null
};

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SIGN_IN_REQUEST:
            return {
                loading: true,
                user: null
            };

        case SIGN_IN_SUCCESS:
            return {
                loading: false,
                user: action.payload
            };

        case SIGN_IN_FAILURE:
            return {
                loading: false,
                user: null
            };

        case SUBSCRIBE_ON_AUTH_STATE_CHANGE: {
            return {
                ...state,
                loading: true
            }
        }

        case AUTH_STATE_CHANGE: {
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        }

        case SIGN_OUT: {
            return defaultState;
        }

        default:
            return state;
    }
};
