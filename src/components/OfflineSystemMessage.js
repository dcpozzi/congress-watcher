import {VStack, HStack, Spinner, Heading} from 'native-base';

const OfflineSystemMessage = () => {
  return (
    <VStack justifyContent="center" h={'full'}>
      <HStack p={2} space={8} justifyContent="center">
        <Heading>
          {'Sistema do Congresso está fora do ar. Tente novamente mais tarde.'}
        </Heading>
      </HStack>
    </VStack>
  );
};

export default OfflineSystemMessage;
