import { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    UserCredential,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { authRef } from '../components/auth_components/firebase.config';

const AuthContext = createContext({} as any);

// a wrapper around the useContext hook to make it easier to use the AuthContext
export function useFirebaseAuth() {
    return useContext(AuthContext);
}

export function FirebaseAuthProvider(props: { children: any }) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

    function signUp(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(authRef, email, password)
    }

    function signIn(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(authRef, email, password)
    }

    function logOut() {
        return signOut(authRef)
    }

    useEffect(() => {
    // https://firebase.google.com/docs/reference/js/auth.user
        const unsub = onAuthStateChanged(authRef, setCurrentUser)
        return unsub
    }, [])

    const value = { currentUser, firebaseSignUp: signUp, firebaseSignIn: signIn, firebaseSignOut: logOut}
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}