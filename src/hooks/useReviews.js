import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (id) => {
  const [reviews, setReviews] = useState();

  const { data, error, loading, refetch, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    variables: { id, first: 4 },
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    
    const canFetchMore = 
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }



    fetchMore({
      query: GET_REVIEWS,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first: 4,
        id
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges
              ]
            }
          }
        };
        return nextResult;
      }
    });
  };

  useMemo(() => {
    if(data && data.repository && data.repository.reviews) {
      setReviews(data.repository.reviews);
      console.log(data);
    }
    console.log(data);
  }, [data]);

  useMemo(() => {
    console.log(error);
  }, [error]);

  return { reviews, loading, refetch: refetch, ...result, fetchMore: handleFetchMore };
};

export default useReviews;