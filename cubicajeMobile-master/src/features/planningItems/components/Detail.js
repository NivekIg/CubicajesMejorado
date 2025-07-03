import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper';

const Detail = ({ items, onChangeQuantity }) => {
    return (
        <View>
            {items.map((item, index) => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }} key={item.name.toString()} >
                        <Text variant="headlineSmall" style={{ marginRight: 8 }} >{index + 1}</Text>
                        <TextInput
                            label='Item'
                            value={item.name}
                            disabled
                            style={{ width: 140, marginRight: 8 }}
                        />
                        <TextInput
                            label='Cantidad'
                            value={item.quantity.toString()}
                            onChangeText={(value) => onChangeQuantity(item, value)}
                            style={{ width: 120 }}
                        />
                    </View>
                )
            })}
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 8,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    }
})