import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED } from '../graphql/queries';

const useMyReviews = () => {
  const [user, setUser] = useState();

  const { data, error, loading, refetch } = useQuery(AUTHORIZED, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  useMemo(() => {
    if(data && data.authorizedUser) {
      setUser(data.authorizedUser);
    }
    console.log(data);
  }, [data]);

  useMemo(() => {
    console.log(error);
  }, [error]);

  return { user, loading, refetch: refetch };
};

export default useMyReviews;