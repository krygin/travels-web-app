export const FETCH_JOURNEYS_REQUEST = 'FETCH_JOURNEYS_REQUEST';
export const FETCH_JOURNEYS_SUCCESS = 'FETCH_JOURNEYS_SUCCESS';
export const FETCH_JOURNEYS_FAILURE = 'FETCH_JOURNEYS_FAILURE';

function requestJourneys() {
    return {
        type: FETCH_JOURNEYS_REQUEST
    }
}

function receiveJourneys(json) {
    return {
        type: FETCH_JOURNEYS_SUCCESS,
        journeys: json.data.children.map(child => child.data),
    }
}

function fetchJourneys() {
    return dispatch => {
        dispatch(requestJourneys());
        return fetch(`https://krygin.github.io/travels-web-app/samples/journeys.json`)
            .then(response => response.json())
            .then(json => dispatch(receiveJourneys(json)))
    }
}

function shouldFetchJourneys(state) {
    const posts = state.journeys;
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return true
    }
}

export function fetchJourneysIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchJourneys(getState())) {
            return dispatch(fetchJourneys())
        }
    }
}