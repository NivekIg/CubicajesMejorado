
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getTypes } from '../../api';
import { useSelector } from 'react-redux';

const useUpdateSpace = (id) => {
    const navigation = useNavigation();
    const [itemsTypes, setItemsType] = useState([]);
    const { items } = useSelector(({ item }) => item);

    const goBack = () => navigation.goBack();

    const handleGetItems = async () => {
        const { body } = await getTypes();
        const updatedData = body.map((item) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setItemsType(updatedData);
    };

    useEffect(() => {
        handleGetItems();
    }, [])

    return {
        goBack,
        itemsTypes,
        item: items.find((el) => el.id === id)
    }
}

export default useUpdateSpace;