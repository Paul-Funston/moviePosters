'use strict';
/*
    JavaScript Basics
    Paul Funston

    Utility Functions
*/


// DOM manipulation
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}

// Cookies
function setCookie(name, value, options = {}) {
    options = {
      path: '/',
      SameSite: 'Lax',
      ...options
    };
  
    const keys = Object.keys(options);
    const values = Object.values(options);
  
    if (options?.expires && options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
    for (let i = 0; i < keys.length; i++) {
      updatedCookie +=`; ${keys[i]}=${values[i]}`;    
    }
  
    document.cookie = updatedCookie;
  };

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, '', {'max-age': -1});
  };


// misc
function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
} 

// get a random number from a to b inclusive
function numFrom(a, b) {
    return Math.trunc(Math.random() * (b - (a + 1)) + a);
}

// Print
function print(arg) {
    console.log(arg);
}



export {select, onEvent, selectAll, setCookie, getCookie, deleteCookie, sleep, numFrom, print};