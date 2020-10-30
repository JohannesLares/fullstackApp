import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useMyReviews from '../hooks/useMyReviews';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 10
  },
  largeContainer: {
    display: "flex",
    flexDirection:"row",
    marginBottom: 10,
    paddingRight: 10
  },
  review: {
    width: 50,
    height: 50,
    margin: 10
  },
  rating: {
    paddingTop: 16,
    paddingBottom: 13,
    textAlign: "center",
    borderColor: "#e64ed1",
    color: "#e64ed1",
    borderRadius: 50,
    borderWidth:2,
    fontWeight: "bold"
  },
  container: {
    flex: 1
  }
});

const  ReviewItem = ({ review }) => {

  const date = new Date(review.createdAt);

  return (
    <View style={styles.largeContainer} >
        <View style={styles.review} >
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.container} >
          <Text fontWeight="bold" fontSize="subheading" >{review.repository.fullName}</Text>
          <Text color="textSecondary" >{date.getDate()}.{date.getMonth() +1}.{date.getFullYear()}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  
  const { user } = useMyReviews();

  const reviewNodes = user
    ? user.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item, index }) => <ReviewItem review={item} key={index} />}
      ItemSeparatorComponent={ItemSeparator}
      style={{marginTop: 10}}
      />
  );
};

export default MyReviews;