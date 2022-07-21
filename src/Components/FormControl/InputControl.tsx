import React, { FC } from 'react';
import { Field, ErrorMessage } from 'formik';
import { InputGroup, InputDiv } from './style/inputcontrol.style';

interface InputProps {
  label: string;
  name: string;
  as?: string;
}

const Inputs: FC<InputProps> = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { label, name, ...rest } = props;

  return (
    <InputGroup>
      <InputDiv>
        <Field name={name} {...rest} />
        <ErrorMessage name={name} />
      </InputDiv>
    </InputGroup>
  );
};

Inputs.defaultProps = {
  as: ''
};

export default Inputs;
