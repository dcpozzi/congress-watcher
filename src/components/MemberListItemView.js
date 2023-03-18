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

const MemberListItemView = props => {
  const member = props.member;
  const onPress = props.onPress;

  return (
    <Pressable onPress={onPress}>
      <Box
        backgroundColor={'primary.100'}
        borderBottomWidth="1"
        _dark={{
          borderColor: 'muted.50',
        }}
        borderColor="muted.800"
        pl={['0', '4']}
        pr={['0', '5']}
        py="2">
        <HStack space={[2, 3]} justifyContent="space-between">
          <Avatar
            alt={'Imagem do congressista'}
            size="64px"
            source={{
              uri: member.urlFoto,
            }}
          />
          <VStack>
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              bold
              fontSize={'xl'}>
              {member.nome}
            </Text>
            <Text
              color="coolGray.600"
              bold
              _dark={{
                color: 'warmGray.200',
              }}>
              {member.siglaPartido}/{member.siglaUf}
            </Text>
          </VStack>
          <Spacer />
        </HStack>
      </Box>
    </Pressable>
  );
};

export default MemberListItemView;
