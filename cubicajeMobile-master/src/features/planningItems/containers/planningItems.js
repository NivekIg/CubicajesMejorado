import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text, Appbar } from 'react-native-paper';
import { setPlanningItems } from '../slices/planningItems';
import Images from '../../../assets/images';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import usePlanningItems from '../hooks/usePlanningItems';
import Detail from '../components/Detail';

const PlanningItems = () => {
    const dispatch = useDispatch();
    const { open, values, items, setOpen, setValues, goNext, onChangeValue, data, selecteds, onChangeQuantity } = usePlanningItems();

    const handleSubmit = () => {
        dispatch(setPlanningItems(selecteds));
        goNext();
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Items" />
            </Appbar.Header>
            <View style={styles.content}>
                <View>
                    <Image source={Images.spaceDimension} style={{ height: 80, width: '100%', resizeMode: 'contain' }} />
                    <Text variant="titleMedium" style={styles.text}>Seleccione los items</Text>
                    <DropDownPicker
                        multiple
                        open={open}
                        value={values}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValues}
                        onChangeValue={onChangeValue}
                        placeholder="Seleccionar..."
                    />
                    {values && <Detail items={selecteds} onChangeQuantity={onChangeQuantity} />}
                </View>
                <Button mode="contained" disabled={!values} onPress={handleSubmit}>
                    Continuar
                </Button>
            </View>
        </>
    )
}

export default PlanningItems;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    input: {
        marginTop: 20,
    },
    text: {
        textAlign: 'center',
        marginBottom: 24,
    }
})