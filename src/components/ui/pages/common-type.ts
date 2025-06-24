import { SyntheticEvent, ChangeEvent } from 'react';

export type PageUIProps = {
  errorText?: string;
  handleSubmit: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
