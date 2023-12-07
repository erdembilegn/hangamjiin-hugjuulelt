import {
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { UserModalProps } from '../../model';
import { UserModalText } from '@libs/text';
import { Role } from '@utils/api';
//Hereglegch uusgeh modal
//Hereglegch uusgeh tovch deer darahad duudagdana
//Hadgalah tovch n handleUserSubmit(onUserSubmit) avch baigaa
const UserModal: React.FC<UserModalProps> = (props) => {
  const { isUserOpen, onUserClose, registerUser, handleUserSubmit, onUserSubmit, isUserLoading } = props;
  return (
    <>
      <Modal isOpen={isUserOpen} onClose={onUserClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size={'md'} color={Colors.primary}>
              {UserModalText.createUser}
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={Colors.primary} />
          <ModalBody>
            <form onSubmit={handleUserSubmit(onUserSubmit)} className="gap-y-2 flex flex-col">
              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.lastName}</Text>
                <Input
                  {...registerUser('lastName', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={UserModalText.userNamePlaceHolder}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.firstName}</Text>
                <Input
                  {...registerUser('firstName', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={UserModalText.userFirstNamePlaceHolder}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.email}</Text>
                <Input
                  {...registerUser('email', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={UserModalText.userEmailPlaceHolder}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.password}</Text>
                <Input
                  {...registerUser('password', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={UserModalText.userPasswordPlaceHolder}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.grade}</Text>
                <Input
                  {...registerUser('grade', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={UserModalText.userGradePlaceHolder}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.role}</Text>
                <Select borderColor={Colors.primary} {...registerUser('role', { required: true })}>
                  <option value={Role.Student}>{Role.Student}</option>
                </Select>
              </Grid>

              <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                <Button
                  onClick={onUserClose}
                  variant={'outline'}
                  color={Colors.primary}
                  borderColor={Colors.primary}
                >
                  {UserModalText.cancel}
                </Button>
                <Button
                  onClick={() => {
                    handleUserSubmit(onUserSubmit)
                    console.log('clicked')
                  }}
                  type="submit"
                  backgroundColor={Colors.primary}
                  color={'white'}
                  isLoading={isUserLoading}
                >
                  {UserModalText.create}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserModal;
