import { combineReducers } from 'redux'
import {
    FETCH_JOURNEYS_REQUEST,
    FETCH_JOURNEYS_SUCCESS
} from './actions'

function journeys(
    state = {
        items: [],
        isFetching: false,
    },
    action
) {
    switch (action.type) {
        case FETCH_JOURNEYS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case FETCH_JOURNEYS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.journeys
            });
        default:
            return state
    }
}

function journeysReducer(
    state = {},
    action
) {
    switch (action.type) {
        case FETCH_JOURNEYS_REQUEST:
        case FETCH_JOURNEYS_SUCCESS:
            return Object.assign({}, state, {
                journeys: journeys(state.journeys, action)
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    journeysReducer,
});

export default rootReducer