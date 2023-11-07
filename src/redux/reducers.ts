// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice";
import userNameReducer from "./slices/userSlice";
import cardReducer from "./slices/cardSlice";

const rootReducer = combineReducers({
  board: boardReducer,
  user: userNameReducer,
  card: cardReducer,
});

export default rootReducer;
