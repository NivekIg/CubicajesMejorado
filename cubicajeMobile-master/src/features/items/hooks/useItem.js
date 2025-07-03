import { useState, useEffect } from 'react';
import { getItems } from '../../api/index';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setItems } from '../slices/item';

const useItem = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [searchedList, setSearchedList] = useState([]);
    const [query, setQuery] = useState('');
    const { items } = useSelector(({ item }) => item);

    const onChangeQuery = (query) => {
        setQuery(query);
        const newSearchedList = items.filter((el) => {
            return el.name.toLowerCase().includes(query.toLowerCase());
        });
        setSearchedList(newSearchedList);
    };

    const goAdd = () => navigation.navigate('AddItem');

    const goUpdate = (id) => navigation.navigate('UpdateItem', { id: id });

    const handleGetPlannings = async () => {
        setIsLoading(true);
        const data = await getItems();
        dispatch(setItems(data.body));
        setSearchedList(data.body);
        setIsLoading(false);
    };

    useEffect(() => {
        handleGetPlannings();
    }, [])

    useEffect(() => {
        setSearchedList(items);
    }, [items])

    return {
        onChangeQuery,
        searchedList,
        query,
        goAdd,
        goUpdate,
        isLoading
    }
}

export default useItem;