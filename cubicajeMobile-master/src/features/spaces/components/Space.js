import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Text } from 'react-native-paper';
import moment from 'moment';

const Space = ({ item, goUpdate }) => {
    const { id, created_at, updated_at, name, width, length, height, ciudad } = item;
    return (
        <TouchableOpacity style={{ marginTop: 16 }} onPress={() => goUpdate(id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ccc', padding: 4, paddingHorizontal: 8, borderRadius: 4, marginBottom: 4 }} >
                <Text>{name}, {ciudad}</Text>
                <Text>{moment(updated_at).fromNow()}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Icon name="warehouse" size={34} />
                <View style={{ marginLeft: 8 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text variant="titleSmall">Ancho:</Text>
                        <Text style={{ marginLeft: 4, }} >{(width / 100).toFixed(2)} m</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text variant="titleSmall" >Largo:</Text>
                        <Text style={{ marginLeft: 4, }} >{(length / 100).toFixed(2)} m</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text variant="titleSmall">Alto:</Text>
                        <Text style={{ marginLeft: 4, }} >{(height / 100).toFixed(2)} m</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Space;

const styles = StyleSheet.create({})