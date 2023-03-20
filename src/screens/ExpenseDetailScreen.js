import React from 'react';
import {Linking} from 'react-native';
import {Button, Box, VStack} from 'native-base';
import ItemInfoView from '../components/ItemInfoView';
import moment from 'moment';
import {cnpjMask, brlCurrencyFormat} from '../helpers/masks';

const ExpenseDetailScreen = props => {
  const expense = props.route.params.expense;

  return (
    <Box backgroundColor={'primary.50'} h={'full'}>
      <VStack justifyContent={'center'}>
        <ItemInfoView labelName={'Fornecedor'} value={expense.nomeFornecedor} />
        <ItemInfoView
          labelName={'CNPJ/CPF'}
          value={cnpjMask(expense.cnpjCpfFornecedor)}
        />
        <ItemInfoView labelName={'Tipo'} value={expense.tipoDespesa} />
        <ItemInfoView
          labelName={'Valor'}
          value={brlCurrencyFormat.format(expense.valorLiquido)}
        />
        <ItemInfoView
          labelName={'Data'}
          value={moment(expense.dataDocumento, 'YYYY-MM-DD').format(
            'DD/MM/YYYY',
          )}
        />
        <ItemInfoView labelName={'Tipo Doc.'} value={expense.tipoDocumento} />
        <ItemInfoView labelName={'Número Doc.'} value={expense.numDocumento} />
      </VStack>
      <Button
        size={'lg'}
        onPress={() => {
          Linking.openURL(expense.urlDocumento);
        }}>
        Nota Fiscal
      </Button>
    </Box>
  );
};

export default ExpenseDetailScreen;
