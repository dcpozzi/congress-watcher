import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Box, VStack, HStack, Text, Pressable} from 'native-base';
import moment from 'moment';

const ExpensesListItemView = props => {
  const expense = props.expense;
  const onPress = props.onPress;
  const brlCurrencyFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  });
  return (
    <Pressable onPress={onPress}>
      <Box
        backgroundColor={'primary.100'}
        borderBottomWidth="1"
        _dark={{
          borderColor: 'muted.50',
        }}
        borderColor="muted.800"
        pl="3"
        pr="3"
        py="2">
        <VStack width={'full'}>
          <Text
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800"
            bold>
            {expense.nomeFornecedor}
          </Text>
          <HStack justifyContent={'space-between'}>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              {brlCurrencyFormat.format(expense.valorDocumento)}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              {moment(expense.dataDocumento, 'YYYY-MM-DD').format('DD/MM/YYYY')}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default ExpensesListItemView;
