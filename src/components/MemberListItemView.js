import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const MemberListItemView = props => {
  const member = props.member;
  return (
    <View style={styles.memberContainer}>
      <Text style={styles.memberName}>{member.nome}</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: member.urlFoto,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  memberContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberName: {
    fontSize: 18,
  },
  tinyLogo: {
    marginEnd: 15,
    width: 50,
    height: 50,
  },
});

export default MemberListItemView;
