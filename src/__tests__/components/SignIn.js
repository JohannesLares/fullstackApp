import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { FormikForm } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(<FormikForm onSubmit={onSubmit} />);
      
      fireEvent.changeText(getByTestId('usernameField'), 'pekka');
      fireEvent.changeText(getByTestId('passwordField'), '123456');
      fireEvent.press(getByTestId('submitButton'));

      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'pekka',
          password: '123456'
        });
        // expect the onSubmit function to have been called once and with a correct first argument
      });
    });
  });
});