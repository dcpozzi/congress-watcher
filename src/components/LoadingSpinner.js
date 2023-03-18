import {VStack, HStack, Spinner, Heading} from 'native-base';

const LoadingSpinner = () => {
  return (
    <VStack justifyContent="center" h={'full'}>
      <HStack space={8} justifyContent="center">
        <Spinner color="primary.500" size="lg" />
      </HStack>
    </VStack>
  );
};

export default LoadingSpinner;
