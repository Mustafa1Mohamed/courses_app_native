import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./FavSlice";
import EnrolledCoursesReducer from "./EnrolledCoursesSlice";

const store = configureStore({
  reducer: {
    favReducer,
    EnrolledCoursesReducer,
  },
});

export default store;
