import {all} from "redux-saga/effects"
import {adminSaga} from "@store/index"

function* rootSaga(){
    yield all([adminSaga()]);
}
export default rootSaga;