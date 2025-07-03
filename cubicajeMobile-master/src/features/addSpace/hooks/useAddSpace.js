
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const useAddSpace = () => {
    const navigation = useNavigation();
    const goSpaces = () => navigation.navigate('Spaces');
    const goBack = () => navigation.goBack();

    return {
        goSpaces,
        goBack
    }
}

export default useAddSpace;