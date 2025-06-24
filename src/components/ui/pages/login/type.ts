import { PageUIProps } from '../common-type';

export type LoginUIProps = PageUIProps & {
  email: string;
  password: string;
};
