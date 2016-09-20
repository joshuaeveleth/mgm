import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore, Store } from 'redux'

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

import { App } from "./components/App";

ReactDOM.render(<App store={store}/>, document.getElementById("app"));