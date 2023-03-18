import React, {useEffect} from 'react';
import {Box, Text, FlatList, HStack, Spinner, VStack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import ExpensesListItemView from '../components/ExpensesListItemView';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  fetchExpensesRequest,
  getExpenses,
} from '../redux/reducers/expensesSlicer';

const MembersListScreen = props => {
  const memberId = props.route.params.memberId;
  const navigation = props.navigation;
  const expenses = useSelector(getExpenses);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(memberId);
    dispatch(fetchExpensesRequest({memberId: memberId, year: '2023'}));
  }, [dispatch]);

  if (!expenses) {
    return <LoadingSpinner />;
  }

  const sumWithInitial = expenses.reduce(
    (accumulator, expense) => accumulator + expense.valorDocumento,
    0,
  );

  const brlCurrencyFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  });

  return (
    <Box bg={'primary.50'} h={'full'}>
      <Text
        bg={'primary.800'}
        color={'gray.100'}
        fontSize="md"
        bold>{` Total: ${brlCurrencyFormat.format(sumWithInitial)}`}</Text>
      <FlatList
        data={expenses}
        renderItem={({item}) => (
          <ExpensesListItemView
            onPress={() => navigation.navigate('Despesa', {expense: item})}
            expense={item}
          />
        )}
        keyExtractor={item => item.codDocumento.toString()}
      />
    </Box>
  );
};

export default MembersListScreen;
