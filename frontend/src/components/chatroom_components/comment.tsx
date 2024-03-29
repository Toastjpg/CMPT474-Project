import { Text, Avatar, Group } from '@mantine/core';

export function Comment() {
    const dummyUsers = [
        {
            avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
            name: "Jacob Warnhalter"
        },
        {
            avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
            name: "Chris P. Bacon"
        },
        {
            avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
            name: "Ann Chovey"
        },
        {
            avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
            name: "Kimberly Churchill"
        },
        {
            avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
            name: "Marsha Mellow"
        },
        {
            avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
            name: "Aida Bugg"
        },
    ]

    const randomNum = Math.floor(Math.random() * dummyUsers.length)
    return (
        <div>
            <Group>
                <Avatar
                    src={dummyUsers[randomNum].avatar}
                    alt={dummyUsers[randomNum].name}
                    radius="xl"
                />
                <div>
                    <Text size="sm">Jacob Warnhalter</Text>
                    <Text size="xs" c="dimmed">
                        10 minutes ago
                    </Text>
                </div>
            </Group>
            <Text pl={54} pt="sm" size="sm">
                This Pokémon likes to lick its palms that are sweetened by being soaked in honey. Teddiursa
                concocts its own honey by blending fruits and pollen collected by Beedrill. Blastoise has
                water spouts that protrude from its shell. The water spouts are very accurate.
            </Text>
        </div>
    );
}