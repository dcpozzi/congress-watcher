import React, {useEffect} from 'react';
import {Button, Container, HStack, Modal, Select, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import states from '../constants/brazilianStates';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPartiesRequest,
  selectAllParties,
} from '../redux/reducers/partiesSlicer';

const MemberFilterModal = props => {
  const onClose = props.onClose;
  const filter = props.filter;
  const showModal = props.showModal;

  const parties = useSelector(selectAllParties);
  const [selectedState, setSelectedState] = React.useState(-1);
  const [selectedParty, setSelectedParty] = React.useState(-1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPartiesRequest());
  }, [dispatch]);

  const createSelectStateItems = () => {
    let items = [];
    items.push(<Select.Item label="Nenhum" value={''} key={'empty_state'} />);
    states.forEach(element => {
      items.push(
        <Select.Item
          label={element.name}
          value={element.value}
          key={element.value}
        />,
      );
    });
    return items;
  };
  const createSelectPartiesItems = () => {
    let items = [];
    items.push(<Select.Item label="Nenhum" value={''} key={'empty_party'} />);
    parties.forEach(element => {
      items.push(
        <Select.Item
          label={`${element.sigla} - ${element.nome}`}
          value={element.sigla}
          key={element.sigla}
        />,
      );
    });
    return items;
  };

  const renderRemoveFilterButton = (value, setValue) => {
    if (value === '') {
      return <></>;
    }

    return (
      <Container mt={2}>
        <Icon.Button
          backgroundColor="#00000000"
          color="#606060"
          name="trash"
          onPress={() => setValue('')}></Icon.Button>
      </Container>
    );
  };

  const closeHandler = filter => {
    onClose(filter);
    setSelectedState(-1);
    setSelectedParty(-1);
  };

  const shouldOpen = () => {
    prepareData();
    return showModal;
  };

  const prepareData = () => {
    if (selectedState === -1 && showModal) {
      setSelectedState(filter.state);
      setSelectedParty(filter.party);
    }
  };

  return (
    <Modal isOpen={shouldOpen()} onClose={closeHandler}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Filtro</Modal.Header>
        <Modal.Body>
          <VStack>
            <HStack>
              <Select
                minWidth="240"
                accessibilityLabel="Escolha o estado"
                placeholder="Escolha o estado"
                mt={1}
                selectedValue={selectedState}
                onValueChange={itemValue => setSelectedState(itemValue)}>
                {createSelectStateItems()}
              </Select>
              {renderRemoveFilterButton(selectedState, setSelectedState)}
            </HStack>
            <HStack mt={1}>
              <Select
                minWidth="240"
                accessibilityLabel="Escolha o partido"
                placeholder="Escolha o partido"
                mt={1}
                selectedValue={selectedParty}
                onValueChange={itemValue => setSelectedParty(itemValue)}>
                {createSelectPartiesItems()}
              </Select>
              {renderRemoveFilterButton(selectedParty, setSelectedParty)}
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onPress={() =>
              closeHandler({state: selectedState, party: selectedParty})
            }
            w={'full'}>
            Filtrar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default MemberFilterModal;
