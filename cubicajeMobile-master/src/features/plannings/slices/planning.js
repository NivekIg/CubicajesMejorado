import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    plannings: [],
}

const slice = createSlice({
    name: 'planning',
    initialState,
    reducers: {
        setPlannings(state, action) {
            state.plannings = action.payload;
        },
        addPlanning(state, action) {
            state.plannings = [action.payload, ...state.plannings]
        },
        updatePlannings(state, action) {
            const { updatedPlanning } = action.payload;
            const updated = state.plannings.map((item) => {
                if (item.id === updatedPlanning.id) {
                    return {
                        ...item,
                        ...updatedPlanning
                    };
                }
                return item;
            })
            state.plannings = updated;
        }
    }
});

export const { setPlannings, addPlanning, updatePlannings } = slice.actions;

export default slice.reducer;