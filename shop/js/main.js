const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);