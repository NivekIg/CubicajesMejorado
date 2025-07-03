import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Text, Appbar, useTheme } from 'react-native-paper';
import Images from '../../../assets/images';
import { Input } from '../../uiKit';
import { useDispatch } from 'react-redux';
import useAddSpace from '../hooks/useAddSpace';
import { addSpace } from '../../spaces/slices/space';
import { insertSpace } from '../../api';

const AddSpace = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { goBack, goSpaces } = useAddSpace();

    const schema = Yup.object().shape({
        name: Yup.string().required('El nombre es requerido'),
        width: Yup.number().typeError('Este valor debe ser numérico').required('El ancho es requerido'),
        length: Yup.number().typeError('Este valor debe ser numérico').required('El largo es requerido'),
        height: Yup.number().typeError('Este valor debe ser numérico').required('El alto es requerido'),
        ciudad: Yup.string().required('La ciudad es requerido'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            width: '',
            length: '',
            height: '',
            ciudad: '',
        },
        validationSchema: schema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            const { length, width, height } = values;
            const space = {
                ...values,
                volume: length * width * height
            };
            const { error, body } = await insertSpace(space);
            if (!error) {
                const insertedSpace = {
                    ...space,
                    id: body.insertId
                };
                dispatch(addSpace(insertedSpace));
                goSpaces();
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
                <Appbar.Content title="Nueva bodega" />
            </Appbar.Header>
            <View style={[styles.content, {backgroundColor: theme.colors.surface}]}>
                <View>
                    <Image source={Images.spaceDimension} style={{ height: 120, width: '100%', resizeMode: 'contain' }} />
                    <Text variant="titleMedium" style={styles.text}>Ingresa los datos de la nueva bodega</Text>
                    <Input
                        label="Nombre"
                        value={values.name}
                        handleChange={handleChange('name')}
                        handleBlur={handleBlur('name')}
                        errorMessage={touched.name && errors.name}
                    />
                    <Input
                        label="Ciudad"
                        value={values.ciudad}
                        handleChange={handleChange('ciudad')}
                        handleBlur={handleBlur('ciudad')}
                        keyboardType='number-pad'
                        errorMessage={touched.ciudad && errors.ciudad}
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
                <Button mode="contained" loading={isSubmitting} disabled={!(values.name && values.ciudad && values.length && values.width && values.height)} onPress={handleSubmit}>
                    Guardar
                </Button>
            </View>
        </>
    )
}

export default AddSpace;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    text: {
        textAlign: 'center',
    }
})