import firebase from 'firebase/app'
import 'firebase/auth'
import {from} from 'rxjs';

export const firebaseAuthApi = {
    signIn: (username, password) => {
        return from(firebase.auth().signInWithEmailAndPassword(username, password))
    }
};
