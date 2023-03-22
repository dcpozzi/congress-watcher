import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMemberRequest, getMember} from '../redux/reducers/memberSlicer';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Button,
  Text,
  Image,
  HStack,
  Box,
  VStack,
  Heading,
  Divider,
  ScrollView,
} from 'native-base';
import moment from 'moment';
import {Screens} from '../constants/navigatorScreens';

const MemberDetailScreen = props => {
  const memberId = props.route.params.memberId;
  const navigation = props.navigation;
  const member = useSelector(getMember);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMemberRequest(memberId));
  }, [dispatch]);

  if (!member || !member.ultimoStatus) {
    return <LoadingSpinner />;
  }
  return (
    <Box backgroundColor={'primary.50'} h={'full'}>
      <HStack
        justifyContent={'space-around'}
        p={4}
        backgroundColor={'primary.800'}>
        <Image
          alt={'Imagem do congressista'}
          borderRadius={20}
          style={styles.tinyLogo}
          source={{
            uri: member.ultimoStatus.urlFoto,
          }}></Image>
        <VStack justifyContent={'center'}>
          <Heading size="xl" color={'gray.100'}>
            {member.ultimoStatus.nome}
          </Heading>
          <HStack justifyContent={'center'}>
            <Heading color={'gray.300'}>
              {member.ultimoStatus.siglaPartido}
            </Heading>
            <Heading> </Heading>
            <Heading color={'gray.300'}>{member.ultimoStatus.siglaUf}</Heading>
          </HStack>
        </VStack>
      </HStack>
      <ScrollView w="full" h="80">
        <VStack p={2}>
          <Text fontSize={'2xl'}>Contato</Text>
          <Text fontSize={'xl'}>{member.ultimoStatus.email}</Text>
        </VStack>
        <Divider
          my="2"
          _light={{
            bg: 'muted.800',
          }}
          _dark={{
            bg: 'muted.50',
          }}
        />
        <VStack p={2}>
          <Text fontSize={'2xl'}>Nascimento</Text>
          <Text fontSize={'xl'}>
            {member.municipioNascimento}-{member.ufNascimento}
          </Text>
          <Text fontSize={'xl'}>
            {moment(member.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')}
          </Text>
        </VStack>
        <Divider
          my="2"
          _light={{
            bg: 'muted.800',
          }}
          _dark={{
            bg: 'muted.50',
          }}
        />
        <VStack p={2}>
          <Text fontSize={'2xl'}>Gabinete</Text>
          <Text fontSize={'xl'}>{member.ultimoStatus.gabinete.email}</Text>
          <Text fontSize={'xl'}>{member.ultimoStatus.gabinete.telefone}</Text>
        </VStack>
      </ScrollView>
      <Button
        size={'lg'}
        onPress={() =>
          navigation.navigate(Screens.EXPENSES_LIST_SCREEN, {
            memberId: memberId,
          })
        }>
        Despesas
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    marginEnd: 15,
    width: 100,
    height: 100,
  },
  box: {
    borderWidth: 2,
    padding: 2,
    borderRadius: 10,
    borderColor: '#ff0000',
    marginTop: 20,
  },
});

export default MemberDetailScreen;
