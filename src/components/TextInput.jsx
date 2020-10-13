import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../styles/theme';

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.main,
  }
});

const TextInput = ({ style, error, ...props }) => {
  let textInputStyle = [style];

  if (error) {
    textInputStyle = {
      ...style,
      borderColor: "#eb4034",
      ...styles.text
    };
  } else {
    textInputStyle = {
      ...style,
      ...styles.text
    };
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;