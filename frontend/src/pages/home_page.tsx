import { AppShell } from "@mantine/core";

// import { useState, useEffect } from "react";

import { Header } from "../components/header";
import { RecipeList } from "../components/recipe_list";

export function HomePage() {
    return (
        <>
            <AppShell header={{ height: 60 }} padding="md">
                <AppShell.Header>
                    <Header />
                </AppShell.Header>

                <AppShell.Main>
                    <RecipeList />
                </AppShell.Main>
            </AppShell>
        </>
    );
}