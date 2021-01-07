const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        imgPath: 'img/product',
        products: [],
        filtered: [],
        addedToCart: [],
        searchLine: '',
        isVisibleCart: false,
        isEmptyCart: false,
        isNotFoundProducts: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        filter() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (!this.filtered.includes(el)) {
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
            this.isNotFoundProducts = this.filtered.length == 0 ? true : false;
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
                            let product = {
                                id_product: element.id_product,
                                price: element.price,
                                product_name: element.product_name,
                                quantity: 1
                            };
                            this.addedToCart.push(product);
                        }
                        this.isVisibleCart = true;
                        this.isEmptyCart = false;
                    } else {
                        alert('Error');
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
                                this.isEmptyCart = true;
                            }
                        }
                    } else {
                        alert('Error');
                    }
                })
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
            .then(() => {
                this.isNotFoundProducts = this.products.length == 0 ? true : false;
            });
        this.getJson(myAPI)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
            .then(() => {
                this.isNotFoundProducts = this.products.length == 0 ? true : false;
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
            .then(() => {
                this.isNotFoundProducts = this.products.length == 0 ? true : false;
            });
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.addedToCart.push(el);
                }
            })
            .then(() => {
                this.isEmptyCart = this.addedToCart.length == 0 ? true : false;
            });
    }
});  