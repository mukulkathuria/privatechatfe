import React, { FC } from 'react';
import Inputs from './InputControl';

interface FormControlProps {
  control: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
}

const FormControl: FC<FormControlProps> = ({ control, ...props }) => {
  switch (control) {
    case 'input':
      return <Inputs {...props} />;
    case 'textarea':
      return <Inputs as="textarea" {...props} />;
    default:
      return null;
  }
};

FormControl.defaultProps = {
  autoComplete: ''
};

export default FormControl;
