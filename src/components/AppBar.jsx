import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { AUTHORIZED } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

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

  const [signbutton, setSignbutton] = useState(false);

  const { data, refetch } = useQuery(AUTHORIZED, {
    fetchPolicy: 'cache-and-network'
  }); //eslint-disable-line
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  useEffect(() => {
    if (data && data.authorizedUser && data.authorizedUser !== null) {
      setSignbutton(true);
    } else {
      setSignbutton(false);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <TouchableWithoutFeedback>
          <Link to="/">
            <Text fontSize="subheading" fontWeight="bold" style={styles.text} >Repositories</Text>
          </Link>
        </TouchableWithoutFeedback>
        {signbutton && 
          <TouchableWithoutFeedback>
            <Link to="/review">
              <Text fontSize="subheading" fontWeight="bold" style={styles.text} >Create a review</Text>
            </Link>
          </TouchableWithoutFeedback>          
        }
        {signbutton && 
          <TouchableWithoutFeedback>
            <Link to="/myreviews">
              <Text fontSize="subheading" fontWeight="bold" style={styles.text} >My reviews</Text>
            </Link>
          </TouchableWithoutFeedback>          
        }
        {!signbutton ?
          <TouchableWithoutFeedback>
            <Link to="/signin">
              <Text fontSize="subheading" fontWeight="bold" style={styles.text} >Sign In</Text>
            </Link>
          </TouchableWithoutFeedback>
          :
            <TouchableWithoutFeedback onPress={logout}>
                <Text fontSize="subheading" fontWeight="bold" style={styles.text} >Sign Out</Text>
            </TouchableWithoutFeedback>
        }
        {!signbutton &&
          <TouchableWithoutFeedback>
            <Link to="/signup">
              <Text fontSize="subheading" fontWeight="bold" style={styles.text} >Sign Up</Text>
            </Link>
          </TouchableWithoutFeedback>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;