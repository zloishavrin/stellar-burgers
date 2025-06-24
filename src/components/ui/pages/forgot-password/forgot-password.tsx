import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { ForgotPasswordUIProps } from './type';

export const ForgotPasswordUI: FC<ForgotPasswordUIProps> = ({
  errorText,
  email,
  handleSubmit,
  handleInputChange
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Восстановление пароля</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name='login'
        onSubmit={handleSubmit}
      >
        <div className='pb-6'>
          <Input
            type='email'
            placeholder='Укажите e-mail'
            onChange={handleInputChange}
            value={email}
            name='email'
            error={false}
            errorText=''
            size='default'
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className={`pb-6 ${styles.button}`}>
          <Button type='primary' size='medium' htmlType='submit'>
            Восстановить
          </Button>
        </div>
        {errorText && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorText}
          </p>
        )}
      </form>
      <div className={`pb-4 ${styles.question} text text_type_main-default`}>
        Вспомнили пароль?
        <Link to='/login' className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </div>
  </main>
);
