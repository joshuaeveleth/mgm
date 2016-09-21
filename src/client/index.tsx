import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore, Store } from 'redux'

import { User } from "./redux/reducers";

import { mgmApp, mgmState } from "./redux/reducers";
import { navigateTo,loginAction } from "./redux/actions"
let store = createStore<mgmState>(mgmApp);

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
        if(storeUser)
            localStorage.setItem("user", JSON.stringify(user));
        else
            localStorage.removeItem("user");
        console.log('localStorage set')
    }
})

import { App } from "./components/App";

ReactDOM.render(<App store={store}/>, document.getElementById("app"));