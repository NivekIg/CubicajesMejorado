import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

const Input = ({ label, value, handleChange, handleBlur, errorMessage, keyboardType }) => {
    return (
        <View style={styles.container} >
            <TextInput
                label={label}
                type='outlined'
                value={value}
                onChangeText={handleChange}
                onBlur={handleBlur}
                style={styles.input}
                keyboardType={keyboardType}
                error={errorMessage ? true : false}
            />
            {errorMessage && <Text style={styles.error} >{errorMessage}</Text>}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {},
    input: {
        marginTop: 20,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 0.5,
    },
    error: {
        marginTop: 2,
        fontSize: 12,
        color: 'red',
    }
})