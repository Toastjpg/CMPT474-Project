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

// Pages
import { Dashboard } from './dashboard_page';
import { Profile } from './profile_page';
import { Settings } from './settings_page';
import { Progress } from './progress_page';
import { Courses } from './courses_page';
import { Course } from './course_page';

// Components
import { ProfileButton } from '../components/profile_button/profile_button';


export function HomePage() {
    const [opened, { toggle }] = useDisclosure();
    const [active, setActive] = useState('dashboard');

    const menuItems = new Map<string, JSX.Element>();
    menuItems.set('dashboard', <Dashboard />)
    menuItems.set('courses', <Courses />)
    menuItems.set('progress', <Progress />)
    menuItems.set('settings', <Settings />)
    menuItems.set('profile', <Profile />)


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
              onClick={() => handleNavLinkClick(item.id)}
              color="#ce0030"
              variant="subtle"
          />))
        )
    }
    const handleNavLinkClick = (id: string) => {
      setActive(id)
      toggle()
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
                    onClick={() => {
                      handleNavLinkClick("dashboard")
                  }}
                    active={"dashboard" === active}
                    label="Dashboard"
                    leftSection={<IconLayoutDashboardFilled size="1rem" stroke={1.5} />}
                    color="gray"
                />
                <NavLink
                    onClick={() => {
                      handleNavLinkClick("courses")
                  }}
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
                    onClick={() => {
                      handleNavLinkClick("progress")
                  }}
                    active={"progress" === active}
                    leftSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
                    color="gray"
                />
                <NavLink
                    label="Settings"
                    onClick={() => {
                      handleNavLinkClick("settings")
                  }}
                    active={"settings" === active}
                    leftSection={<IconAdjustments size="1rem" stroke={1.5} />}
                    color="gray"
                />
            </ScrollArea>
            <AppShell.Section>
                <Divider />
                <ProfileButton setActive={handleNavLinkClick} />
            </AppShell.Section>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main h="100vh" className='scroll-frame'>
        {menuItems.has(active) ? menuItems.get(active) : <Course course={active} />}
      </AppShell.Main>
    </AppShell>
  );
}