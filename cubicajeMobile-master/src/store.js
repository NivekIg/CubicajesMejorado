import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import planningSpaceReducer from './features/planningSpace/slices/planningSpace';
import planningItemReducer from './features/planningItem/slices/planningItem';
import planningCalculateReducer from './features/planningCalculate/slices/planningCalculate';
import planningReducer from './features/plannings/slices/planning';
import spaceReducer from './features/spaces/slices/space';
import itemReducer from './features/items/slices/item';

const rootReducer = combineReducers({
    planningSpace: planningSpaceReducer,
    planningItem: planningItemReducer,
    planningCalculate: planningCalculateReducer,
    planning: planningReducer,
    space: spaceReducer,
    item: itemReducer
})

export const store = configureStore({
    reducer: rootReducer
});