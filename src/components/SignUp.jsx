import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP } from '../graphql/queries';
import { useHistory } from "react-router-native";
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    padding: 8,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1
  },
  reviewButton: {
    margin: 10,
    backgroundColor: "#e64ed1",
    padding: 12,
    borderRadius: 5,
    color: "white",
    textAlign: "center"
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Username id required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match')
    .required('Password confirmation is required')
});

const SignUpForm = ({onSubmit}) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" style={styles.textInput} />
      <FormikTextInput name="password" secureTextEntry={true} placeholder="Password" style={styles.textInput} />
      <FormikTextInput name="confirm" secureTextEntry={true} placeholder="Password confirmation" style={styles.textInput} />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton" >
        <Text style={styles.reviewButton}>Sign Up</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const FormikForm = ({onSubmit}) => {
  const initialValues = {
    username: '',
    password: '',
    confirm: ''
  };

  return(
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignUp = () => {

  const history = useHistory();
  const [signIn] = useSignIn();

  const [mutate] = useMutation(SIGNUP, {
    onError: (error) => {
      console.log(error);
    }
  });

  const onSubmit = async (values) => {
    const { username, password } = values;
    const { data } = await mutate({ variables: { username, password }});
    console.log(data);
    if (data && data.createUser && data.createUser.id) {
      try {
        const data = await signIn({ username, password });
        console.log(data);
        history.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  };  

  return (
    <View>
      <FormikForm onSubmit={onSubmit} />
    </View>);
};

export default SignUp;