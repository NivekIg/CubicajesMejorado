import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    spaces: [],
}

const slice = createSlice({
    name: 'space',
    initialState,
    reducers: {
        setSpaces(state, action) {
            state.spaces = action.payload;
        },
        addSpace(state, action) {
            state.spaces = [action.payload, ...state.spaces];
        },
        updateSpace(state, action) {
            const { values } = action.payload;
            state.spaces = state.spaces.map((el) => {
                if (el.id === values.id) {
                    return {
                        ...values
                    }
                }
                return el;
            })
        }
    }
});

export const { setSpaces, addSpace, updateSpace } = slice.actions;

export default slice.reducer;