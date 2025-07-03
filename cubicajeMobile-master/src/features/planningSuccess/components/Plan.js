import { StyleSheet, View, Image } from 'react-native'
import React from 'react';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import NumberBox from './NumberBox';
import Images from '../../../assets/images';

const Plan = ({ title, total, combination, calc, usedVolume, residue, background }) => {
    const renderInfo = () => {
        if (usedVolume) {
            return (
                <View style={{ marginVertical: 12, borderBottomWidth: .5, paddingBottom: 12 }} >
                    <Text style={{ textAlign: 'center' }} >Se usó {(usedVolume / 1000000).toFixed(2)} m3 del volumen total</Text>
                    {residue !== 0 && <Text style={{ textAlign: 'center', marginTop: 8 }}>Quedaron {residue} items fuera de este plan</Text>}
                </View>
            )
        }
    }

    const [l, w, h] = combination;

    const renderImage = () => {
        if (h > l && h > w) {
            return <Image source={Images.firstOrientation} style={{ width: 50, height: 50, marginBottom: 4, borderRadius: 4, borderWidth: 0.5, borderColor: '#ccc' }} />;
        }

        if (w > l && w > h) {
            return <Image source={Images.secondOrientation} style={{ width: 50, height: 50, marginBottom: 4, borderRadius: 4, borderWidth: 0.5, borderColor: '#ccc' }} />;
        }

        if (l > w && l > h) {
            return <Image source={Images.thirdOrientation} style={{ width: 50, height: 50, marginBottom: 4, borderRadius: 4, borderWidth: 0.5, borderColor: '#ccc' }} />;
        }

        return <Icon name="cube-outline" size={40} />;
    }

    return (
        <View style={styles.container} >
            <View style={[styles.header, { backgroundColor: background ? background : '#ccc' }]} >
                <Text variant="titleMedium" >{title}</Text>
                <Text variant="titleMedium" >{total} items</Text>
            </View>
            {renderInfo()}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 8 }} >
                <View style={{ alignItems: 'center' }} >
                    <Text style={{ textAlign: 'center', marginBottom: 8 }}>Orientación</Text>
                    {renderImage()}
                    <Text>Largo: {combination[0] / 100} m</Text>
                    <Text>Ancho: {combination[1] / 100} m</Text>
                    <Text>Alto: {combination[2] / 100} m</Text>
                </View>
                <View style={{ borderLeftWidth: .5 }} ></View>
                <View style={{ alignItems: 'center' }} >
                    <Text style={{ textAlign: 'center', marginBottom: 12 }}>Distribución</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <NumberBox img={Images.profundidad} number={calc[0]} title={'A lo largo'} />
                        <NumberBox img={Images.anchura} number={calc[1]} title={'A lo ancho'} />
                        <NumberBox img={Images.altura} number={calc[2]} title={'A lo alto'} />
                    </View>
                </View>
            </View>
        </View >
    )
}

export default Plan;

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