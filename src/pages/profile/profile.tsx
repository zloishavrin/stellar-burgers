import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TRegisterData, updateUserApi } from '@api';
import { TUser } from '@utils-types';
import { useForm } from '../../hooks/useForm';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) as TUser | null;

  const { values, handleChange, setValues } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setValues({
        ...values,
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user, setValues]);

  const isFormChanged =
    values.name !== user?.name ||
    values.email !== user?.email ||
    !!values.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const updateData: Partial<TRegisterData> = {};
    if (values.name !== user?.name) updateData.name = values.name;
    if (values.email !== user?.email) updateData.email = values.email;
    if (values.password) updateData.password = values.password;

    if (Object.keys(updateData).length > 0) {
      updateUserApi(updateData)
        .then((data) => {
          dispatch({ type: 'user/setUser', payload: data.user });
          setValues({ ...values, password: '' });
        })
        .catch((err) => {
          console.error('Ошибка обновления профиля:', err);
          alert(err);
        });
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  return (
    <ProfileUI
      formValue={values}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
