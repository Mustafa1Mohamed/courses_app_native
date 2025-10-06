import { configureStore, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const favSlice = createSlice({
    name: "handleFav",
    initialState: {
        fav: [],
    },
    reducers: {
        toggleFav: (state, action) => {
            const course = action.payload;
            const exists = state.fav.find((c) => c.id === course.id);

            if (exists) {
                state.fav = state.fav.filter((c) => c.id !== course.id);
            } else {
                state.fav.push(course);
            }
            AsyncStorage.setItem("favourites", JSON.stringify(state.fav));
        },
    },
});

export const { toggleFav } = favSlice.actions;

const storeToolKit = configureStore({
    reducer: {
        favReducer: favSlice.reducer,
    },
});

export default storeToolKit;
