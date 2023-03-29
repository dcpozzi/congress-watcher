import React, {useEffect, useState} from 'react';
import {
  Box,
  HStack,
  Input,
  FlatList,
  Text,
  Button,
  Container,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import MemberListItemView from '../components/MemberListItemView';
import LoadingSpinner from '../components/LoadingSpinner';
import OfflineSystemMessage from '../components/OfflineSystemMessage';
import MemberFilterModal from '../components/MemberFilterModal';
import {
  fetchMembersRequest,
  selectAllMembers,
  getStatus,
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

  // if (!namesFilter && !selectedParty && !selectedState) {
  const emptyFilters = () => {
    return (
      <Box backgroundColor={'primary.50'} h="full">
        <HStack justifyContent={'center'}>
          <Text fontSize={'md'}>
            Escolha ao menos um filtro ou digite o nome do deputado.
          </Text>
        </HStack>
      </Box>
    );
  };

  const membersList = () => {
    return (
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
    );
  };

  const filteredMembers = members
    .filter(member =>
      member.nome.toLowerCase().includes(namesFilter.toLowerCase()),
    )
    .filter(
      member => selectedParty === '' || member.siglaPartido === selectedParty,
    )
    .filter(member => selectedState === '' || member.siglaUf === selectedState);

  const onCloseModal = filter => {
    setShowModal(false);

    if (!filter) return;
    setSelectedState(filter.state);
    setSelectedParty(filter.party);
  };

  const renderFilter = (value, setValue) => {
    if (value === '') {
      return <></>;
    }

    return (
      <HStack>
        <Text pt={2} pl={1}>
          {value}
        </Text>
        <Icon.Button
          backgroundColor="#00000000"
          color="#606060"
          name="close"
          onPress={() => setValue('')}></Icon.Button>
      </HStack>
    );
  };

  return (
    <Box backgroundColor={'primary.50'} h="full">
      <HStack backgroundColor={'primary.800'}>
        <Input
          flexGrow={1}
          isFocused={true}
          variant="underlined"
          pl="2"
          placeholder="Digite o nome do deputado"
          h="full"
          b
          color={'warmGray.50'}
          fontSize={'lg'}
          onChangeText={setNamesFilter}
        />
        <Button mb="0.1" onPress={() => setShowModal(true)}>
          Filtrar
        </Button>
        <MemberFilterModal
          showModal={showModal}
          onClose={onCloseModal}
          filter={{
            state: selectedState,
            party: selectedParty,
          }}></MemberFilterModal>
      </HStack>
      <HStack backgroundColor={'primary.500'}>
        <HStack w={'full'}>
          {renderFilter(selectedState, setSelectedState)}
          {renderFilter(selectedParty, setSelectedParty)}
        </HStack>

        <Text>{selectedParty}</Text>
      </HStack>
      {!namesFilter && !selectedParty && !selectedState
        ? emptyFilters()
        : membersList()}
    </Box>
  );
};

export default MembersListScreen;
