import React from 'react';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';
import { FlatList, View, StyleSheet } from 'react-native';

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

const RepositoryView = ({ repository }) => {

  return <RepositoryItem {...repository} />;

};

const  ReviewItem = ({ review }) => {

  const date = new Date(review.createdAt);

  return (
    <View style={styles.largeContainer} >
        <View style={styles.review} >
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.container} >
          <Text fontWeight="bold" fontSize="subheading" >{review.user.username}</Text>
          <Text color="textSecondary" >{date.getDate()}.{date.getMonth() +1}.{date.getFullYear()}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  const { reviews, fetchMore } = useReviews(id);

  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  const onEnd = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      ListHeaderComponent={() => <RepositoryView repository={repository} />}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEnd}
      onEndReachedThreshold={0.2}
      />
  );
};

export default SingleRepository;