import * as React from "react";
import * as ReactDOM from "react-dom";
import { Map } from 'immutable';

import { createStore, applyMiddleware, Store } from 'redux'

import { Auth, StateModel, User } from "./redux/model";

import reducer from "./redux/reducers";
import { createNavigateToAction, createLoginAction } from "./redux/actions"

//create the redux store, using our websocket middleware for MGM async
import { socketMiddleWare } from "./comms/socketMiddleware";
let store = createStore<StateModel>(reducer, applyMiddleware(socketMiddleWare));


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
let user: User = null;
if (localStorage.getItem("user")) {
    user = new User(JSON.parse(localStorage.getItem("user")));
    let token = localStorage.getItem("token")
    store.dispatch(createLoginAction(user, token));
}
store.subscribe(() => {
    let auth = store.getState().auth;
    if (auth.user !== user) {
        if (auth.user) {
            user = auth.user;
            localStorage.setItem("user", JSON.stringify(auth.user));
            localStorage.setItem("token", auth.token);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            user = null;
        }
    }
})

import { App } from "./components/App";

ReactDOM.render(<App store={store}/>, document.getElementById("app"));