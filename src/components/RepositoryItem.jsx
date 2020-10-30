import React from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import * as Linking from 'expo-linking';;

const styles = StyleSheet.create({
    wrapper: {
      padding: 10
    },
    largeContainer: {
      display: "flex",
      flexDirection:"row",
      marginBottom: 10
    },
    detailContainer: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-around"
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start"
    },
    detail: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    image: {
      width: 50,
      height: 50,
      marginRight: 15,
    },
    language: {
      padding: 5,
      backgroundColor: "#e64ed1",
      marginTop: 10,
      color: "white",
      borderRadius: 5
    },
    button: {
      margin: 10,
      backgroundColor: "#e64ed1",
      padding: 12,
      borderRadius: 5,
      color: "white",
      textAlign: "center"
    }
});

const RepositoryItem = ({ id, fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl, url }) => {

  const stripZeros = (item) => {
    if (item > 1000) {
      let it = item/1000;
      var round = Math.round(it * 10) / 10;
      return round + "k";
    }
    return item;
  };

  const openUrl = (url) => {
    Linking.openURL(url);
  };

  return(
    <View key={id} style={styles.wrapper}>
      <View style={styles.largeContainer} >
        <Image source={{
          uri: ownerAvatarUrl
        }}
        style={styles.image} />
        <View style={styles.container} >
          <Text fontWeight="bold" fontSize="subheading" testID="fullName" >{fullName}</Text>
          <Text color="textSecondary" testID="description" >{description}</Text>
          <Text style={styles.language} testID="language" >{language}</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.detail} >
          <Text testID="forks" >{stripZeros(forksCount)}</Text>
          <Text color="textSecondary" >Forks</Text>
        </View>
        <View style={styles.detail} >
          <Text testID="stargazers" >{stripZeros(stargazersCount)}</Text>
          <Text color="textSecondary" >Stars</Text>
        </View>
        <View style={styles.detail} >
          <Text testID="rating" >{stripZeros(ratingAverage)}</Text>
          <Text color="textSecondary" >Rating</Text>
        </View>
        <View style={styles.detail} >
          <Text testID="reviews" >{stripZeros(reviewCount)}</Text>
          <Text color="textSecondary" >Reviews</Text>
        </View>
      </View>
      {url !== undefined &&
        <View>
          <TouchableWithoutFeedback onPress={() => openUrl(url)} testID="submitButton" >
            <Text style={styles.button}>Open in GitHub</Text>
          </TouchableWithoutFeedback>
        </View>
      }
    </View>
  );
};

export default RepositoryItem;