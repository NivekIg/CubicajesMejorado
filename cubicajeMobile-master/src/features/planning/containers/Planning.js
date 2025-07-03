import { StyleSheet, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Text, Appbar, useTheme, Card, Avatar, Switch, MD2Colors, ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import { getItemsByPlanning, updatePlanning } from '../../api';
import { updatePlannings } from '../../plannings/slices/planning';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../components/Item';

const Planning = ({ navigation, route }) => {
  const { id } = route.params;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { plannings } = useSelector(({ planning }) => planning);
  const planning = plannings.find((item) => item.id === id);
  const { created_at, volume, entry_date, output_date, name, ciudad, spaceVolume, items } = planning;
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isLoadingSwitch, setIsLoadingSwitch] = useState(false);
  const [list, setList] = useState([]);
  const [text, setText] = useState('');

  const validateSwitch = () => {
    if (!entry_date && !output_date) {
      setIsSwitchOn(false);
      setText('Ingresar mercancía');
    } else if (entry_date && !output_date) {
      setIsSwitchOn(true);
      setText('Retirar mercancía');
    } else if (entry_date && output_date) {
      setIsSwitchOn(false)
      setText('Mercancía retirada');
    }
  }

  const goBack = () => navigation.goBack();

  const onToggleSwitch = async () => {
    setIsLoadingSwitch(true);
    const data = { id };

    const now = new Date();

    const keyword = isSwitchOn ? 'output_date' : 'entry_date';
    const textLabel = isSwitchOn ? 'Mercancía retirada' : 'Retirar mercancía';

    data[keyword] = moment(now).format('YY-MM-DD HH:mm:ss');

    const response = await updatePlanning(data);
    if (!response.error) {
      Alert.alert('Actualizado', 'Es estado de la mercancía de este planeamiento fué actualizado correctamente');
      data[keyword] = moment(now).format();
      const updatedPlanning = {
        ...planning,
        ...data
      }
      dispatch(updatePlannings({ updatedPlanning }))
      setIsSwitchOn(!isSwitchOn);
      setText(textLabel);
      setIsLoadingSwitch(false);
    } else {
      setIsLoadingSwitch(false);
    }
  };

  const handleGetItemsByPlanning = async () => {
    const response = await getItemsByPlanning(id);
    setList(response.body);
  }

  useEffect(() => {
    handleGetItemsByPlanning();
  }, [])

  const renderItems = () => {
    if (list.length !== 0) {
      return <Item item={list[0]} />
    }
    return null;
  }

  const renderSwitch = () => {
    if (isLoadingSwitch) {
      return (<ActivityIndicator animating={true} color={MD2Colors.blue100} />);
    }
    return (<Switch value={isSwitchOn} onValueChange={onToggleSwitch} disabled={entry_date && output_date} />)
  }

  useEffect(() => {
    validateSwitch();
  }, [])

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Detalles de planeamiento" />
      </Appbar.Header>
      <View style={[styles.content, { backgroundColor: theme.colors.surface }]} >
        <Card style={{ padding: 12 }} >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
            <Text variant="titleLarge" >Planeamiento </Text>
            <Text variant="titleLarge" style={{ fontWeight: 'bold' }} >{id}</Text>
          </View>
          <Text style={{ marginBottom: 12, textAlign: 'center' }} >{moment(created_at).fromNow()}</Text>
          <Text variant="titleMedium" style={{ marginVertical: 12 }}  >
            Bodega
          </Text>
          <Text>{name}, {ciudad}</Text>
          <Text variant="titleMedium" style={{ marginVertical: 12 }} >Volumen ocupado </Text>
          <Text>{(volume / 1000000).toFixed(2)} m3 de {(spaceVolume / 1000000).toFixed(2)} m3</Text>
          <Text variant="titleMedium" style={{ marginVertical: 12 }}  >
            Estado de planeamiento
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <Text>{text}</Text>
            {renderSwitch()}
          </View>
          <Text variant="titleMedium" style={{ marginVertical: 12 }}  >
            Mercancías o ítems
          </Text>
          {renderItems()}
        </Card>
      </View>
    </>
  )
}

export default Planning

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
})