import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Box,
  VStack,
  HStack,
  Spacer,
  Text,
  Pressable,
} from 'native-base';

const ItemInfoView = props => {
  const labelName = props.labelName;
  const value = props.value;

  return (
    <Box
      m={1}
      pl={1}
      pr={1}
      borderTopStyle={'solid'}
      borderTopColor={'gray.500'}
      borderTopWidth={1}>
      <Text fontSize={'md'} bold>
        {labelName}
      </Text>
      <Text fontSize={'md'}>{value}</Text>
    </Box>
  );
};

export default ItemInfoView;
