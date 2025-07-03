
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: false,
    items: []
}

const slice = createSlice({
    name: 'planningItems',
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
        setPlanningItems(state, action) {
            state.items = action.payload;
        }
    }
});

export const { setPlanningItems } = slice.actions;

export default slice.reducer;