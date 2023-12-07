import { RestGetUser } from '@utils/api';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
//Nevtreh hesgiin props
export interface LoginFormProps {
  register: UseFormRegister<RestGetUser>;
  onSubmit: SubmitHandler<RestGetUser>;
  handleSubmit: UseFormHandleSubmit<RestGetUser>;
  loading: boolean;
}
