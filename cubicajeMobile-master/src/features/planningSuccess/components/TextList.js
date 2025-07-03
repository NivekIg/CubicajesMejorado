import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import React from 'react';
import { Text } from 'react-native-paper';

const TextList = ({ title }) => {
  return (
    <View style={styles.container} >
      <Icon name="check" color="green" />
      <Text style={styles.title} >{title}</Text>
    </View>
  )
}

export default TextList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  title: {
    marginLeft: 4,
  }
})