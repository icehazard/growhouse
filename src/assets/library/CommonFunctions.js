import { writable, get as getStore } from "svelte/store";
import { WEBPACK_URL } from "@/config";
import user from '@/store/user.js'
import { currencies } from '@/assets/library/options.js'

export function clickOutside(element, callbackFunction) {
    function onClick(event) {
        if (!element.contains(event.target)) {
            callbackFunction();
        }
    }
    document.body.addEventListener("click", onClick);
    return {
        update(newCallbackFunction) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener("click", onClick);
        },
    };
}

export function copy(data) {
    return JSON.parse(JSON.stringify(data))
}

export function set(name, type) {
    const value = writable(localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : type);
    value.subscribe(val => { localStorage.setItem(name, JSON.stringify(val)) });
    return value;
}

export function persist(name, data) {
    let local = localStorage.getItem(name)
    const value = writable(local ? JSON.parse(local) : data);
    value.subscribe(val => { localStorage.setItem(name, JSON.stringify(val)) });
    value.reset = () => value.set(copy(data))
    value.val = (key) => getStore(value)[key]
    value.all = () => getStore(value)
    value.commit = (key, val) => {
        let temp = getStore(value)
        temp[key] = val;
        value.set(temp)
        return temp
    };
    return value;
}

let headers = {
    Accept: "application/json",
    token: token,
    "Content-Type": "application/json",
}

export async function post(route, data) {
    let url = `http://${WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    })
    return await res.json()
}

export async function del(route, data) {
    let url = `http://${WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "DELETE",
        headers
    })
    return await res.json()
}

export async function get(route) {
    let url = `http://${WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "GET",
        headers
    })
    res = await res.json()
    if (res.status == 'error') return []
    return res
}

export async function patch(route, data) {
    let url = `http://${WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data)
    })
    return await res.json()
}
