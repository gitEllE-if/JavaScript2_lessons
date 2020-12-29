'use strict';

let leftDivEl = document.querySelector('.leftDiv');     //для исходного текста
let rightDivEl = document.querySelector('.rightDiv');   //для замененного текста

leftDivEl.innerHTML += strOrigin; // выводим исходный текст

// Задание 1: замена всех кавычек
//rightDivEl.innerHTML += strOrigin.replace(/\'/g, '"');


// Задание 2: Замена кавычек на границах предложения с прямой речью
strOrigin = strOrigin.replace(/( )\'/g, '$1"');
rightDivEl.innerHTML += strOrigin.replace(/([\.\?])\'/g, '$1"');