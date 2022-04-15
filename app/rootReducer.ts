import { combineReducers } from "@reduxjs/toolkit";
import { adminReducer, userReducer } from "@store/index";

const rootReducer = combineReducers({ admin: adminReducer, user: userReducer });

export type typeRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
