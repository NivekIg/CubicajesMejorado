import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Text, Chip, useTheme } from 'react-native-paper';
import moment from 'moment';

const Planning = ({ item, goPlanning }) => {
    const { id, created_at, volume, entry_date, output_date, name, spaceVolume, items } = item;
    const theme = useTheme();

    renderStatus = () => {
        if (entry_date && output_date) {
            return (<Text style={{ width: 80, borderWidth: 1, borderColor: theme.colors.secondary, paddingLeft: 8, borderRadius: 4, marginBottom: 4, color: theme.colors.secondary }} >Retirado</Text>);
        }

        if (entry_date) {
            return (<Text style={{ width: 80, borderWidth: 1, borderColor: 'green', paddingLeft: 8, borderRadius: 4, marginBottom: 4, color: 'green' }} >Ingresado</Text>);
        }

        return (<Text style={{ width: 80, borderWidth: 1, borderColor: theme.colors.error, paddingLeft: 8, borderRadius: 4, marginBottom: 4, color: theme.colors.error }} >Sin uso</Text>)
    }

    return (
        <TouchableOpacity style={{borderBottomWidth: 1, paddingBottom: 12, borderBottomColor: '#ccc', paddingTop: 20 }} onPress={() => goPlanning(id)}>
            {renderStatus()}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ccc', paddingVertical: 4, borderRadius: 4, marginBottom: 4, paddingHorizontal: 8 }} >
                <Text>Nro: {id}</Text>
                <Text>{moment(created_at).fromNow()}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <View style={{ alignItems: 'center', justifyContent: 'flex-end', padding: 4, marginRight: 8, borderColor: '#ccc' }} >
                    <Icon name="cube-outline" size={20} />
                    <Text>{items}</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text variant="titleSmall">Bodega:</Text>
                        <Text style={{ marginLeft: 4, }} >{name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text variant="titleSmall">Espacio usado:</Text>
                        <Text style={{ marginLeft: 4, }} >{(volume / 1000000).toFixed(2)} m3 de {(spaceVolume / 1000000).toFixed(2)} m3</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Planning

const styles = StyleSheet.create({})