import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text, Appbar, useTheme } from 'react-native-paper';
import { setPlanningSpace } from '../slices/planningSpace';
import Images from '../../../assets/images';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import usePlanningSpace from '../hooks/usePlanningSpace';
import Detail from '../components/Detail';

const PlanningSpace = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { open, value, items, setOpen, setValue, selected, goNext, onChangeValue, goBack } = usePlanningSpace();

    const handleSubmit = () => {
        dispatch(setPlanningSpace(selected));
        goNext();
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Bodega" />
            </Appbar.Header>
            <View style={[styles.content, {backgroundColor: theme.colors.surface}]}>
                <View>
                    <Image source={Images.spaceDimension} style={{ height: 150, width: '100%', resizeMode: 'contain' }} />
                    <Text variant="titleMedium" style={styles.text}>Selecciona la bodega</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        onChangeValue={onChangeValue}
                        placeholder="Seleccionar..."
                    />
                    {selected && <Detail item={selected} />}
                </View>
                <Button mode="contained" disabled={!selected} onPress={handleSubmit}>
                    Continuar
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