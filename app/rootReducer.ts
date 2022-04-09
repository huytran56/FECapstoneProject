import { combineReducers } from "@reduxjs/toolkit";
import { adminReducer } from "@store/index";

const rootReducer = combineReducers({ admin: adminReducer });

export type typeRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
