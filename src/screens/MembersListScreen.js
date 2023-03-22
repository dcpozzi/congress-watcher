import React, {useEffect, useState} from 'react';
import {Box, HStack, Input, FlatList, Heading} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import MemberListItemView from '../components/MemberListItemView';
import LoadingSpinner from '../components/LoadingSpinner';
import OfflineSystemMessage from '../components/OfflineSystemMessage';
import {
  fetchMembersRequest,
  selectAllMembers,
  getStatus,
  getError,
} from '../redux/reducers/membersSlicer';
import {Screens} from '../constants/navigatorScreens';

const MembersListScreen = ({navigation}) => {
  const members = useSelector(selectAllMembers);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMembersRequest());
  }, [dispatch]);

  const [namesFilter, setNamesFilter] = React.useState('');

  if (status == 'failed') {
    return <OfflineSystemMessage />;
  }
  if (!members) {
    return <LoadingSpinner />;
  }
  const filteredMembers = members.filter(member =>
    member.nome.toLowerCase().includes(namesFilter.toLowerCase()),
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
          onChangeText={setNamesFilter}
        />
      </HStack>
      <FlatList
        data={filteredMembers}
        renderItem={({item}) => (
          <MemberListItemView
            onPress={() =>
              navigation.navigate(Screens.MEMBER_DETAIL_SCREEN, {
                memberId: item.id,
              })
            }
            member={item}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </Box>
  );
};

export default MembersListScreen;
