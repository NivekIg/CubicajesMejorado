import { useState, useEffect } from 'react';
import { getSpaces } from '../../api/index';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setSpaces } from '../slices/space';

const useSpace = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [searchedList, setSearchedList] = useState([]);
    const [query, setQuery] = useState('');
    const { spaces } = useSelector(({ space }) => space);

    const onChangeQuery = (query) => {
        setQuery(query);
        const newSearchedList = spaces.filter((el) => {
            return el.name.toLowerCase().includes(query.toLowerCase());
        });
        setSearchedList(newSearchedList);
    };

    const goAdd = () => navigation.navigate('AddSpace');

    const goUpdate = (id) => navigation.navigate('UpdateSpace', { id: id });

    const handleGetSpaces = async () => {
        setIsLoading(true);
        const data = await getSpaces();
        dispatch(setSpaces(data.body));
        setSearchedList(data.body);
        setIsLoading(false);
    };

    useEffect(() => {
        handleGetSpaces();
    }, [])

    useEffect(() => {
        setSearchedList(spaces);
    }, [spaces])

    return {
        onChangeQuery,
        searchedList,
        query,
        goAdd,
        goUpdate,
        isLoading
    }
}

export default useSpace;