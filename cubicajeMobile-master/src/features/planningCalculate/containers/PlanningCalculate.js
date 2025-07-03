import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native'
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';
import Images from '../../../assets/images';
import { useSelector, useDispatch } from 'react-redux';
import { setPlanningCalculate } from '../slices/planningCalculate';

const Calculate = ({ navigation }) => {
	const dispatch = useDispatch();
	const { planningItem: { item }, planningSpace: { space } } = useSelector((state) => state);
	const { length, width, height } = item;

	const goCalculate = () => {

		if (length === width && length === height) {
			const combinations = [[length, width, height]];

			const calcs = combinations.map(([l, w, h]) => [Math.floor(space.length / l), Math.floor(space.width / w), Math.floor(space.height / h)]);

			const totals = calcs.map((arr) => arr.reduce((prev, cur) => prev * cur));

			const selectedTotal = totals[0];
			const selectedCombination = combinations[0];
			const selectedCalc = calcs[0];
			const selectedIndex = 0;
			dispatch(setPlanningCalculate({ combinations, calcs, totals, selectedTotal, selectedCombination, selectedCalc, selectedIndex }));
		} else {

			//largo, ancho, alto
			const combinations = [
				[length, width, height],
				[width, height, length],
				[height, length, width]
			];

			const calcs = combinations.map(([largo, ancho, alto]) => [Math.floor(space.length / largo), Math.floor(space.width / ancho), Math.floor(space.height / alto)]);

			const totals = calcs.map((arr) => arr.reduce((prev, cur) => prev * cur));

			const selectedTotal = Math.max(...totals);
			const selectedCombination = combinations[totals.indexOf(selectedTotal)];
			const selectedCalc = calcs[totals.indexOf(selectedTotal)];
			const selectedIndex = totals.indexOf(selectedTotal);

			dispatch(setPlanningCalculate({ combinations, calcs, totals, selectedTotal, selectedCombination, selectedCalc, selectedIndex }));
		}
		navigation.navigate('PlanningSuccess');
	}

	useEffect(() => {
		goCalculate();
	}, [])

	return (
		<View style={styles.content} >
			<Image source={Images.calculating} style={{ height: 150, width: '100%', resizeMode: 'contain' }} />
			<ActivityIndicator animating={true} color={MD2Colors.grey700} style={{ marginTop: 40 }} />
			<Text style={{ marginTop: 20 }} >Calculando planeamiento de cubicaje</Text>
		</View>
	)
}

export default Calculate;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
})