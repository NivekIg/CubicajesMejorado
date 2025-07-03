import { StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Appbar, useTheme, Text } from 'react-native-paper';
import Images from '../../../assets/images';
import { Input } from '../../uiKit';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import useAddItem from '../hooks/useAddItem';
import { insertItem } from '../../api';
import { addItem } from '../../items/slices/item';

const ItemDimensionPlanning = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const dispatch = useDispatch();
    const { goBack, goItems, items } = useAddItem();

    const schema = Yup.object().shape({
        name: Yup.string().required('El nombre es requerido'),
        width: Yup.number().typeError('Este valor debe ser numérico').required('El ancho es requerido'),
        length: Yup.number().typeError('Este valor debe ser numérico').required('El largo es requerido'),
        height: Yup.number().typeError('Este valor debe ser numérico').required('El alto es requerido'),
        types_id: Yup.string().required('El tipo es requerido')
    });

    const onChangeValue = (value) => {
        values.types_id = value;
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            width: '',
            length: '',
            height: '',
            volume: '',
            types_id: ''
        },
        validationSchema: schema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            const { length, width, height } = values;
            values.volume = length * width * height;
            const { error, body } = await insertItem(values);
            if (!error) {
                const insertedItem = {
                    ...values,
                    id: body.insertId
                }
                dispatch(addItem(insertedItem));
                goItems();
            }
        },
    });

    const {
        errors,
        touched,
        values,
        handleSubmit,
        handleBlur,
        handleChange,
        isSubmitting
    } = formik;

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Nuevo ítem" />
            </Appbar.Header>
            <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
                <View>
                    <Image source={Images.productInfo} style={{ height: 120, width: '100%', resizeMode: 'contain' }} />
                    <Text variant="titleMedium" style={styles.text}>Ingresa los datos del nuevo ítem</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        onChangeValue={onChangeValue}
                        placeholder="Selecciona el tipo"
                    />
                    <Input
                        label="Nombre"
                        value={values.name}
                        handleChange={handleChange('name')}
                        handleBlur={handleBlur('name')}
                        errorMessage={touched.name && errors.name}
                    />
                    <Input
                        label="Ancho (cm)"
                        value={values.width}
                        handleChange={handleChange('width')}
                        handleBlur={handleBlur('width')}
                        keyboardType='number-pad'
                        errorMessage={touched.width && errors.width}
                    />
                    <Input
                        label="Largo (cm)"
                        value={values.length}
                        handleChange={handleChange('length')}
                        handleBlur={handleBlur('length')}
                        keyboardType='number-pad'
                        errorMessage={touched.length && errors.length}
                    />
                    <Input
                        label="Alto (cm)"
                        value={values.height}
                        handleChange={handleChange('height')}
                        handleBlur={handleBlur('height')}
                        keyboardType='number-pad'
                        errorMessage={touched.height && errors.height}
                    />
                </View>
                <Button mode="contained" loading={isSubmitting} onPress={handleSubmit} disabled={!(values.name && values.length && values.width && values.height, values.types_id)} >
                    Guardar
                </Button>
            </View>
        </>
    )
}

export default ItemDimensionPlanning;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    text: {
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 12,
    }
})