
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: false,
    space: null
}

const slice = createSlice({
    name: 'planningSpace',
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
        setPlanningSpace(state, action) {
            state.space = action.payload;
        }
    }
});

export const { setPlanningSpace } = slice.actions;

export default slice.reducer;