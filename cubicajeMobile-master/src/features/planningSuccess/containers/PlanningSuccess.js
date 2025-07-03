import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Button, Text, Appbar, useTheme } from 'react-native-paper';
import Plan from '../components/Plan';
import { useSelector, useDispatch } from 'react-redux';
import { insertPlanning } from '../../api';
import { addPlanning } from '../../plannings/slices/planning';

const Planning = ({ navigation }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const [isLoading, setIsLoading] = useState(false);
	const { combinations, calcs, totals, selectedCombination, selectedCalc, selectedTotal, selectedIndex } = useSelector(({ planningCalculate }) => planningCalculate);
	const { item } = useSelector(({ planningItem }) => planningItem);
	const { space } = useSelector(({ planningSpace }) => planningSpace);

	let total = item.quantity;

	const [columns, rows, stacks] = selectedCalc;

	const calculateCalc = [0, 0, 0];
	let usedVolume = 0, residue = 0;

	if (total <= selectedTotal) {
		if (total < rows * stacks) {
			calculateCalc[2] = Math.ceil(total / rows);
			calculateCalc[1] = rows;
			calculateCalc[0] = 1;
		} else {
			calculateCalc[0] = Math.ceil(total / (rows * stacks));
			calculateCalc[1] = rows;
			calculateCalc[2] = stacks;
		}
		usedVolume = total * item.volume;
	} else {
		calculateCalc[0] = columns;
		calculateCalc[1] = rows;
		calculateCalc[2] = stacks;
		usedVolume = space.length * space.width * space.height;
		residue = total - selectedTotal;
		total = selectedTotal;
	}

	const handleSubmit = async () => {
		setIsLoading(true);
		const planning = {
			volume: usedVolume,
			spaces_id: space.id,
			items: [{
				items_id: item.id,
				quantity: total,
				cols: calculateCalc[0],
				rowspan: calculateCalc[1],
				stacks: calculateCalc[2]
			}]
		}
		const response = await insertPlanning(planning);
		if (!response.error) {
			setIsLoading(false);
			dispatch(addPlanning(response.body));
			navigation.navigate('AppTab');
		} else {
			Alert.alert('Algo sucedió', 'Hubo un error, intentelo nuevamente más tarde')
		}
	}

	return (
		<>
			<Appbar.Header>
				<Appbar.Content title="Plan de cubicaje" />
			</Appbar.Header>
			<View style={styles.content} >
				<ScrollView showsVerticalScrollIndicator={false} >
					<Text variant="titleMedium" style={{ marginVertical: 8, textAlign: 'center' }} >Resultados de cálculos</Text>
					{totals.map((el, index) => (
						<Plan key={index.toString()} title={`${index + 1}`} total={el} combination={combinations[index]} calc={calcs[index]} background={index === selectedIndex && theme.colors.primaryContainer} />
					))}
					<Text variant="titleMedium" style={{ marginVertical: 24, textAlign: 'center' }} >Resultado final</Text>
					<Plan title={``} total={item.quantity} combination={selectedCombination} calc={calculateCalc} usedVolume={usedVolume} residue={residue} />
					<View style={{height: 60}} />
				</ScrollView>
				<View style={{ paddingTop: 12 }} >
					<Button mode="contained" isLoading={isLoading} onPress={handleSubmit}>
						Guardar Plan
					</Button>
					<Button style={{ marginTop: 12 }} mode="text" onPress={() => navigation.navigate('AppTab')}>
						Salir sin guardar
					</Button>
				</View>
			</View>
		</>
	)
}

export default Planning

const styles = StyleSheet.create({
	content: {
		flex: 1,
		paddingHorizontal: 20,
		paddingBottom: 40,
		justifyContent: 'space-between',
	},
})