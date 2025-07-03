
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getTypes } from '../../api';

const useAddSpace = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([])

    const goItems = () => navigation.navigate('Items');
    const goBack = () => navigation.goBack();

    const handleGetItems = async () => {
        const { body } = await getTypes();
        const updatedData = body.map((item) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setItems(updatedData);
    };

    useEffect(() => {
        handleGetItems();
    }, [])

    return {
        goItems,
        goBack,
        items
    }
}

export default useAddSpace;