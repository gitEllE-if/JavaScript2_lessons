class CartItem {
    static class = 'cart-item';

    constructor(good = { id_product: 0, product_name: 'product', price: 0, quantity: 1 }) {
        this.id = good.id_product;
        this.title = good.product_name;
        this.price = good.price;
        this.quantity = good.quantity;
    }

    /**
     * возвращает html разметку для одного товара
     */
    render() {
        return `<div class="${CartItem.class}" data-id="${this.id}">
            <div class="title-price">
                <h4>${this.title}</h4>
                <p><b>$${this.price}</b></p>
                <p>количество:  <b>${this.quantity}</b></p>
            </div>
            <button class="del-btn">удалить</button>
            </div>`;
    }
}

class CartList {
    constructor(container = '.cart-list') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data.contents];
            });
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    /**
    * отображает товары на странице
    */
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new CartItem(good);
            listHtml += goodItem.render();
        });
        document.querySelector(this.container).innerHTML = listHtml;

        // imaes
        let goodsItem = document.querySelectorAll(`.${CartItem.class}`);
        goodsItem.forEach((elem, idx) => {
            elem.style.backgroundImage = `url('img/product${elem.dataset.id}.jpg')`;
        });

        // eventListeners
        document.querySelectorAll(`.del-btn`).forEach((item) => {
            item.addEventListener('click', cart.removeFromCart.bind(cart));
        });
    }

    /**
     * Добавляет в корзину продукт с полученным data-id из элемента, по которому кликнули
     * @param {MouseEvent} event 
     */
    addToCart(event) {
        let id = event.target.parentNode.dataset.id;
        let cnt = 0;
        this.goods.forEach(item => {
            if (item.id_product == id) {
                item.quantity++;
                cnt++;
            }
        });
        if (cnt == 0) {
            list.goods.forEach(item => {
                if (id == item.id_product) {
                    item.quantity = 1;
                    this.goods.push(item);
                }
            });
        }
    }

    /**
     * Удаляет из корзину продукт с полученным data-id из элемента, по которому кликнули
     * @param {MouseEvent} event 
     */
    removeFromCart(event) {
        let id = event.target.parentNode.dataset.id;
        this.goods.forEach((item, idx) => {
            if (item.id_product == id) {
                if (item.quantity > 1) {
                    item.quantity--;
                }
                else {
                    this.goods.splice(idx, 1);
                }
            }
        });
        this.render();
    }

    // applyDiscount(discount) { }

    // cancelDiscount() { }

    // getTotalCost() { }
}