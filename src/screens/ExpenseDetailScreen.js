import React from 'react';
import {Linking} from 'react-native';
import {Button, Box, VStack} from 'native-base';
import ItemInfoView from '../components/ItemInfoView';
import moment from 'moment';

const ExpenseDetailScreen = props => {
  const expense = props.route.params.expense;
  const navigation = props.navigation;
  const brlCurrencyFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  });
  const cnpjMask = value => {
    return value
      .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
      .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'); // captura os dois últimos 2 números, com um - antes dos dois números
  };

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
