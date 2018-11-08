import firebase from 'firebase/app'
import 'firebase/auth'
import {from, Observable} from 'rxjs';

const config = {
    apiKey: "AIzaSyBcC9dPNeUxFz_Ny50EsNxB2aderU2pXTY",
    authDomain: "courgier.firebaseapp.com",
    databaseURL: "https://courgier.firebaseio.com",
    projectId: "courgier",
    messagingSenderId: "266937184578"
};

firebase.initializeApp(config);

export const firebaseApi = {
    signIn: (username, password) => {
        return from(firebase.auth().signInWithEmailAndPassword(username, password))
    },
    signOut: () => {
        return from(firebase.auth().signOut());
    },
    subscribeOnAuthStateChange: () => {
        return Observable.create((observer) => {
            firebase.auth().onAuthStateChanged((user) => {
                observer.next(user)
            });
        })
    }
};
