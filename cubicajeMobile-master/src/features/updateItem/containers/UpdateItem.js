import { StyleSheet, View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Text, Appbar, useTheme } from 'react-native-paper';
import Images from '../../../assets/images';
import { Input } from '../../uiKit';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import useAddItem from '../hooks/useUpdateItem';
import { updateItem } from '../../api';
import { updateItem as updateItemSlice } from '../../items/slices/item';
import moment from 'moment';

const UpdateItem = ({ route }) => {
    const { id } = route.params;
    const theme = useTheme();
    const { goBack, itemsTypes, item } = useAddItem(id);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(item.types_id);
    const dispatch = useDispatch();

    const schema = Yup.object().shape({
        name: Yup.string().required('El ancho es requerido'),
        width: Yup.number().typeError('Este valor debe ser numérico').required('El ancho es requerido'),
        length: Yup.number().typeError('Este valor debe ser numérico').required('El largo es requerido'),
        height: Yup.number().typeError('Este valor debe ser numérico').required('El alto es requerido'),
        types_id: Yup.string().required('El alto es requerido')
    });

    const { name, width, length, height, volume, types_id, created_at } = item;

    const onChangeValue = (value) => {
        values.types_id = value;
    }

    const formik = useFormik({
        initialValues: {
            id: id,
            name: name,
            width: width.toString(),
            length: length.toString(),
            height: height.toString(),
            volume: volume,
            types_id: types_id
        },
        validationSchema: schema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            const now = new Date();
            const { length, width, height } = values;
            values.volume = length * width * height;
            values.updated_at = moment(now).format('YY-MM-DD HH:mm:ss');
            const { error } = await updateItem(values);
            if (!error) {
                Alert.alert('Actualizacion', 'Ítem actualizado correctamente');
                values.updated_at = moment(now).format();
                values.created_at = created_at;
                dispatch(updateItemSlice({ values }));
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
                <Appbar.Content title="Actualizar ítem" />
            </Appbar.Header>
            <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
                <View>
                    <Image source={Images.productInfo} style={{ height: 120, width: '100%', resizeMode: 'contain', marginBottom: 16, }} />
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={itemsTypes}
                        setOpen={setOpen}
                        setValue={setValue}
                        onChangeValue={onChangeValue}
                        placeholder="Seleccione el tipo"
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
                        handleBlue={handleBlur('width')}
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
                        handleBlue={handleBlur('height')}
                        keyboardType='number-pad'
                        errorMessage={touched.height && errors.height}
                    />
                </View>
                <Button mode="contained" loading={isSubmitting} onPress={handleSubmit} disabled={!(values.name && values.length && values.width && values.height, values.types_id)} >
                    Actualizar
                </Button>
            </View>
        </>
    )
}

export default UpdateItem;

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
        marginVertical: 12,
    }
})