Vue.component('products', {
    props: ['products', 'imgPath'],
    template: `<div class="products">
                    <product v-for="product of products"
                        :key="product.id_product" 
                        :product="product"
                        :img="(imgPath + product.id_product + '.jpg')">
                    </product>
                    <div class="not-found" v-if="!products.length">
                        Товары не найдены
                    </div>
                </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
             <div class="product-item">
                <img :src="img" alt="Product img">
                <div class="title-price">
                     <h4>{{product.product_name}}</h4>
                     <p>$&nbsp;{{product.price}}</p>
                </div>
                <button class="buy-btn" @click="$parent.$emit('add-product', product)">
                    в корзину
                </button>
             </div>`
})