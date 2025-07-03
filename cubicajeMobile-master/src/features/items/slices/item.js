import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

const slice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
        addItem(state, action) {
            state.items = [action.payload, ...state.items]
        },
        updateItem(state, action) {
            const { values } = action.payload;
            state.items = state.items.map((item) => {
                if (item.id === values.id) {
                    return {
                        ...values
                    }
                }
                return item;
            })
        }
    }
});

export const { setItems, addItem, updateItem } = slice.actions;

export default slice.reducer;