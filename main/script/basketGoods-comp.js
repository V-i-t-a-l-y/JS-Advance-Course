 'use strict';

const cart_item = {
    props: ['cart'],
    template: `<div class="merch-item">
                 <img class="merch-product" :src="cart.image" :alt="cart.product_name">
                     <div class="merch-price">
                         <h4 class="merch-name">{{ cart.product_name }}</h4>
                         <p class="merch-quantity">Quantity: <span class="merch-span">{{ cart.quantity }}</span></p>
                         <p class="price-per-piece"><span>$</span>{{ cart.price }}
                         <span>each</span></p>
                     </div>
                 <div class="merch-right-block">
                   <p class="basket-price-product"><span class="bskt-price-span">$ {{ cart.price * cart.quantity}}<span></p>
                     <div class="wrap-del-btn">
                         <button @click="$parent.removeProduct(cart)" class="del-btn">x</button>
                     </div>
                 </div>
             </div>`
};


const basket = {
    data() {
        return {
            carts: [],
            show: false,
            urlBasket: '/getBasket.json',
        }
    },

    components: {cart_item},

    mounted() {
        this.$parent.getJson('app_cart')
            .then(items => {
                for (let item of items.contents) {
                    console.log(item);
                    this.carts.push(item);
                }
            })
    },

    methods: {
        removeProduct(cart) { // находим товар в корзине по клику на крестик
          let find = this.carts.find(value => value.id_product === cart.id_product);
          if (find.quantity > 1) {
              this.$parent.putJson(`/app_cart/${find.id_product}`, {value: -1})
                 .then(items => {
                     if (items.result === 1) {
                         find.quantity--;
                     }
                 })

          } else {
              this.$parent.delJson(`/app_cart/${find.id_product}`)
                 .then(items => {
                     if(items.result === 1) {
                         this.carts.splice(this.carts.indexOf(find), 1);
                     }
                 })


          }
        },

        addProduct(item) { // нет ли в корзине такого товара
          let find = this.carts.find(value => value.id_product === item.id_product);
          if (find) {
              this.$parent.putJson(`/app_cart/${find.id_product}`, {value: 1})
                 .then(items => {
                     if (items.result === 1) {
                         find.quantity++;
                     }
                 })

          } else {
              this.$parent.postJson('/app_cart', item)
                 .then(items => {
                     if (items.result === 1) {
                         this.carts.push(item);
                     }
                 })

          }
        },
    },

    template: ` <div class="head">
                     <button @click="show=!show" class="btn-card"><i class="fas fa-cart-arrow-down"></i> <span class="span-bsk">Cart</span></button>
                     <div v-show="show" class="basket-products">
                       <cart_item v-for="item of carts" :cart="item"></cart_item>
                       <div class="text-cart" v-if="!carts.length">Cart is Empty</div>
                     </div
                 </div>`
}
















 // Vue.component('basket_products', {
 //     props: ['goods'],
 //     template: ` <div class="head">
 //                    <button @click="$parent.show=!$parent.show" class="btn-card">Корзина</button>
 //                    <div v-show="$parent.show" class="basket-products">
 //                      <cart-item v-for="item of goods" :cart="item"></cart-item>
 //                      <div class="text-cart" v-if="!goods.length">Cart is Empty</div>
 //                    </div
 //                </div>`
 // });
 //
 // Vue.component('cart-item', {
 //   props: ['cart'],
 //   template: `<div class="merch-item">
 //                <img class="merch-product" :src="cart.image" :alt="cart.product_name">
 //                    <div class="merch-price">
 //                        <h4 class="merch-name">{{ cart.product_name }}</h4>
 //                        <p class="merch-quantity">Quantity: <span class="merch-span">{{ cart.quantity }}</span></p>
 //                        <p class="price-per-piece"><span>$</span>{{ cart.price }}
 //                        <span>each</span></p>
 //                    </div>
 //                <div class="merch-right-block">
 //                  <p class="basket-price-product"><span class="bskt-price-span">$ {{ cart.price * cart.quantity}}<span></p>
 //                    <div class="wrap-del-btn">
 //                        <button @click="$root.removeProduct(cart)" class="del-btn">x</button>
 //                    </div>
 //                </div>
 //            </div>`
 // });


 // Vue.component('show-basket', {
 //   template: ` <div class="head-right">
 //               <button @click="$parent.show=!$parent.show" class="btn-card">Корзина</button>
 //                <basket-products v-if="$parent.show"></basket-products>
 //           </div>`
 // }),
 //
 // Vue.component('basket-products', {
 //   props: ['goods'],
 //   template: `<div v-if="$parent.show" class="basket-products">
 //                <div class="text-cart" v-if="!goods.length">Cart is Empty</div>
 //             <div class="merch-item" v-for="cart of goods">
 //                <img class="merch-product" :src="cart.image" :alt="cart.product_name">
 //                  <div class="merch-price">
 //                      <h4 class="merch-name">{{ cart.product_name }}</h4>
 //                      <p class="merch-quantity">Quantity: <span class="merch-span">{{ cart.quantity }}</span></p>
 //                      <p class="price-per-piece"><span>$</span>{{ cart.price }}
 //                      <span>each</span></p>
 //                  </div>
 //                 <div class="merch-right-block">
 //                   <p class="basket-price-product"><span class="bskt-price-span">$ {{ cart.price * cart.quantity}}<span></p>
 //                   <div class="wrap-del-btn">
 //                     <button @click="$root.removeProduct(cart)" class="del-btn">x</button>
 //                   </div>
 //                 </div>
 //             </div>
 //           </div>`
 // });
 //
