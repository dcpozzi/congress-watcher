import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMembersRequest} from '../redux/actions/congressMembersAction';

const CongressmanList = () => {
  const members = useSelector(state => state).congressMembersReducer.members;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMembersRequest());
  }, [dispatch]);

  if (!members) {
    return (
      <View style={styles.container}>
        <Text style={styles.personName}>'Carregando...'</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        renderItem={({item}) => (
          <View style={styles.personContainer}>
            <Text style={styles.personName}>{item.nome}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  personContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  personName: {
    fontSize: 18,
  },
});

export default CongressmanList;
