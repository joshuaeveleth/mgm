import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore, Store } from 'redux'

import { User } from "./redux/reducers";

import { mgmApp, mgmState } from "./redux/reducers";
import { navigateTo,loginAction } from "./redux/actions"
let store = createStore<mgmState>(mgmApp);

// set up url tracking for routing
let url = window.location.pathname;
store.subscribe(() => {
    if (store.getState().url !== url) {
        url = store.getState().url;
        window.history.pushState(null, null, url)
    }
})
store.dispatch(navigateTo(window.location.pathname));

// set up for local storage of authentication components
let user: User = localStorage.getItem("user");
if(user) store.dispatch(loginAction(user));
store.subscribe(() => {
    if (store.getState().auth.user !== user) {
        user = store.getState().auth.user;
        localStorage.setItem("user", JSON.stringify(user));
        console.log('localStorage set')
    }
})

import { App } from "./components/App";

ReactDOM.render(<App store={store}/>, document.getElementById("app"));