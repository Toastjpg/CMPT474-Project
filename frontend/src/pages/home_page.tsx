import { useState } from 'react';
import { AppShell, Burger, Group, ScrollArea, Image, Flex, NavLink, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconLayoutDashboardFilled,
    IconAdjustments,
    IconBooks,
    IconStar,
    IconReportAnalytics,
    IconNotebook,
} from '@tabler/icons-react';
import logo from '../images/logo-transparent-png.png';

// Components
import { ProfileButton } from '../components/profile_button/profile_button';
import { Outlet, useNavigate } from 'react-router-dom';

export function HomePage() {
    /* ---------------------------------- state --------------------------------- */
    const [opened, { toggle }] = useDisclosure();
    const [active, setActive] = useState('dashboard');
    const navigate = useNavigate();

    /* --------------------------------- methods -------------------------------- */
    const menuFavorites = () => {
        const data = [
            { id: 'CMPT213', label: 'CMPT213', description: 'Course description here' },
            { id: 'CMPT474', label: 'CMPT474', description: 'Course description here' },
            { id: 'IAT210', label: 'IAT210', description: 'Course description here' },
        ];
        return (data.map((item) => (
            <NavLink
                className='menu-subitem'
                key={item.id}
                active={item.id === active}
                label={item.label}
                description={item.description}
                leftSection={<IconNotebook size="1rem" stroke={1.5} />}
                onClick={() => handleNavLinkClick(item.id, `courses/${item.id}/resources`)}
                color="#ce0030"
                variant="subtle"
            />))
        )
    }
    const handleNavLinkClick = (id: string, path: string) => {
        setActive(id)
        toggle()
        navigate(path)
    }

    /* ------------------------------- components ------------------------------- */

    function createNavLink(
        onClickCallback: Function, 
        path: string, 
        label: string, 
        icon: JSX.Element,
        offset: number | undefined = 0 // if not provided, set to 0 (has no children)
        
    ): JSX.Element {
        return (
            <>
                <NavLink
                    onClick={() => onClickCallback()}
                    active={path === active}
                    label={label}
                    leftSection={icon}
                    color="gray"
                    childrenOffset={offset}
                />
            </>
        );
    }

    function createNestedNavLink(
        onClickCallback: Function, 
        path: string, 
        label: string, 
        icon: JSX.Element,
        offset: number,
        children: JSX.Element[]
    ): JSX.Element {
        return (
            <>
                <NavLink
                    onClick={() => onClickCallback()}
                    active={path === active}
                    label={label}
                    leftSection={icon}
                    color="gray"
                    childrenOffset={offset}
                >
                    {children}
                </NavLink>
            </>
        );
    }

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Image miw={180} src={logo} />
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <Flex h="100%" justify="space-between" direction="column" mih={0}>
                    <ScrollArea className="links" p="md" scrollbarSize={8}>
                        {createNavLink(
                            () => handleNavLinkClick('dashboard', '/dashboard'), 
                            '/dashboard', 
                            'Dashboard',
                            <IconLayoutDashboardFilled size="1rem" stroke={1.5} />)
                        }
                        {createNavLink(
                            () => handleNavLinkClick('courses', '/courses'),
                            '/courses',
                            'Courses',
                            <IconBooks size="1rem" stroke={1.5} />)
                        }
                        {createNavLink(
                            () => {},
                            '/favorites',
                            'Favorites',
                            <IconStar size="1rem" stroke={1.5} />,
                            28,
                        )}
                        {createNavLink(
                            () => handleNavLinkClick('progress', '/progress'),
                            '/progress',
                            'Progress',
                            <IconReportAnalytics size="1rem" stroke={1.5} />)
                        }
                        {createNavLink(
                            () => handleNavLinkClick('settings', '/settings'),
                            '/settings',
                            'Settings',
                            <IconAdjustments size="1rem" stroke={1.5} />)
                        }
                    </ScrollArea>
                    <AppShell.Section>
                        <Divider />
                        <ProfileButton setActive={() => handleNavLinkClick('profile', '/profile')} />
                    </AppShell.Section>
                </Flex>
            </AppShell.Navbar>
            <AppShell.Main h="100vh" className='scroll-frame'>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}