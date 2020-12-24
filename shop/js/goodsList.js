class GoodsItem {
    static class = 'goods-item';

    constructor(good = { id: 0, title: 'product', price: 0 }) {
        this.id = good.id;
        this.title = good.title;
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
        this._fetchGoods();
        this.printTotalCost();
    }

    _fetchGoods() {
        this.goods = [
            { id: 1, title: 'suit', price: 150 },
            { id: 2, title: 'dress', price: 90 },
            { id: 3, title: 'coat', price: 350 },
            { id: 4, title: 'jacket', price: 50 },
            { id: 5, title: 'blaser', price: 110 },
            { id: 6, title: 'jacket', price: 250 },
            { id: 7, title: 'top', price: 250 },
            { id: 8, title: 'dress', price: 350 },
            { id: 9, title: 'suit', price: 60 },
            { id: 10, title: 'suit', price: 50 },
            { id: 11, title: 'dress', price: 110 },
            { id: 12, title: 'dress', price: 250 }
        ];
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

        let goodsItem = document.querySelectorAll(`.${GoodsItem.class}`);
        goodsItem.forEach((elem, idx) => {
            elem.style.backgroundImage = `url('img/product${elem.dataset.id}.jpg')`;
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

const list = new GoodsList();
list.render();
