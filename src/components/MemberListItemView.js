import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Box,
  VStack,
  HStack,
  Spacer,
  Text,
  Flex,
  Pressable,
} from 'native-base';
import ItemInfoView from './ItemInfoView';
import {brlCurrencyFormat} from '../helpers/masks';

const memberStatsView = member => {
  console.log(member);
  if (!member.totalProposicoes) return <></>;

  return (
    <VStack>
      <HStack borderTopColor={'gray.500'}>
        <Text fontSize={'md'} bold>
          {'Proposições: '}
        </Text>
        <Text fontSize={'md'}>{member.totalProposicoes}</Text>
      </HStack>
      <HStack borderTopColor={'gray.500'}>
        <Text fontSize={'md'} bold>
          {'Gastos: '}
        </Text>
        <Text fontSize={'md'}>
          {brlCurrencyFormat.format(member.totalDocumentos)}
        </Text>
      </HStack>
    </VStack>
  );
};
const MemberListItemView = props => {
  const member = props.member;
  const memberStats = props.memberStats;
  const onPress = props.onPress;
  console.log(member);
  return (
    <Pressable onPress={onPress}>
      <Box
        backgroundColor={'primary.100'}
        borderBottomWidth="1"
        _dark={{
          borderColor: 'muted.50',
        }}
        borderColor="muted.800"
        py="2">
        <HStack space={[2, 2]} justifyContent="space-around">
          <HStack ml={2}>
            <Avatar
              alt={'Imagem do congressista'}
              size="64px"
              source={{
                uri: member.urlFoto,
              }}
            />
            <VStack ml={2}>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                width={250}
                color="coolGray.800"
                bold
                fontSize={'xl'}>
                {member.nome}
              </Text>
              {memberStatsView(member)}
            </VStack>
          </HStack>
          <Flex>
            <Text
              textAlign="right"
              color="coolGray.600"
              bold
              maxW={100}
              overflow="hidden"
              _dark={{
                color: 'warmGray.200',
              }}
              mr={2}
              mt={1}>
              {member.siglaPartido}/{member.siglaUf}
            </Text>
          </Flex>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default MemberListItemView;
