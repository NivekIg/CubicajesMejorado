import { useState, useEffect } from 'react';
import { getSpaces } from '../../api/index';
import { useNavigation } from '@react-navigation/native';

const usePlanningSpace = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(null);
    const [items, setItems] = useState([]);

    const goNext = () => navigation.navigate('PlanningItem');
    const goBack = () => navigation.goBack();

    useEffect(() => {
        const handleGetPlannings = async () => {
            const { body } = await getSpaces();
            setData(body);
            setItems(body.map((el) => { return { label: el.name, value: el.id } }));
        };
        handleGetPlannings();
    }, [])

    const onChangeValue = (value) => {
        setSelected(data.find((el) => el.id === value));
    }

    return {
        open,
        setOpen,
        value,
        setValue,
        items,
        selected,
        goNext,
        goBack,
        onChangeValue
    }
}

export default usePlanningSpace;