import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: false,
    combinations: [],
    calcs: [],
    totals: [],
    selectedCombination: [],
    selectedCalc: [],
    selectedTotal: '',
    selectedIndex: ''
}

const slice = createSlice({
    name: 'planningCalculate',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        endLoading(state) {
            state.isLoading = false;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setPlanningCalculate(state, action) {
            state.combinations = action.payload.combinations;
            state.calcs = action.payload.calcs;
            state.totals = action.payload.totals;
            state.selectedCalc = action.payload.selectedCalc;
            state.selectedCombination = action.payload.selectedCombination;
            state.selectedTotal = action.payload.selectedTotal;
            state.selectedIndex = action.payload.selectedIndex;
        }
    }
});

export const { setPlanningCalculate } = slice.actions;

export default slice.reducer;