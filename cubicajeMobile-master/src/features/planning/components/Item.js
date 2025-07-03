import { StyleSheet, View } from 'react-native'
import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import NumberBox from './NumberBox';
import Images from '../../../assets/images';

const Item = ({ item }) => {
    const { name, quantity, rowspan, stacks, cols } = item;
    const theme = useTheme();
    return (
        <View style={styles.container} >
            <View style={[styles.header, { backgroundColor: theme.colors.primary, borderRadius: 4, }]} >
                <Text variant="titleMedium" style={{color: 'white'}} >{name}</Text>
                <Text variant="titleMedium" style={{color: 'white'}} >{quantity} items</Text>
            </View>
            <View style={{ padding: 8 }} >
                <Text style={{ textAlign: 'center', marginBottom: 12 }}>Distribución</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                    <NumberBox img={Images.profundidad} number={rowspan} title={'A lo largo'} />
                    <NumberBox img={Images.anchura} number={cols} title={'A lo ancho'} />
                    <NumberBox img={Images.altura} number={stacks} title={'A lo alto'} />
                </View>
            </View>
        </View >
    )
}

export default Item;

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
    }
})