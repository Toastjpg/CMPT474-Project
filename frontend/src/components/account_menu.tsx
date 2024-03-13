import { Avatar, Menu } from '@mantine/core';
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
    let navigate = useNavigate();

    return (
        <>
            <Menu>
                <Menu.Target>
                    <Avatar size={40} radius="xl" style={{ cursor: "pointer" }} />
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item>Profile</Menu.Item>

                    <Menu.Item>Settings</Menu.Item>

                    <Menu.Item onClick={() => {navigate("/loginpage")}}>Log out</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}