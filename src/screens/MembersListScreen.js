import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Box, HStack, Input, Pressable} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import MemberListItemView from '../components/MemberListItemView';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  fetchMembersRequest,
  selectAllMembers,
} from '../redux/reducers/membersSlicer';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MembersListScreen = ({navigation}) => {
  const members = useSelector(selectAllMembers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMembersRequest());
  }, [dispatch]);

  const [nameFilter, setNameFilter] = React.useState('');

  if (!members) {
    return <LoadingSpinner />;
  }
  const filteredMembers = members.filter(member =>
    member.nome.toLowerCase().includes(nameFilter.toLowerCase()),
  );

  return (
    <Box backgroundColor={'primary.50'} h="full">
      <HStack backgroundColor={'primary.800'}>
        <Input
          variant="underlined"
          mx="3"
          placeholder="Digite o nome do deputado"
          h="full"
          b
          w="full"
          color={'warmGray.50'}
          fontSize={'lg'}
          onChangeText={setNameFilter}
        />
      </HStack>
      <FlatList
        data={filteredMembers}
        renderItem={({item}) => (
          <MemberListItemView
            onPress={() => navigation.navigate('Deputado', {memberId: item.id})}
            member={item}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MembersListScreen;
