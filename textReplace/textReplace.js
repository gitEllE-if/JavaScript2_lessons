'use strict';

let leftDivEl = document.querySelector('.leftDiv');
let rightDivEl = document.querySelector('.rightDiv');

leftDivEl.innerHTML += strOrigin;
strOrigin = strOrigin.replace(/( )\'/g, '$1"');
rightDivEl.innerHTML += strOrigin.replace(/([\.\?])\'/g, '$1"');