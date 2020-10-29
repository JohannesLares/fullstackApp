import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  useMemo(() => {
    if(data && data.repositories) {
      setRepositories(data.repositories);
    }
    console.log(data);
  }, [data]);

  useMemo(() => {
    console.log(error);
  }, [error]);

  return { repositories, loading, refetch: refetch };
};

export default useRepositories;