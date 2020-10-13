import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    paddingLeft: 15,
    display: "flex",
    backgroundColor: "#4287f5",
    flexDirection: "row"
  },
  text: {
    marginRight: 10
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <TouchableWithoutFeedback>
          <Link to="/">
            <Text fontSize="subheading" fontWeight="bold" style={styles.text} >Repositories</Text>
          </Link>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Link to="/signin">
            <Text fontSize="subheading" fontWeight="bold" >SignIn</Text>
          </Link>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default AppBar;