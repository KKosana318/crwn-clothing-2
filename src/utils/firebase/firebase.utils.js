import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDSuQvIC_TUKStzQHpTMSSdgzNsXj2GNLg",
    authDomain: "crwn-clothing2-db-c42c7.firebaseapp.com",
    projectId: "crwn-clothing2-db-c42c7",
    storageBucket: "crwn-clothing2-db-c42c7.appspot.com",
    messagingSenderId: "100467921003",
    appId: "1:100467921003:web:2be04d989127f58da1212e",
    measurementId: "G-WDHVW20GMK"
};
  
// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email, 
                createdAt
            })
        } catch(error) {
            console.log("Error creating user: " + error)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
    
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = async (email, password) => {
    if(!email || !password) return
    
    return await signInWithEmailAndPassword(auth, email, password)
}
