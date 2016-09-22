import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore, applyMiddleware, Store } from 'redux'

import { User, mgmState } from "./redux/model";

import reducer from "./redux/reducers";
import { navigateTo,loginAction } from "./redux/actions"
import { socketMiddleWare } from "./comms/socketMiddleware";
let store = createStore<mgmState>(reducer, applyMiddleware(socketMiddleWare));

// Update url to match internal state
let url = window.location.pathname;
store.subscribe(() => {
    if (store.getState().url !== url) {
        url = store.getState().url;
        window.history.pushState(null, null, url)
    }
})
store.dispatch(navigateTo(window.location.pathname));
//watch for url changes that arent frome state, such as user back button
window.addEventListener('popstate', ()=>{
    if(url !== window.location.pathname){
        url = window.location.pathname;
        store.dispatch(navigateTo(window.location.pathname));
    }
})

// set up for local storage of authentication components
let user: User = localStorage.getItem("user");
if(user) store.dispatch(loginAction(user));
store.subscribe(() => {
    let storeUser = store.getState().auth.user;
    if (storeUser !== user) {
        user = storeUser;
        if(storeUser){
            localStorage.setItem("user", JSON.stringify(user));
        } else{
            localStorage.removeItem("user");
        }
    }
})

import { App } from "./components/App";

ReactDOM.render(<App store={store}/>, document.getElementById("app"));