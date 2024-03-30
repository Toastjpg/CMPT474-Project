import { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { authRef } from '../firebase.config';

const AuthContext = createContext({} as any);

// a wrapper around the useContext hook to make it easier to use the AuthContext
export function useFirebaseAuth() {
    return useContext(AuthContext);
}

export function FirebaseAuthProvider(props: { children: any }) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    
    function firebaseSignUp(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(authRef, email, password)
    }

    // TODO: handle auth state changing
    useEffect(() => {
        const unsub = onAuthStateChanged(authRef, (user) => {
            // https://firebase.google.com/docs/reference/js/auth.user
            setCurrentUser(user)
        })
        return unsub
    }, [])

    const value = { currentUser, firebaseSignUp }
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}