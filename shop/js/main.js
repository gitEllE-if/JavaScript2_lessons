function openCart() {
    let elem = document.querySelector('.goods-list');
    if (elem) {
        elem.classList.toggle('goods-list');
        elem.classList.toggle('cart-list');
        cart.render();
    }
}

function openCatalog() {
    let elem = document.querySelector('.cart-list');
    if (elem) {
        elem.classList.toggle('cart-list');
        elem.classList.toggle('goods-list');
        list.render();
    }
}

const cart = new CartList();
const list = new GoodsList();