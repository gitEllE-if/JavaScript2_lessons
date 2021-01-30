Vue.component('cart', {
    props: ['cartItems', 'imgPath', 'isVisible'],
    template: `<div class="cart-block" v-show="isVisible">
                    <cart-item v-for="item of cartItems"
                        :key="item.id_product"
                        :img="(imgPath + item.id_product + '.jpg')"
                        :cart-item="item">
                    </cart-item>
                    <div class="empty-cart" v-if="!cartItems.length">
                        Корзина пустая
                    </div>
                </div>`
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `<div class="cart-item">
                    <div class="cart-left">
                        <img :src="img" alt="Product img">
                        <div class="product-desc">
                            <p class="product-title"><b>{{ cartItem.product_name }}</b></p>
                            <p class="product-quantity">Количество: {{ cartItem.quantity }}</p>
                            <p class="product-single-price">Цена: $&nbsp;{{ cartItem.price }}</p>
                        </div>
                    </div>
                    <div class="cart-right">
                        <p class="product-price">$&nbsp;{{ cartItem.price * cartItem.quantity }}</p>
                        <button class="del-btn" @click="$parent.$emit('remove-product', cartItem)">&times;</button>
                    </div>
                </div>`
})