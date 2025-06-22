import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from '../../services/store';
import { registerUserApi } from '@api';
import { setCookie } from '../../utils/cookie';
import { RegisterUI } from '@ui-pages';
import { setUser, setAuthenticated } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(undefined);
    dispatch(setAuthenticated(false));
    dispatch(setUser(null));
    registerUserApi(values)
      .then((res) => {
        if (res.success) {
          setCookie('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch(setAuthenticated(true));
          dispatch(setUser(res.user));
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setError(err.message || 'Ошибка регистрации');
      });
  };

  return (
    <RegisterUI
      errorText={error}
      userName={values.name}
      email={values.email}
      password={values.password}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
