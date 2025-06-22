import { PageUIProps } from '../common-type';

export type RegisterUIProps = PageUIProps & {
  userName: string;
  email: string;
  password: string;
};
