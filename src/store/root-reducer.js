import { combineReducers } from "@reduxjs/toolkit";
import postsSlice from "./posts";

const rootReducer = combineReducers({
    posts: postsSlice,
});


export default rootReducer;