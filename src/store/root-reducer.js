import { combineReducers } from "@reduxjs/toolkit";
import postsSlice from "../pages/todoApp/store/posts";
import authSlice from "../pages/login/store/auth"
import userSlice from "../store/user"

const rootReducer = combineReducers({
    posts: postsSlice,
    auth: authSlice,
    user: userSlice,
});


export default rootReducer;