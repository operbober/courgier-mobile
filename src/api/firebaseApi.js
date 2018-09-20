import firebase from 'firebase/app'
import 'firebase/auth'
import {from, Observable} from 'rxjs';

const config = {
    apiKey: 'AIzaSyC1CTWI6z_W4bNa2kFTOWr7dDr4Z9005J8',
    authDomain: 'reactnativeexpoexample.firebaseapp.com',
    databaseURL: 'https://reactnativeexpoexample.firebaseio.com',
    projectId: 'reactnativeexpoexample',
    storageBucket: 'reactnativeexpoexample.appspot.com',
    messagingSenderId: '840295461962'
};


export const firebaseApi = {
    initializeApp: () => {
        firebase.initializeApp(config);
    },
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
