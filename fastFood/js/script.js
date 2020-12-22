const sizeArr = [
    { title: 'small', price: 50, calories: 20 },
    { title: 'big', price: 100, calories: 40 }
];

const stuffingArr = [
    { title: 'cheese', price: 10, calories: 20 },
    { title: 'salad', price: 20, calories: 5 },
    { title: 'potato', price: 15, calories: 10 }
];

const toppingArr = [
    { title: 'spices', price: 15, calories: 0 },
    { title: 'mayonnaise', price: 20, calories: 10 },
    { title: 'ketchup', price: 20, calories: 5 }
];

class Hamburger {
    constructor(size, stuffing, topping, price, calories) {
        //инициализация начальными нулевыми значениями
        this.calories = 0;
        this.price = 0;
        this.toppings = [];
        this.size = { title: '', price: 0, calories: 0 };
        this.stuffing = { title: '', price: 0, calories: 0 };
        this.size = { title: '', price: 0, calories: 0 };
        this.stuffing = { title: '', price: 0, calories: 0 };

        //для вывода результата
        this.outPrice = document.querySelector(`div[name=${price}]`);
        this.outCalories = document.querySelector(`div[name=${calories}]`);;

        //установка значений со страницы
        let sizeEl = document.querySelectorAll(`input[name=${size}]`);
        let stuffingEl = document.querySelectorAll(`input[name=${stuffing}]`);
        let toppingEl = document.querySelectorAll(`input[name=${topping}]`);
        this._setSize(sizeEl);
        this._setStuffing(stuffingEl);
        this._setTopping(toppingEl);

        //отслеживаем события изменения input-элементов
        sizeEl.forEach(elem => elem.addEventListener('change', this._setSize.bind(this, sizeEl)));
        stuffingEl.forEach(elem => elem.addEventListener('change', this._setStuffing.bind(this, stuffingEl)));
        toppingEl.forEach(elem => elem.addEventListener('change', this._setTopping.bind(this, toppingEl)));
    }

    /**
     * Устанавливает поле size в соответсвии с выбранным на странице
     * @param {NodeList} sizeEl 
     */
    _setSize(sizeEl) {
        this.size = this._setValueFromCheckedRadio(sizeEl, sizeArr);
        this.putResult();
    }

    /**
     * Устанавливает поле stuffing в соответсвии с выбранным на странице
     * @param {NodeList} stuffingEl 
     */
    _setStuffing(stuffingEl) {
        this.stuffing = this._setValueFromCheckedRadio(stuffingEl, stuffingArr);
        this.putResult();
    }

    _setValueFromCheckedRadio(elems, elemArr) {
        for (let item of elems) {
            if (item.type == 'radio' && item.checked) {
                for (let itemArr of elemArr) {
                    if (itemArr.title == item.value)
                        return itemArr;
                }
            }
        }
    }

    /**
     * Заполняет поле toppings (массив) всеми топпингами, отмеченными в элементах на странице
     * @param {NodeList} toppingEl 
     */
    _setTopping(toppingEl) {
        this.toppings = [];
        for (let item of toppingEl) {
            if (item.checked) {
                this._addTopping(item.value);
            }
            else {
                this._removeTopping(item.value);
            }
        }
        this.putResult();
    }

    /**
     * Добавление топпинга с полученным названием
     * @param {string} topping 
     */
    _addTopping(topping) {
        for (let itemArr of toppingArr) {
            if (itemArr.title == topping) {
                this.toppings.push(itemArr);
            }
        }
    }
    /**
     * Удаление топпинга с полученным названием
     * @param {string} topping 
     */
    _removeTopping(topping) {
        this.toppings.forEach((item, idx) => {
            if (item.title == topping) {
                this.toppings.splice(idx, 1);
            }
        });
    }

    /**
     * Получение и вывод результата на страницу
     */
    putResult() {
        this.calculatePrice();
        this.calculateCalories();
        this.outPrice.innerHTML = this.price;
        this.outCalories.innerHTML = this.calories;
    }

    /**
     * Подсчет цены и сохранение результата в поле price
     */
    calculatePrice() {
        this.price = 0;
        this.toppings.forEach(elem => this.price += elem.price);
        this.price += (this.size.price + this.stuffing.price);
    }

    /**
     * Подсчет калорий и сохранение результата в поле calories
     */
    calculateCalories() {
        this.calories = 0;
        this.toppings.forEach(elem => this.calories += elem.calories);
        this.calories += (this.size.calories + this.stuffing.calories);
    }
}


// передаем в конструктор пареметр name input-элементов и элементов для вывода результата
let myHamb = new Hamburger("size", "stuffing", "topping", "outPrice", "outCalories");