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
                    {/* TODO: Route to profile component */}
                    <Menu.Item>Profile</Menu.Item>
                    {/* NOTE: Unimplemented for now */}
                    <Menu.Item>Settings</Menu.Item>

                    {/* TODO: link with Firebase Auth logout and route back to login page*/}
                    <Menu.Item onClick={() => { navigate("/loginpage") }}>Log out</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}