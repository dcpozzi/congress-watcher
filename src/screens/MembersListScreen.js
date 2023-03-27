import React, {useEffect, useState} from 'react';
import {Box, HStack, Input, FlatList, Text, Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import MemberListItemView from '../components/MemberListItemView';
import LoadingSpinner from '../components/LoadingSpinner';
import OfflineSystemMessage from '../components/OfflineSystemMessage';
import MemberFilterModal from '../components/MemberFilterModal';
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
  const [showModal, setShowModal] = useState(false);
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedParty, setSelectedParty] = React.useState('');
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
  const filteredMembers = members
    .filter(member =>
      member.nome.toLowerCase().includes(namesFilter.toLowerCase()),
    )
    .filter(
      member => selectedParty === '' || member.siglaPartido === selectedParty,
    )
    .filter(member => selectedState === '' || member.siglaUf === selectedState)
    .slice(0, 15);

  const onCloseModal = filter => {
    setShowModal(false);
    if (!filter) return;

    setSelectedState(filter.state);
    setSelectedParty(filter.party);
  };
  console.log('showModal: ' + showModal);
  return (
    <Box backgroundColor={'primary.50'} h="full">
      <HStack backgroundColor={'primary.800'}>
        <Input
          isFocused={true}
          variant="underlined"
          mx="3"
          placeholder="Digite o nome do deputado"
          h="full"
          b
          w="2/3"
          color={'warmGray.50'}
          fontSize={'lg'}
          onChangeText={setNamesFilter}
        />
        <Button onPress={() => setShowModal(true)}>Filtrar</Button>
        <MemberFilterModal
          showModal={showModal}
          onClose={onCloseModal}></MemberFilterModal>
      </HStack>
      <HStack backgroundColor={'primary.500'}>
        <Text>{selectedState}</Text>
        <Text>{selectedParty}</Text>
      </HStack>
      <FlatList
        data={filteredMembers}
        removeClippedSubviews={true}
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
