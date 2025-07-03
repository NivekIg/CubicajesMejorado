import { useState, useEffect } from 'react';
import { getItems } from '../../api/index';
import { useNavigation } from '@react-navigation/native';

const usePlanningItems = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(null);
    const [data, setData] = useState([]);
    const [selecteds, setSelecteds] = useState([]);
    const [items, setItems] = useState([]);

    const goNext = () => navigation.navigate('Calculate');

    useEffect(() => {
        const handleGetItems = async () => {
            const { body } = await getItems();
            setData(body);
            setItems(body.map((el) => { return { label: el.name, value: el.id } }));
        };
        handleGetItems();
    }, [])

    const onChangeValue = (values) => {
        if (values) {
            const updatedSelecteds = values.map((value) => {
                const existItem = selecteds.find((item) => item.id === value);
                if(!existItem) {
                    return {
                        ...data.find((item) => item.id === value),
                        quantity: 1
                    };
                }
                return existItem;
            })
            setSelecteds(updatedSelecteds);
        }
    }

    const onChangeQuantity = (item, value) => {
        const updatedSelecteds = selecteds.map((el) => {
            if (el.id === item.id) {
                return {
                    ...el,
                    quantity: value
                }
            }
            return el;
        })
        setSelecteds(updatedSelecteds);
    }

    return {
        open,
        setOpen,
        values,
        setValues,
        items,
        goNext,
        selecteds,
        onChangeValue,
        onChangeQuantity
    }
}

export default usePlanningItems;