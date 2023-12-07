import { Grid, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { useFetchUser } from '@libs/hooks';
import { UserTableText } from '@libs/text';
//Hereglegchiin jagsaaltiig haruulah code
//Sistemd uusgegdsen hereglegchiig fetch eer damjuulj avan delgetselj baigaa
const UserTable: React.FC = () => {
  const { users } = useFetchUser();
  return (
    <>
      <Grid>
        <Heading color={Colors.primary} fontSize={'26px'}>
          {UserTableText.heading}
        </Heading>
      </Grid>
      <TableContainer style={{ height: '490px', position: 'relative' }} overflowY="auto" bgColor={'white'} marginTop={'15px'}>
        <Table overflowY={'auto'} style={{ position: 'relative' }}>
          <Thead bgColor={'#353D75'} style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <Tr className="[&>th]:text-white">
              <Th>#</Th>
              <Th>{UserTableText.lastName}</Th>
              <Th>{UserTableText.firstName}</Th>
              <Th>{UserTableText.role}</Th>
              <Th>{UserTableText.email}</Th>
              <Th>{UserTableText.grade}</Th>
              <Th>
              </Th>
              <Th>
              </Th>
            </Tr>
          </Thead>
          {users &&
            users.map((item, index) => {
              return (
                <Tbody>
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.lastName}</Td>
                    <Td>{item.firstName}</Td>
                    <Td>{item.role === 'Admin' && 'Админ'}
                      {item.role === 'Student' && 'Суралцагч'}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.grade}</Td>
                  </Tr>
                </Tbody>
              );
            })}
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;
