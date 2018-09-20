export const SUBSCRIBE_ON_AUTH_STATE_CHANGE = 'SUBSCRIBE_ON_AUTH_STATE_CHANGE';
export const AUTH_STATE_CHANGE = 'AUTH_STATE_CHANGE';

export const subscribeOnAuthStateChange = () => ({
    type: SUBSCRIBE_ON_AUTH_STATE_CHANGE
});

export const authStateChange = (user) => ({
  type: AUTH_STATE_CHANGE,
  payload: user
});

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const signIn = () => ({
    type: SIGN_IN_REQUEST
});

export const signInSuccess = (user) => ({
    type: SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = () => ({
    type: SIGN_IN_FAILURE
});

export const SIGN_OUT = 'SIGN_OUT';

export const signOut = () => ({
   type: SIGN_OUT
});
