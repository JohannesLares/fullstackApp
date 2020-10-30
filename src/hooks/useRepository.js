import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const [repository, setRepository] = useState();

  const { data, error, loading, refetch } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });

  useMemo(() => {
    if(data && data.repository) {
      setRepository(data.repository);
    }
    console.log(data);
  }, [data]);

  useMemo(() => {
    console.log(error);
  }, [error]);

  return { repository, loading, refetch: refetch };
};

export default useRepository;