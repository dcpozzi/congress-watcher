import React, {useEffect} from 'react';
import {Button, Modal, Select, VStack} from 'native-base';
import states from '../constants/brazilianStates';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPartiesRequest,
  selectAllParties,
} from '../redux/reducers/partiesSlicer';

const MemberFilterModal = props => {
  const onClose = props.onClose;
  const parties = useSelector(selectAllParties);
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedParty, setSelectedParty] = React.useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPartiesRequest());
  }, [dispatch]);

  const createSelectStateItems = () => {
    let items = [];
    items.push(<Select.Item label="Nenhum" value={''} />);
    states.forEach(element => {
      items.push(<Select.Item label={element.name} value={element.value} />);
    });
    return items;
  };

  const createSelectPartiesItems = () => {
    let items = [];
    items.push(<Select.Item label="Nenhum" value={''} />);
    parties.forEach(element => {
      items.push(
        <Select.Item
          label={`${element.sigla} - ${element.nome}`}
          value={element.sigla}
        />,
      );
    });
    return items;
  };

  const closeHandler = () => {
    onClose({state: selectedState, party: selectedParty});
  };

  return (
    <Modal isOpen={props.showModal} onClose={closeHandler}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Filtro</Modal.Header>
        <Modal.Body>
          <VStack>
            <Select
              minWidth="200"
              accessibilityLabel="Escolha o estado"
              placeholder="Escolha o estado"
              mt={1}
              selectedValue={selectedState}
              onValueChange={itemValue => setSelectedState(itemValue)}>
              {createSelectStateItems()}
            </Select>
            <Select
              minWidth="200"
              accessibilityLabel="Escolha o partido"
              placeholder="Escolha o partido"
              mt={1}
              selectedValue={selectedParty}
              onValueChange={itemValue => setSelectedParty(itemValue)}>
              {createSelectPartiesItems()}
            </Select>
            <Button onPress={closeHandler}>Filtrar</Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default MemberFilterModal;
