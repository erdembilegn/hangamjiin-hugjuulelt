import {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
//Hereglegchiin modal iin props iig zaasan code
export interface UserModalProps {
  isUserOpen: boolean;
  onUserClose: () => void;
  registerUser: UseFormRegister<UserForm>;
  onUserSubmit: SubmitHandler<UserForm>;
  handleUserSubmit: UseFormHandleSubmit<UserForm>;
  formControl: Control<UserForm>;
  isUserLoading: boolean;
}
//Hereglegchiin form
export interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  grade: number | null;
  role: 'Student';
}
