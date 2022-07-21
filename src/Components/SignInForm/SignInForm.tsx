import React, { memo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  initialValues,
  initialValuesDto,
  validationSchema
} from './FormikControls/initialvalidation';
import FormControl from '../FormControl/FormControl';
import { LoginButtonDiv, StyledButton } from './style/singnInform.style';

const SignInForm = memo(() => {
  const navigate = useNavigate();

  const onSubmitting = async (
    values: initialValuesDto,
    submitprops: FormikHelpers<initialValuesDto>
  ) => {
    try {
      const { getLogin } = await import('src/services/login/login.services');
      await getLogin(values);
      // eslint-disable-next-line no-console
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      submitprops.setSubmitting(false);
      if (!err?.response) {
        submitprops.resetForm();
      }
      submitprops.setFieldError('username', err.response.data.message);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validationSchema}
      onSubmit={onSubmitting}
    >
      {(formik) => (
        <Form>
          <FormControl
            control="input"
            label="Username"
            name="username"
            type="text"
            placeholder="username or email"
            autoComplete="new-password"
          />
          <FormControl
            control="input"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
          />
          <LoginButtonDiv className="loginbuttondiv">
            <StyledButton
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Login in..' : 'Log in'}
            </StyledButton>
          </LoginButtonDiv>
        </Form>
      )}
    </Formik>
  );
});
export default SignInForm;
