import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-native";

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    padding: 8,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1
  },
  loginButton: {
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
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

const SignInForm = ({onSubmit}) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" style={styles.textInput} />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} style={styles.textInput} />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.loginButton}>Sign In</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {

  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data.authorize.accessToken);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    username: '',
    password: ''
  };

  return(
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;