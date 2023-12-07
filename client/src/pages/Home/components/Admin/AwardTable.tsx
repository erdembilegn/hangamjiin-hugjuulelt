import { Grid, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { useFetchAward } from '@libs/hooks';
import { AwardTableText } from '@libs/text';

//Admind tsolnii jagsaaltiig haruulah code
//Sistemd uusgegdsen tsoliig fetch eer damjuulj avan delgetselj baigaa
const AwardTable: React.FC = () => {
  const { awards } = useFetchAward();
  //tsoliig hevlen shalgaj baina
  console.log("awards", awards);
  return (
    <>
      <Grid>
        <Heading color={Colors.primary} fontSize={'26px'}>
          {AwardTableText.heading}
        </Heading>
      </Grid>
      <TableContainer style={{ height: '460px', position: 'relative' }} overflowY="auto" bgColor={'white'} marginTop={'15px'}>
        <Table overflowY={'auto'} style={{ position: 'relative' }}>
          <Thead bgColor={'#353D75'} style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <Tr className="[&>th]:text-white">
              <Th>#</Th>
              <Th> {AwardTableText.name}</Th>
              <Th>{AwardTableText.minNumber}</Th>
              <Th>{AwardTableText.maxNumber}</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          {awards &&
            awards.map((item, index) => {
              return (
                <Tbody>
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.minNumber}</Td>
                    <Td>{item.maxNumber}</Td>
                  </Tr>
                </Tbody>
              );
            })}
        </Table>
      </TableContainer>
    </>
  );
};

export default AwardTable;
