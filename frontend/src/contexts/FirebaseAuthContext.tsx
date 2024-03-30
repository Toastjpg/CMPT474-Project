import { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { authRef } from '../firebase';

const AuthContext = createContext({});


// a wrapper around the useContext hook to make it easier to use the AuthContext
export default function useAuth() {
    return useContext(AuthContext);
}

export function FirebaseAuthProvider(props: { children: any }) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    
    function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(authRef, email, password)
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(authRef, (user) => {
            // https://firebase.google.com/docs/reference/js/auth.user
            setCurrentUser(user)
        })
        return unsub
    }, [])

    const value = { currentUser, signup }
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}