import search from './searchComponent';
import cart from './cartComponent';
import products from './productComponent';
import error from './errorComponent'

const app = {
    el: '#app',
    data: {
        catalogUrl: '/api/products',
        basketUrl: '/api/cart',
        imgPath: 'img/product',
        products: [],
        filtered: [],
        addedToCart: [],
        isVisibleCart: false,
        isVisibleError: false,
        year: new Date().getFullYear()
    },
    components: { cart, products, search, error },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.isVisibleError = true;
                    console.log(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.isVisibleError = true;
                    console.log(error);
                })
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.isVisibleError = true;
                    console.log(error);
                })
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.isVisibleError = true;
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
            let find = this.addedToCart.find(product => product.id_product === element.id_product);
            if (find) {
                this.putJson(`${this.basketUrl}/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                            this.isVisibleCart = true;
                        }
                    })
            } else {
                const product = Object.assign({ quantity: 1 }, element);
                this.postJson(this.basketUrl, product)
                    .then(data => {
                        if (data.result === 1) {
                            this.addedToCart.push(product);
                            this.isVisibleCart = true;
                        }
                    })
            }
        },
        removeProduct(element) {
            for (let i = 0; i < this.addedToCart.length; i++) {
                if (this.addedToCart[i].id_product === +element.id_product) {
                    this.deleteJson(`${this.basketUrl}/${this.addedToCart[i].id_product}`, this.addedToCart[i])
                        .then(data => {
                            if (data.result === 1) {
                                this.addedToCart[i].quantity -= 1;
                                if (this.addedToCart[i].quantity === 0) {
                                    this.addedToCart.splice(i, 1);
                                    if (this.addedToCart.length == 0) {
                                        this.isVisibleCart = false;
                                    }
                                }
                            }
                        })
                }
            }
        }
    },
    mounted() {
        this.getJson(this.catalogUrl)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(this.basketUrl)
            .then(data => {
                for (let el of data.contents) {
                    this.addedToCart.push(el);
                }
            });
    }
};

export default app;