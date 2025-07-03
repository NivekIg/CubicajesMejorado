import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Appbar, Searchbar, useTheme, ActivityIndicator, MD3Colors, Text } from 'react-native-paper';
import Planning from '../components/Planning';
import usePlannings from '../hooks/usePlanning';

const Plannings = () => {
  const theme = useTheme();
  const { searchedList, query, onChargeSearch, goAdd, isLoading, goPlanning } = usePlannings();

  const renderItem = ({ item }) => <Planning item={item} goPlanning={goPlanning} />

  const renderEmpty = () => (<Text style={{marginTop: 20, textAlign: 'center'}} >No se encontraron coincidencias para planeamientos.</Text>)

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.surface }} >
          <ActivityIndicator animating={true} color={MD3Colors.red800} />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.colors.surface }} >
        <FlatList data={searchedList} renderItem={renderItem} showsVerticalScrollIndicator={false} ListEmptyComponent={renderEmpty} />
      </View>
    )
  }

  return (
    <>
      <Appbar.Header mode="small" >
        <Appbar.Content title="Lista de cubicajes" />
        <Appbar.Action icon="plus" color='white' onPress={goAdd} />
      </Appbar.Header>
      <Searchbar
        placeholder="Buscar..."
        onChangeText={onChargeSearch}
        value={query}
      />
      {renderContent()}
    </>
  )
}

export default Plannings;

const styles = StyleSheet.create({});