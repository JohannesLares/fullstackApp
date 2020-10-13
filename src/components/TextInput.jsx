import React from 'react';
import { TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ style, error, ...props }) => {
  let textInputStyle = [style];

  if (error) {
    textInputStyle = {
      ...style,
      borderColor: "#eb4034"
    };
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;