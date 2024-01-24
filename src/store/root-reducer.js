import { combineReducers } from "@reduxjs/toolkit";
import postsSlice from "../pages/todoApp/store/posts";

const rootReducer = combineReducers({
    posts: postsSlice,
});


export default rootReducer;