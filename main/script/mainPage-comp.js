 'use strict';

  const product_item = {
     props: ['prod'],
     template: ` 
                    <div class="goods-item">
                      <img class="img-goods" width="200" height="165" :src="prod.image" :alt="prod.product_name">
                      <div class="wrap-price">
                        <h3 class="product-name">{{ prod.product_name }}</h3>
                        <p class="product-price"><span>$</span>{{ prod.price }}</p>
                       <button class="btn-add" type="button"
                          @click="$root.$refs.basket.addProduct(prod)">BUY
                        </button>
                      </div>
                    </div>
                  </div>
                <div>`
 };

const product_list = {
    components: {product_item},
    data() {
        return {
            goodsEl: [],
            filterGoods: [],
            urlCatalog: '/catalogData.json',
        }

    },

    methods: {
        goodsFilter(item) {
            let tgExp = new RegExp(item, 'i');
            this.filterGoods = this.goodsEl.filter(product => tgExp.test(product.product_name));
        }
    },


    mounted() {
        this.$parent.getJson('/app_catalog')
            .then(items => {
                for (let item of items) {
                    this.goodsEl.push(item);
                    this.filterGoods.push(item);
                }
            });
    },
    template:
        `<div class="main-head">
                 <product_item v-for="product of filterGoods" :prod="product"></product_item>
              </div>`
};












// Vue.component('product-list', {
//   props: ['products'],
//   template: `<div class="main-head">
//                 <product-item v-for="item of products" :product="item"></product-item>
//              </div>`
// }),
//
// Vue.component('product-item', {
//   props: ['product'],
//   template: `<div>
//                   <div class="goods-list">
//                     <div class="goods-item">
//                       <img class="img-goods" width="200" height="200" :src="product.image" :alt="product.product_name" alt="product.product_name">
//                       <div class="wrap-price">
//                         <h3 class="product-name">{{ product.product_name }}</h3>
//                         <p class="product-price"><span>$</span>{{ product.price }}</p>
//                        <button class="btn-add" type="button"
//                           @click="$root.addProduct(product)">Купить
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 <div>
//                   <error-txt></error-txt>
//                 </div>
//             </div>`
// });
//
// Vue.component('error-txt', {
//   template: `<div>
//               <div class="text-error" v-if="$root.error"><span class="syntax">SyntaxError:</span> <p>Ошибка при подключении!</p></div>
//             </div>`
// });