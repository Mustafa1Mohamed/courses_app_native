import { createSlice } from "@reduxjs/toolkit";

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState: { enrolled: [] },
  reducers: {
    enrollCourse: (state, action) => {
      const course = action.payload;
      if (!state.enrolled.find(c => c.id === course.id)) {
        state.enrolled.push(course);
      }
    },
    unenrollCourse: (state, action) => {
      const course = action.payload;
      state.enrolled = state.enrolled.filter(c => c.id !== course.id);
    },
  },
});

export const { enrollCourse, unenrollCourse } = enrolledCoursesSlice.actions;
export default enrolledCoursesSlice.reducer;
