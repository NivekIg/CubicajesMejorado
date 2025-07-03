import { useState, useEffect } from 'react';
import { getItems } from '../../api/index';
import { useNavigation } from '@react-navigation/native';

const usePlanningSpace = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(null);
    const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState('1');

    const goNext = () => navigation.navigate('PlanningCalculate');
    const goBack = () => navigation.goBack();

    useEffect(() => {
        const handleGetItems = async () => {
            const { body } = await getItems();
            setData(body);
            setItems(body.map((el) => { return { label: el.name, value: el.id } }));
        };
        handleGetItems();
    }, [])

    const onChangeValue = (value) => {
        setSelected(data.find((el) => el.id === value));
    }

    const onChangeQuantity = (value) => setQuantity(value);

    return {
        open,
        setOpen,
        value,
        setValue,
        items,
        selected,
        goNext,
        goBack,
        onChangeValue,
        quantity,
        onChangeQuantity
    }
}

export default usePlanningSpace;