import { combineReducers } from 'react-redux'
import _ from 'lodash'
import {WORDTYPES} from "../components/Lecture";

const DEFAULT_INDEX_CARD = {german: "", wordtype: WORDTYPES.FREE_TEXT, swedish: {value: ""}}

const defaultState = {
    indexCards: [DEFAULT_INDEX_CARD]
}

const lectureReducer = (state=defaultState, action={}) => {
    let newState = _.cloneDeep(state)

    const {type, index, data} = action

    switch (type) {
        case "ADD_INDEX_CARD":
            newState.indexCards.push(_.cloneDeep(DEFAULT_INDEX_CARD))
            break
        case "UPDATE_INDEX_CARD":
            newState.indexCards[index] = data
            break
        case "DELETE_INDEX_CARD":
            newState.indexCards.splice(index, 1)
            break
        default:
            break;
    }
    return newState
}
export default lectureReducer