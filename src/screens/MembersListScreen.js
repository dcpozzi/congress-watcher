import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MemberListItemView from '../components/MemberListItemView';
import {
  fetchMembersRequest,
  selectAllMembers,
} from '../redux/reducers/membersSlicer';

const MembersListScreen = ({navigation}) => {
  const members = useSelector(selectAllMembers);
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
          <MemberListItemView
            onPress={() => navigation.navigate('Deputado', {memberId: item.id})}
            member={item}
          />
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
});

export default MembersListScreen;
