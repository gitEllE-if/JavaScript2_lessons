'use strict';

class Validator {
    constructor(form) {
        this.patterns = {
            inName: /^[A-Z,a-z,А-Я,а-я,ё]{2,}$/i,     // /^[a-zа-яё]+$/i,
            inPhone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,     // '^([+]7[(])[0-9]{3}[)][0-9]{3}-[0-9]{4}$'
            inMail: /^[\w._-]+@\w+\.[a-z]{2,4}$/i,    // '^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$'
            inText: /[\w\d]+/i
        };
        this.errors = {
            inName: 'Required format: name (not less than 2 letters)',
            inPhone: 'Required format: +7(000)000-0000',
            inMail: 'Required format: mymail@mail.ru, my.mail@mail.ru, my-mail@mail.ru',
            inText: 'Required format: any text',
        };
        this.errorClass = 'errorIn';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }
    validate(regexp, value) {
        regexp.test(value)
    }

    _validateForm() {
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors) {
            error.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByClassName('inputValid')];
        for (let field of formFields) {
            this._validate(field);
        }
        if (![...document.getElementById(this.form).querySelectorAll('.invalid')].length) {
            this.valid = true;
        }
    }
    _validate(field) {
        if (this.patterns[field.name]) {
            if (!this.patterns[field.name].test(field.value)) {
                field.classList.add('invalid');
                this._addErrorMsg(field);
                this._watchField(field);
            }
        }
    }

    _addErrorMsg(field) {
        let error = `<div class="${this.errorClass}">
                        invalid input!<br>${this.errors[field.name]}
                    </div> `;
        field.insertAdjacentHTML('afterend', error);
    }

    _watchField(field) {
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if (this.patterns[field.name].test(field.value)) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (error) {
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (!error) {
                    this._addErrorMsg(field);
                }
            }
        })
    }
}