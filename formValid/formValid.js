'use strict';

let formEl = document.querySelector('form');
let inNameEl = document.getElementById('inName');
let inPhoneEl = document.getElementById('inPhone');
let inMailEl = document.getElementById('inMail');
let inTextEl = document.getElementById('inText');

formEl.addEventListener('submit', function (event) {
    if (!isValid(inNameEl.value, '([A-Z,a-z,А-Я,а-я,ё]){2,}')) {
        setAlert(inNameEl);
        event.preventDefault();
    }
    if (!isValid(inPhoneEl.value, '^([+]7[(])[0-9]{3}[)][0-9]{3}-[0-9]{4}$')) {
        setAlert(inPhoneEl);
        event.preventDefault();
    }
    if (!isValid(inMailEl.value, '^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$')) {
        setAlert(inMailEl);
        event.preventDefault();
    }
    if (inTextEl.value === '') {
        setAlert(inTextEl);
        event.preventDefault();
    }
});

function isValid(str, regexpStr) {
    let regexp = new RegExp(regexpStr);
    return regexp.test(str);
}

function setAlert(elem) {
    elem.style.borderColor = 'var(--alertColor)';
    if (!document.querySelector(`div[data-name=${elem.getAttribute('name')}]`)) {
        elem.insertAdjacentHTML('afterend',
            `<div class=errorIn data-name=${elem.getAttribute('name')}>
            invalid input!<br>Required format: ${elem.getAttribute('placeholder')}
        </div>`);
    }
}