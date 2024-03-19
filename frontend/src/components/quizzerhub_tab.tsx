
import {  Flex, Title, Button } from '@mantine/core';
import { useState } from 'react';

import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    keys,
  } from '@mantine/core';
  import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconSquarePlus } from '@tabler/icons-react';
  import '../styles/table.css';
  
  interface RowData {
    name: string;
    email: string;
    company: string;
  }
  
  interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
  }
  
  function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
      <Table.Th className={"th"}>
        <UnstyledButton onClick={onSort} className={"control"}>
          <Group justify="space-between">
            <Text fw={500} fz="sm">
              {children}
            </Text>
            <Center className={"icon"}>
              <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </Center>
          </Group>
        </UnstyledButton>
      </Table.Th>
    );
  }
  
  function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
      keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
  }
  
  function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
  ) {
    const { sortBy } = payload;
  
    if (!sortBy) {
      return filterData(data, payload.search);
    }
  
    return filterData(
      [...data].sort((a, b) => {
        if (payload.reversed) {
          return b[sortBy].localeCompare(a[sortBy]);
        }
  
        return a[sortBy].localeCompare(b[sortBy]);
      }),
      payload.search
    );
  }

const data = [
    {
      name: 'VL2, Virtualization',
      email: 'Little - Rippin',
      company: '23',
    },
    {
      name: '	Virtualisation & Cloud',
      email: 'Greenfelder - Krajcik',
      company: '33',
    },
    {
      name: '	Application Architectures',
      email: 'Kohler and Sons',
      company: '54',
    },
    {
      name: 'Cloud Security, Security',
      email: 'Crona, Aufderhar and Senger',
      company: '9',
    },
    {
      name: 'System Security (Co-location, side channel attacks, resource use patterns)',
      email: 'Crona, Aufderhar and Senger',
      company: '12',
    },
  ];

export function QuizzerHubTab() {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => (
        <Table.Tr key={row.name}>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>{row.email}</Table.Td>
        <Table.Td>{row.company}</Table.Td>
        </Table.Tr>
    ));


    return (
        <section id="quizzerHubTab">
            <Flex justify={"space-between"} direction={"row"} mb={12}>
                <Title size="h4">Quizzes</Title>
                <Button variant="light" leftSection={<IconSquarePlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Create New Quiz</Button>
            </Flex>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <Table.Tbody>
                <Table.Tr>
                    <Th sorted={sortBy === 'name'} reversed={reverseSortDirection} onSort={() => setSorting('name')}>Title</Th>
                    <Th sorted={sortBy === 'email'} reversed={reverseSortDirection} onSort={() => setSorting('email')}>Average Score</Th>
                    <Th sorted={sortBy === 'company'} reversed={reverseSortDirection} onSort={() => setSorting('company')}>Likes</Th>
                </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                {rows.length > 0 ? (
                    rows
                ) : (
                    <Table.Tr>
                    <Table.Td colSpan={Object.keys(data[0]).length}>
                        <Text fw={500} ta="center">
                        Nothing found
                        </Text>
                    </Table.Td>
                    </Table.Tr>
                )}
                </Table.Tbody>
            </Table>
        </section>
    )
}