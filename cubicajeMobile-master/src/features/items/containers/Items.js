import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Appbar, Searchbar, useTheme, ActivityIndicator, MD3Colors, Text } from 'react-native-paper';
import Item from '../components/Item'
import useItem from '../hooks/useItem'

const Items = () => {
    const theme = useTheme();
    const { isLoading, searchedList, query, goAdd, onChangeQuery, goUpdate } = useItem();

    const renderItem = ({ item }) => <Item item={item} goUpdate={goUpdate} />

    const renderEmpty = () => (<Text style={{marginTop: 20, textAlign: 'center'}} >No se encontraron coincidencias para ítems.</Text>)

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
                <Appbar.Content title="Items" />
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

export default Items;

const styles = StyleSheet.create({}) 