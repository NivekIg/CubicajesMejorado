import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const useUpdateSpace = (id) => {
    const { spaces } = useSelector(({ space }) => space);
    const navigation = useNavigation();

    const goBack = () => navigation.goBack();

    return {
        goBack,
        space: spaces.find((el) => el.id === id)
    }
}

export default useUpdateSpace;