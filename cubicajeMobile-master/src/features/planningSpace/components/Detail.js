import { StyleSheet, View } from 'react-native'
import React from 'react';
import {Text} from 'react-native-paper';

const Detail = ({ item }) => {
    const { name, ciudad, width, height, length, volume } = item;
    return (
        <View style={styles.container} >
            <View style={styles.row} >
                <Text variant="titleSmall">Bodega:</Text>
                <Text style={{ marginLeft: 4, }} >{name}</Text>
            </View>
            <View style={styles.row} >
                <Text variant="titleSmall">Ciudad:</Text>
                <Text style={{ marginLeft: 4, }} >{ciudad}</Text>
            </View>
            <View style={styles.row} >
                <Text variant="titleSmall">Ancho:</Text>
                <Text style={{ marginLeft: 4, }} >{width / 100} m</Text>
            </View>
            <View style={styles.row} >
                <Text variant="titleSmall">Largo:</Text>
                <Text style={{ marginLeft: 4, }} >{length / 100} m</Text>
            </View>
            <View style={styles.row} >
                <Text variant="titleSmall">Alto:</Text>
                <Text style={{ marginLeft: 4, }} >{height / 100} m</Text>
            </View>
            <View style={styles.row} >
                <Text variant="titleSmall">Volumen total:</Text>
                <Text style={{ marginLeft: 4, }} >{(volume / 1000000).toFixed(2)} m3</Text>
            </View>
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