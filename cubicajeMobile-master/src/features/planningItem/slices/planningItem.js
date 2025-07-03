
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: false,
    item: null
}

const slice = createSlice({
    name: 'planningItem',
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
        setPlanningItem(state, action) {
            state.item = action.payload;
        }
    }
});

export const { setPlanningItem } = slice.actions;

export default slice.reducer;