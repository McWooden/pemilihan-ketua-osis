import { configureStore } from '@reduxjs/toolkit';
import source from './source';

const store = configureStore({
    reducer: {
        source: source,
    }
});

export default store