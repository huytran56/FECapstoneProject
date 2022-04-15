import { all } from "redux-saga/effects";
import { adminSaga, userSaga } from "@store/index";

function* rootSaga() {
  yield all([adminSaga(), userSaga()]);
}
export default rootSaga;
