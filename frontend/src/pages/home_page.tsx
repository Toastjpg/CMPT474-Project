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
    const [opened, { toggle }] = useDisclosure();
    const [active, setActive] = useState('dashboard');
    const navigate = useNavigate();

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
                <NavLink
                    onClick={() => handleNavLinkClick('dashboard', '/dashboard')}
                    active={"dashboard" === active}
                    label="Dashboard"
                    leftSection={<IconLayoutDashboardFilled size="1rem" stroke={1.5} />}
                    color="gray"
                />
                <NavLink
                    onClick={() => handleNavLinkClick('courses', '/courses')}
                    active={"courses" === active}
                    label="Courses"
                    leftSection={<IconBooks size="1rem" stroke={1.5} />}
                    color="gray"
                />
                <NavLink
                    label="Favorites"
                    leftSection={<IconStar size="1rem" stroke={1.5} />}
                    color="gray"
                    childrenOffset={28}
                >
                  {menuFavorites()}
                </NavLink>
                <NavLink
                    label="Progress"
                    onClick={() => handleNavLinkClick('progress', '/progress')}
                    active={"progress" === active}
                    leftSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
                    color="gray"
                />
                <NavLink
                    label="Settings"
                    onClick={() => handleNavLinkClick('settings', '/settings')}
                    active={"settings" === active}
                    leftSection={<IconAdjustments size="1rem" stroke={1.5} />}
                    color="gray"
                />
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