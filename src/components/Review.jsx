import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { REVIEW } from '../graphql/queries';
import { useHistory } from "react-router-native";

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
  ownerName: yup
    .string()
    .required('Repository owner\'s username is required'),
  repositoryName: yup
    .string()
    .required('Repository\'s name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required between 0 and 100')
});

const ReviewForm = ({onSubmit}) => {
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" style={styles.textInput} />
      <FormikTextInput name="repositoryName" placeholder="Repository name" style={styles.textInput} />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.textInput} />
      <FormikTextInput name="text" multiline={true} placeholder="Review" style={styles.textInput} />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton" >
        <Text style={styles.reviewButton}>Create a review</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const FormikForm = ({onSubmit}) => {
  const initialValues = {
    repositoryName: '',
    rating: '',
    ownerName: '',
    text: ''
  };

  return(
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const Review = () => {
  const history = useHistory();

  const [mutate] = useMutation(REVIEW, {
    onError: (error) => {
      console.log(error);
    }
  });
  const [err, setErr] = useState([]);

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    const { data, error } = await mutate({ variables: { repositoryName, rating: Number(rating), ownerName, text }});
    if (error) setErr(error);
    console.log(data);
    history.push("/repository/"+data.createReview.repositoryId);
  };

  return (
    <View>
      <FormikForm onSubmit={onSubmit} />
    </View>);
};

export default Review;