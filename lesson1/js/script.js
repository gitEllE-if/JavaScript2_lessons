const goods = [
    { title: 'suit', price: 150 },
    { title: 'dress', price: 90 },
    { title: 'coat', price: 350 },
    { title: 'jacket', price: 50 },
    { title: 'blaser', price: 110 },
    { title: 'jacket', price: 250 },
    { title: 'top', price: 250 },
    { title: 'dress', price: 350 },
    { title: 'suit', price: 60 },
    { title: 'suit', price: 50 },
    { title: 'dress', price: 110 },
    { title: 'dress', price: 250 }
];

const renderGoodsItem = (item = { title: 'product', price: 0 }) => {
    return `<div class="goods-item">
            <div class="title-price">
                <h4>${item.title}</h4>
                <p>$${item.price}</p>
            </div>
            <button class="buy-btn">в корзину</button>
            </div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join("");
    /*
    ПОЧЕМУ ПОЯВЛЯЮТСЯ ЗАПЯТЫЕ?
    метод map возвращет массив;
    когда массив пытаемся записать в свойство innerHTML, он неявно приводится к строке (выполняется Array.prototype.toString),
    при этом в качестве разделителя элементов по умолчанию в строке вставляются запятые.
    Чтобы удалить запятые, применяем метод join, указав в качестве разделителя пустую строку
    */


    let goodsItem = document.querySelectorAll('.goods-item');
    goodsItem.forEach((elem, idx) => {
        elem.style.backgroundImage = `url('img/product${idx + 1}.jpg')`;
    });
}

renderGoodsList(goods);