import { useState, useEffect } from 'react';
import { getPlannings } from '../../api/index';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setPlannings } from '../slices/planning';

const usePlanning = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const { plannings } = useSelector(({ planning }) => planning);
    const [searchedList, setSearchedList] = useState([]);
    const [query, setQuery] = useState('');

    const onChargeSearch = (query) => {
        setQuery(query);
        const newSearchedList = plannings.filter((el) => {
            return el.name.toLowerCase().includes(query.toLowerCase());
        });
        setSearchedList(newSearchedList);
    };

    const goAdd = () => navigation.navigate('PlanningSpace');

    const goPlanning = (id) => navigation.navigate('Planning', { id: id });

    useEffect(() => {
        const handleGetPlannings = async () => {
            setIsLoading(true);
            const data = await getPlannings();
            dispatch(setPlannings(data.body));
            setSearchedList(data.body);
            setIsLoading(false);
        };
        handleGetPlannings();
    }, [])

    useEffect(() => {
        setSearchedList(plannings);
    }, [plannings])

    return {
        onChargeSearch,
        searchedList,
        query,
        goAdd,
        isLoading,
        goPlanning
    }
}

export default usePlanning;