import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { useFetchUser } from '@libs/hooks';
import { CreateUserApi } from '@utils/api';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserForm } from '../../model';
import UserModal from './UserModal';
import UserTable from './UserTable';
import AwardTable from './AwardTable';
import { GamificationListText } from '@libs/text';

//Adminii home page iig hiisen code
//Hereglegch tab deer darah uyed uusgeh tovch haruulna
//Tuhain tovch deer darahad hereglegch uusgeh modal duudagdana
//AwardTable bolon UserTable iig duudan haruulj baigaa
const GamificationList: React.FC = () => {
  const toast = useToast({ position: 'top' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen: isUserOpen, onOpen: onUserOpen, onClose: onUserClose } = useDisclosure();
  const {
    register: registerUser,
    handleSubmit: handleUserSubmit,
    control: userFormControl,
    reset: userReset,
  } = useForm<UserForm>();
  const { refetch: refetchUser } = useFetchUser();
  //Hereglegchiin medeellig hadgalah uyed CreateUserApi duudagdan medeelliig hadgalna
  const onUserSubmit: SubmitHandler<UserForm> = async (data) => {
    new CreateUserApi()
      .createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        grade: data.grade ?? null,
        role: data.role,
      })
      .then((res) => {
        if (res.data) {
          toast({
            status: 'success',
            title: 'Амжилттай үүслээ',
            isClosable: true,
          });
          onUserClose();
          refetchUser();
        }
      })
      .catch((err) => {
        toast({
          status: 'error',
          title: 'something went wrong',
          description: err.message,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const [tabKey, setTabKey] = useState<string>('tab1');
  const [showButton, setShowButton] = useState<boolean>(false);
  return (
    <>
      <Tabs padding="40px">
        <TabList borderBottom="2px" borderColor={'#353D75CC'} color={Colors.primary}>
          <Tab onClick={() => { setTabKey('tab1'); setShowButton(false); }}>
            {GamificationListText.award}
          </Tab>
          <Tab onClick={() => { setTabKey('tab2'); setShowButton(true); }}>
            {GamificationListText.user}
          </Tab>

          <Flex className="w-full justify-end">
            {showButton && (
              <Button
                onClick={tabKey === 'tab2' ? onUserOpen : onUserOpen}
                bgColor={Colors.primary}
                color={'white'}
                className="flex gap-1"
              >
                <AddIcon />
                {tabKey === 'tab2' ? 'Үүсгэх' : 'Үүсгэх'}
              </Button>
            )}
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AwardTable />
          </TabPanel>
          <TabPanel>
            <UserTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <UserModal
        isUserOpen={isUserOpen}
        registerUser={registerUser}
        onUserClose={() => {
          onUserClose();
          userReset();
        }}
        handleUserSubmit={handleUserSubmit}
        onUserSubmit={onUserSubmit}
        isUserLoading={isLoading}
        formControl={userFormControl}
      />
    </>
  );
};
export default GamificationList;
