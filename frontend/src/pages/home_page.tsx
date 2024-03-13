import { AppShell } from "@mantine/core";

// import { useState, useEffect } from "react";

import { Header } from "../components/header";
import { PostList } from "../components/post_list";

export function HomePage() {
    return (
        <>
            <AppShell header={{ height: 60 }} padding="md">
                <AppShell.Header>
                    <Header />
                </AppShell.Header>

                <AppShell.Main>
                    <PostList />
                </AppShell.Main>
            </AppShell>
        </>
    );
}