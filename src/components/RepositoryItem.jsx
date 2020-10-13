import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';

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
    }
});

const RepositoryItem = ({ id, fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl }) => {

  const stripZeros = (item) => {
    if (item > 1000) {
      let it = item/1000;
      var round = Math.round(it * 10) / 10;
      return round + "k";
    }
    return item;
  };

  return(
    <View key={id} style={styles.wrapper}>
      <View style={styles.largeContainer} >
        <Image source={{
          uri: ownerAvatarUrl
        }}
        style={styles.image} />
        <View style={styles.container} >
          <Text fontWeight="bold" fontSize="subheading" >{fullName}</Text>
          <Text color="textSecondary" >{description}</Text>
          <Text style={styles.language} >{language}</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.detail} >
          <Text>{stripZeros(forksCount)}</Text>
          <Text color="textSecondary" >Forks</Text>
        </View>
        <View style={styles.detail} >
          <Text>{stripZeros(stargazersCount)}</Text>
          <Text color="textSecondary" >Stars</Text>
        </View>
        <View style={styles.detail} >
          <Text>{stripZeros(ratingAverage)}</Text>
          <Text color="textSecondary" >Rating</Text>
        </View>
        <View style={styles.detail} >
          <Text>{stripZeros(reviewCount)}</Text>
          <Text color="textSecondary" >Reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;