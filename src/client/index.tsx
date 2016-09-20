import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore } from 'redux'

import { Authenticated } from "./components/authenticated";

import { Unauthenticated } from "./components/unauthenticated";

import { mgmApp, mgmState } from "./redux/reducers";
import { navigateTo } from "./redux/actions"
let store = createStore<mgmState>(mgmApp);

// set up url tracking for routing
let url = window.location.pathname;
store.subscribe( () => {
    if(store.getState().url !== url){
        url = store.getState().url;
        window.history.pushState(null, null, url)
    }
})
store.dispatch(navigateTo(window.location.pathname));

export class Application extends React.Component<{}, {}> {

    render() {
        let state = store.getState();
        if (state.auth.loggedIn) {
            // show authenticated tree
            return <Authenticated store={store} />
        } else {
            // show splash, login, registration tree
            return <Unauthenticated store={store} />
        }
    }
}

ReactDOM.render(<Application />, document.getElementById("app"));