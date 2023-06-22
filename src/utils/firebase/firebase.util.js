import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCaoTnyS2hJl-Aryy2hrus1qfrfDGu498Q",
    authDomain: "crown-db-251021.firebaseapp.com",
    databaseURL: "https://crown-db-251021.firebaseio.com",
    projectId: "crown-db-251021",
    storageBucket: "crown-db-251021.appspot.com",
    messagingSenderId: "909143790373",
    appId: "1:909143790373:web:ff1f40942885d9d2"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // doc(database, collection, unique id)
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists);

    // if user data doesn't exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt
            });
        } catch(error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}