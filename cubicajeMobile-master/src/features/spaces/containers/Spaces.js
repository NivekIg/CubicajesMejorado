import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native'
import { Appbar, Searchbar, ActivityIndicator, MD3Colors, useTheme, Text } from 'react-native-paper';
import Space from '../components/Space';
import useSpace from '../hooks/useSpace';

const Spaces = () => {
    const theme = useTheme();
    const { isLoading, searchedList, query, onChangeQuery, goAdd, goUpdate } = useSpace();

    const renderItem = ({ item }) => <Space item={item} goUpdate={goUpdate} />;

    const renderEmpty = () => (<Text style={{marginTop: 20, textAlign: 'center'}} >No se encontraron coincidencias para bodegas.</Text>)

    const renderContent = () => {
        if (isLoading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.surface }} >
                    <ActivityIndicator animating={true} color={MD3Colors.neutral50} />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.colors.surface }} >
                <FlatList data={searchedList} renderItem={renderItem} showsVerticalScrollIndicator={false} ListEmptyComponent={renderEmpty} />
            </View>)
    }

    return (
        <>
            <Appbar.Header mode="small" >
                <Appbar.Content title="Bodegas" />
                <Appbar.Action icon="plus" onPress={goAdd} />
            </Appbar.Header>
            <Searchbar
                placeholder="Buscar..."
                onChangeText={onChangeQuery}
                value={query}
            />
            {renderContent()}
        </>
    )
}

export default Spaces;

const styles = StyleSheet.create({}) 