import React from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Text, Appbar } from 'react-native-paper';
import Images from '../../../assets/images';
import { Input } from '../../uiKit';
import { useDispatch } from 'react-redux';
import useAddSpace from '../hooks/useAddSpace';
import { updateSpace } from '../../api';
import { updateSpace as updateSpaceSlice } from '../../spaces/slices/space';
import moment from 'moment';

const UpdateSpace = ({ route }) => {
    const { id } = route.params;
    const dispatch = useDispatch();
    const { goBack, space } = useAddSpace(id);

    const { name, width, length, height, ciudad, created_at } = space;

    const schema = Yup.object().shape({
        name: Yup.string().required('Este valor es requerido'),
        width: Yup.number().typeError('Este valor debe ser numérico').required('Este valor es requerido'),
        length: Yup.number().typeError('Este valor debe ser numérico').required('Este valor es requerido'),
        height: Yup.number().typeError('Este valor debe ser numérico').required('Este valor es requerido'),
        ciudad: Yup.string().required('Este valor es requerido'),
    });

    const formik = useFormik({
        initialValues: {
            id: id,
            name: name,
            width: width.toString(),
            length: length.toString(),
            height: height.toString(),
            ciudad: ciudad,
        },
        validationSchema: schema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            const now = new Date();
            const { length, width, height } = values;
            values.volume = length * width * height;
            values.updated_at = moment(now).format('YY-MM-DD HH:mm:ss');
            const { error } = await updateSpace(values);
            if (!error) {
                Alert.alert('Actualización', 'La bodega se actualizó correctamente');
                values.created_at = created_at;
                values.updated_at = moment(now).format();
                dispatch(updateSpaceSlice({ values }));
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
                <Appbar.Content title="Actualizar bodega" />
            </Appbar.Header>
            <View style={styles.content}>
                <View>
                    <Image source={Images.spaceDimension} style={{ height: 140, width: '100%', resizeMode: 'contain' }} />
                    <Input
                        label="Nombre"
                        value={values.name}
                        handleChange={handleChange('name')}
                        handleBlur={handleBlur('name')}
                        keyboardType='number-pad'
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
                    Continuar
                </Button>
            </View>
        </>
    )
}

export default UpdateSpace;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    text: {
        textAlign: 'center',
        marginBottom: 12,
    }
})