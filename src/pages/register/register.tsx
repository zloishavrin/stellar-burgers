import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { registerUserApi } from '@api';
import { setCookie } from '../../utils/cookie';
import { RegisterUI } from '@ui-pages';
import { setUser, setAuthenticated } from '../../services/slices/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');

    dispatch(setUser(null));
    dispatch(setAuthenticated(false));

    registerUserApi({ name: userName, email, password })
      .then((data) => {
        localStorage.setItem('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken);
        dispatch(setUser(data.user));
        dispatch(setAuthenticated(true));
        navigate('/', { replace: true });
      })
      .catch((err) => {
        setError(err.message || 'Ошибка регистрации');
        dispatch(setAuthenticated(false));
      });
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
