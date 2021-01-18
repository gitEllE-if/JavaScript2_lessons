const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        imgPath: 'img/product',
        products: [],
        filtered: [],
        addedToCart: [],
        isVisibleCart: false,
        isVisibleError: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        filter(searchLine) {
            const regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
        showHideCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        addProduct(element) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.addedToCart.find(product => product.id_product === element.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const product = Object.assign({ quantity: 1 }, element);
                            this.addedToCart.push(product);
                        }
                        this.isVisibleCart = true;
                    } else {
                        this.isVisibleError = true;
                    }
                })
        },
        removeProduct(element) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.addedToCart.find(product => product.id_product === element.id_product);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.addedToCart.splice(this.addedToCart.indexOf(find), 1);
                            if (this.addedToCart.length == 0) {
                                this.isVisibleCart = false;
                            }
                        }
                    } else {
                        this.isVisibleError = true;
                    }
                })
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(myAPI)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.addedToCart.push(el);
                }
            });
    }
});  