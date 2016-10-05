import * as React from "react";
import * as ReactDOM from "react-dom";
import { Map } from 'immutable';

import { createStore, applyMiddleware, Store } from 'redux'

import { LoginUser } from "./redux/model";

import reducer from "./redux/reducers";
import { createNavigateToAction, createLoginAction } from "./redux/actions"

//create the redux store, using our websocket middleware for MGM async
import { socketMiddleWare } from "./comms/socketMiddleware";
let store = createStore<Map<string, any>>(reducer, applyMiddleware(socketMiddleWare));


// Update url to match internal state
let url = window.location.pathname;
store.subscribe(() => {
    if (store.getState().get('url') !== url) {
        url = store.getState().get('url');
        window.history.pushState(null, null, url)
    }
})
store.dispatch(createNavigateToAction(window.location.pathname));
//watch for url changes that arent frome state, such as user back button
window.addEventListener('popstate', () => {
    if (url !== window.location.pathname) {
        url = window.location.pathname;
        store.dispatch(createNavigateToAction(window.location.pathname));
    }
})


// set up for local storage of authentication components
let user: LoginUser = null;
if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
    store.dispatch(createLoginAction(user));
}
store.subscribe(() => {
    let auth = store.getState().get('auth');
    if (auth.user !== user) {
        if (auth.user) {
            user = auth.user;
            localStorage.setItem("user", JSON.stringify(auth.user));
        } else {
            localStorage.removeItem("user");
            user = null;
        }
    }
})



import { App } from "./components/App";

ReactDOM.render(<App store={store}/>, document.getElementById("app"));