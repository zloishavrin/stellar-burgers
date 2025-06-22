import { PageUIProps } from '../common-type';

export type ResetPasswordUIProps = PageUIProps & {
  password?: string;
  token?: string;
};
