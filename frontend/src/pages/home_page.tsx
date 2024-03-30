import { AppShell } from "@mantine/core";

// import { useState, useEffect } from "react";

import { Header } from "../components/header";
import { PostList } from "../components/post_list";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { Navigate } from "react-router-dom";

export function HomePage() {
    const { currentUser } = useFirebaseAuth();
    return (
        <>
        {/* FIXME surely theres a better way to do this */}
            {currentUser ?   
                <AppShell header={{ height: 60 }} padding="md">
                    <AppShell.Header>
                        <Header />
                    </AppShell.Header>

                    <AppShell.Main>
                        <PostList />
                    </AppShell.Main>
                </AppShell>
                : <Navigate to="/loginpage" />
            }
        </>
    );
}