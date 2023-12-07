import { Grid,useToast } from '@chakra-ui/react';
import { GetUserApi, RestGetUser } from '@utils/api';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';

const LoginContainer: React.FC = () => {
  const toast = useToast({ position: 'top', isClosable: true });
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<RestGetUser>();
  //Nevtreh tovch darah uyed hiigdeh uildluudiig bichsen code
  //GetUserApi ashiglan hereglegchiin medeelliig avch baigaa
  const onSubmit: SubmitHandler<RestGetUser> = (data) => {
    setLoading(true);
    const id = new Promise((resolve, reject) => {
      new GetUserApi()
        .getUser(data, { withCredentials: true })
        .then((res) => {
          resolve(res.data.data);
          navigate('/');
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
    toast.promise(id, {
      success: { title: 'Login successful', description: 'Redirecting...' },
      error: { title: 'Login failed', description: 'Please try again' },
      loading: { title: 'Logging in', description: 'Please wait...' },
    });
  };
  return (
    <Grid templateRows="1fr" templateColumns="1fr 1fr 1fr"  className="w-screen h-screen">
      <Grid backgroundColor={"white"}></Grid>
      <LoginForm
        loading={loading}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
      <Grid backgroundColor={"white"}></Grid>
    </Grid>
  );
};

export default LoginContainer;
