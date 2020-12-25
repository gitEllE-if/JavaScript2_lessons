class GoodsItem {
    static class = 'goods-item';

    constructor(good = { id_product: 0, product_name: 'product', price: 0 }) {
        this.id = good.id_product;
        this.title = good.product_name;
        this.price = good.price;
    }

    /**
     * возвращает html разметку для одного товара
     */
    render() {
        return `<div class="${GoodsItem.class}" data-id="${this.id}">
            <div class="title-price">
                <h4>${this.title}</h4>
                <p>$${this.price}</p>
            </div>
            <button class="buy-btn">в корзину</button>
            </div>`;
    }

}

class GoodsList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    /**
    * отображает товары на странице
    */
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good);
            listHtml += goodItem.render();
        });
        document.querySelector(this.container).innerHTML = listHtml;

        // images
        let goodsItem = document.querySelectorAll(`.${GoodsItem.class}`);
        goodsItem.forEach((elem, idx) => {
            elem.style.backgroundImage = `url('img/product${elem.dataset.id}.jpg')`;
        });

        // eventListeners
        document.querySelectorAll(`.buy-btn`).forEach((item) => {
            item.addEventListener('click', cart.addToCart.bind(cart));
        });
    }

    /**
     * выводит в консоль общую стоимость всех товаров массива goods
     */
    printTotalCost() {
        let totalCost = this.goods.reduce((sum, item) => sum += item.price, 0);
        console.log(totalCost);
    }
}