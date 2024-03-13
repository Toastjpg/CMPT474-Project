import { Avatar, Menu } from '@mantine/core';

export function AccountMenu() {
    return (
        <>
            <Menu>
                <Menu.Target>
                    <Avatar size={40} radius="xl" style={{ cursor: "pointer" }} />
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item>Profile</Menu.Item>
                    <Menu.Item>Settings</Menu.Item>
                    <Menu.Item>Log out</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}