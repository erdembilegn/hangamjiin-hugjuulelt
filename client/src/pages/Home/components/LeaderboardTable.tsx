import React from 'react';
import { Button, Grid, Heading,Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useFetchAward, useFetchUser} from '@libs/hooks';
import { Colors } from '@libs/colors';
import { useMemo } from 'react';
import { LeaderboardText } from '@libs/text';
import { DragHandleIcon } from '@chakra-ui/icons';
//Terguulegchdiin sambariig haruulah code
//Suraltsagchiin onoog erembelsnii daraa erembelegdsen array aar map guij haruulj baigaa
const LeaderboardTable: React.FC = () => {
  const { awards } = useFetchAward();
  const { users } = useFetchUser();
  //Hereglegchees suraltsagchiig ylgan avna
  const students = users?.filter((user) => user.role === 'Student');
  //Suraltsagchiin onoog erembelj baigaa heseg
  const sortedStudents = useMemo(() => {
    return students?.slice().sort((a, b) => (b.grade ?? 0) - (a.grade ?? 0));
  }, [students]);
  //Erembelegdsen suraltsagchdiig hevlen shalgaj baina
  console.log("sorted students", sortedStudents);
  return (
    <>
      <Grid justifyContent="center" margin={'25px'}>
        <Heading color={Colors.primary} fontSize={'26px'} >
          {LeaderboardText.name}
        </Heading>
      </Grid>
      <Grid padding={'20px'} justifyContent="center">
        <TableContainer style={{ height: '530px', fontWeight: '500' }} overflowY="auto" color={Colors.primary} fontSize={'18px'}>
          <Table overflowY={'auto'} width={'800px'}>
            <Thead bgColor={'#353D75'} style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <Tr className="[&>th]:text-white">
                <Th>#</Th>
                <Th>{LeaderboardText.lastName}</Th>
                <Th>{LeaderboardText.firstName}</Th>
                <Th>{LeaderboardText.grade}</Th>
                <Th>{LeaderboardText.award}</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedStudents &&
                sortedStudents.map((student, studentIndex) => {
                  const studentAwards = awards?.filter(
                    (award) => award.minNumber <= (student.grade ?? 0) && (student.grade ?? 0) <= award.maxNumber
                  );
                  return (
                    <Tr key={studentIndex}>
                      <Td fontSize={'24px'}>{studentIndex + 1} </Td>
                      <Td>
                        {student.lastName}
                      </Td>
                      <Td>{student.firstName}</Td>
                      <Td>{student.grade?.toFixed(1)}%</Td>
                      {studentAwards?.map((award, awardIndex) => (
                        <Td key={awardIndex}>
                          {award.name}
                        </Td>
                      ))}
                      <Td><Button size={'sm'} leftIcon={<DragHandleIcon/>} _hover={{ background: "#eae8f0" }} bgColor={'#eae8f0'}></Button></Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default LeaderboardTable;
