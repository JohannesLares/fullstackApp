import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 10
  },
});

const ListHeader = ({ setArgs, args }) => {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const onChangeSearch = (query) => {
    setSearch(query);
  };

  useEffect(() => {
    setArgs({...args, searchKeyword: value});
  }, [value]);

  return (
    <View>
      <Searchbar
        placeholder="Search"
        value={search}
        onChangeText={onChangeSearch}
        />
      <RNPickerSelect
        onValueChange={(value) => setArgs({...args, orderBy: value.orderBy, orderDirection: value.orderDirection})}
        items={[
          { label: "Latest repositories", value: {orderBy: "CREATED_AT", orderDirection: "DESC"}},
          { label: "Oldest repositories", value: {orderBy: "CREATED_AT", orderDirection: "ASC"}},
          { label: "Highest rates repositories", value: {orderBy: "RATING_AVERAGE", orderDirection: "DESC"}},
          { label: "Lowest rated repositories", value: {orderBy: "RATING_AVERAGE", orderDirection: "ASC"}},
        ]}
        />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {

  renderHeader = () => {
    return (
      <ListHeader setArgs={this.props.setArgs} args={this.props.args} />
    );
  }

  

  render() {

    const repositoryNodes = this.props.repositories
    ? this.props.repositories.edges.map(edge => edge.node)
    : [];

    const goTo = (id) => {
      this.props.history.push('/repository/'+id);
    };
    return (
      <View>
        
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
              <TouchableOpacity onPress={() => goTo(item.id)} >
                <RepositoryItem {...item} />
              </TouchableOpacity>
          )}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
};

const RepositoryList = () => {

  const { repositories, setArgs, args } = useRepositories();

  const history = useHistory();

  return <RepositoryListContainer repositories={repositories} setArgs={setArgs} args={args} history={history} />;
};

export default RepositoryList;