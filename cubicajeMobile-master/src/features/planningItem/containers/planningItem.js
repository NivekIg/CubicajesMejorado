import React from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { Button, Text, Appbar, useTheme } from 'react-native-paper';
import { setPlanningItem } from '../slices/planningItem';
import Images from '../../../assets/images';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import usePlanningItem from '../hooks/usePlanningItem';
import Detail from '../components/Detail';

const PlanningSpace = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { open, value, items, setOpen, setValue, selected, goNext, onChangeValue, quantity, onChangeQuantity, goBack } = usePlanningItem();

    const handleSubmit = () => {
        dispatch(setPlanningItem({...selected, quantity}));
        goNext();
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Ítem" />
            </Appbar.Header>
            <View style={[styles.content, {backgroundColor: theme.colors.surface}]}>
                <KeyboardAvoidingView keyboardVerticalOffset={3} >
                    <Image source={Images.productDimension} style={{ height: 150, width: '100%', resizeMode: 'contain' }} />
                    <Text variant="titleMedium" style={styles.text}>Selecciona el ítem e ingresa la cantidad</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        onChangeValue={onChangeValue}
                        placeholder="Seleccionar..."
                    />
                    {selected && <Detail item={selected} quantity={quantity} onChangeQuantity={onChangeQuantity} />}
                </KeyboardAvoidingView>
                <Button mode="contained" disabled={!selected} onPress={handleSubmit}>
                    Iniciar planeamiento de cubicaje
                </Button>
            </View>
        </>
    )
}

export default PlanningSpace;

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