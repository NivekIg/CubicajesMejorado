import { StyleSheet, View, Image } from 'react-native'
import React from 'react';
import { Text } from 'react-native-paper';

const NumberBox = ({ img, number, title }) => {
  return (
    <View style={{alignItems: 'center'}} >
      <View style={styles.container} >
        <Image source={img} style={styles.image} />
        <Text style={{fontSize: 10}} >{title}</Text>
      </View>
      <Text variant="titleMedium" style={{marginTop: 4}} >{number}</Text>
    </View>
  )
}

export default NumberBox;

const styles = StyleSheet.create({
  container: {
    borderWidth: .5,
    padding: 2,
    borderRadius: 8,
    borderColor: '#ccc',
    alignItems: 'center',
    marginHorizontal: 12
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  image: {
    height: 25,
    width: 25,
  },
  number: {
    marginLeft: 4
  }
})