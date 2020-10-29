import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { LOGIN } from '../graphql/queries';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(LOGIN, {
    onError: (error) => {
      alert(error.graphQLErrors[0].message);
    }
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password }});
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    return data;
  };


  return [signIn, result];
};

export default useSignIn;