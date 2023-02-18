'use strict';
  
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    components: {product_list, basket, filter_product},
    data: {
        error: false,
    },
    el: '#app',
    methods: {
        getJson(url) {
            return fetch(url)
                .then(text => text.json())
                .catch(error => {
                    this.error = true;
                })
        },

        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
               .then(txt => txt.json())
               .catch(err => {
                   console.log(err);
               })
        },

        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
               .then(txt => txt.json())
               .catch(err => {
                   console.log(err);
               })
        },

        delJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
               .then(txt => txt.json())
               .catch(err => {
                   console.log(err);
               })
        }
    }

});


//   // Базовый класс для всех списков - то есть базовый для каталога и корзины.
// class List {
//   /**
//    * @param {container} - в данный блок выведим товары либо каталога, либо корзины.
//    * @param {url} - путь к json файлу, из которого будем барть товары.
//    * @param {list} - для возможности вывода и товаров каталога и товаров корзины.
//    */

//   constructor(container, url, list = list2) {
//     this.container = container;
//     this.url = url;
//     this.list = list;
//     this.btnEl = document.querySelector('.btn-card');
//     this.bsktEl = document.querySelector('.basket-products');
//     this.goods = []; // товары для json.
//     this.allProducts = []; // массив объектов соответствующего класса.
//     this.filterGoods = []; // товар отфильтрованный из this.allProducts
//     this._init(); // данный метод только отвечает за события на сайте
//   }

//   getJson(url) {
//   return  fetch(url ? url : `${API_URL + this.url}`)
//             .then(text => text.json())
//   }

//   handleItem(items) { // запускает отрисовку либо каталога товара, либо товаров корзины.
//     // this.goods = items;
//      for (let item of items) {  // заполняем goods товарами из json
//       this.goods.push(item);
//      }
//     this.createMarkup(); // после того как массив заполнен товарами можно  ...
//     // ... их отрисовывать и выводить на экран.

//   }

//   createMarkup() { // вывод всех товаров на экран
//     console.log(this.constructor.name) // имя класса из которого вызыватся метод createMarkup().
//     const block = document.querySelector(this.container);
//     for (let product of this.goods) {
//       const productObj = new this.list[this.constructor.name](product);
//       this.allProducts.push(productObj);
//       block.insertAdjacentHTML('beforeend', productObj.render());
//     }
//      if (this.allProducts.length) {
//       this.textEl.style.display = 'none';
//      };
//   }
// };

// // Класс базовый для товара каталога и товара корзины
// class Item {
//   constructor(el, img = `src="image/iMac.jpeg"`) {
//     this.title = el.product_name;
//     this.price = +el.price;
//     this.id = +el.id_product;
//     this.img = img;
//   }
//   render() { // генерация товара для каталога товара
//      return `<div class="goods-item" data-id="${this.id}">
//                  <img class="img-goods" ${this.img} alt="iMac">
//               <div class="wrap-price">
//                    <h3 class="product-name">${this.title}</h3>
//                    <p class="product-price">${this.price}$</p>
//                    <button class="btn-add" type="button"
//                       data-id ="${this.id}"
//                       data-name ="${this.title}"
//                       data-price ="${this.price}">Купить
//                    </button>
//               </div>
//             </div>`
//   }
// };

// //Каталог товара
// class ProductItem extends Item {};

// // Цели конструктора каталога и корзины одна и таже:
// // 1) Регистрация событий по клику на кнопку купить
// // 2) Заполнить массив товаров из файла JSON
// // 3) Вывод данных на странице, используя метод HandleData(), который заполняет глобальный массив товаров и воводит их на странице, вызывая метод createMarkup().

// // Класс одного товара корзины
// class CartItem extends Item {
//   constructor(el) {
//     super(el) // Вызываем constructor базового класса с прам-и текущего const-ra
//     this.quantity = el.quantity;
//   }

//   render() { // генерация товара для корзины.
//     return `<div class="merch-item" data-id="${this.id}">
//               <img class="merch-product" ${this.img} alt="iMac">
//                 <div class="merch-price">
//                     <h4 class="merch-name">${this.title}</h4>
//                     <p class="merch-quantity">Quantity: <span class="merch-span">${this.quantity}</span></p>
//                     <p class="price-per-piece">$${this.price}
//                     <span>each</span></p>
//                 </div>
//     <div class="merch-right-block">
//       <p class="basket-price-product">$<span class="bskt-price-span">${this.price}<span></p>
//       <div class="wrap-del-btn"><button class="del-btn" data-id="${this.id}">x</button></div>
//     </div>
//   </div>`
//   }
// };

// // Список товаров корзины
// class Cart extends List {
//   constructor(container = '.basket-products', url = '/getBasket.json') {
//     super(container, url) // Вызываем constructor базового класса с прам-и текущего const-ra
//     // this.getJson() // если не хотим изначально выводить товра в корзине
//     //  .then(item => this.handleItem(item.contents));
//   }

//   // данный метод открывает корзину и также запускает метод возможности удаления товара.
//   _init() {
//     document.querySelector(this.container).addEventListener('click', e => {
//       if(e.target.closest('.del-btn')) {
//         this.removeProduct(e.target);
//       }
//     })
//   }

// addProduct(elem) { // передаем соответствующие data id, name, price
//     this.getJson(`${API_URL}/addToBasket.json`)
//       .then(item => {
//         if (item.result === 1) {
//           const find = this.allProducts.find(prod => prod.id === +elem.dataset.id); // находим соответсвующий товар в корзине с одинаковым id
//           if (find) { // если товар есть,
//             find.quantity++; // просто прибавляем количесвто
//             this._newCreateMarkup(find); // и перерисовываем
//           } else {
//             const product = {
//               id_product: +elem.dataset.id,
//               product_name: elem.dataset.name,
//               price: +elem.dataset.price,
//               quantity: 1
//             }
//             this.goods = [product];
//             this.createMarkup();
//           }
//         }
//       })

//   }

//   removeProduct(elem) {
//     this.getJson(`${API_URL}/deleteFromBasket.json`)
//       .then(item => {
//         if (item.result === 1) {
//           const find = this.allProducts.find(product => product.id === +elem.dataset.id);
//           if (find.quantity > 1) { // если кол-во больше одного, то уменьшаем на один и перерисовываем.
//             find.quantity--;
//             this._newCreateMarkup(find);
//           } else { // если кол-во один, то удаляем
//             this.allProducts.splice(this.allProducts.indexOf(find), 1);
//             document.querySelector(this.container).querySelector(`.merch-item[data-id="${find.id}"]`).remove();

//             if (!this.allProducts.length) {
//              this.textEl.style.removeProperty('display');
//             };

//           }
//         };
//       });
//   };

//    _newCreateMarkup(product) { // передаем в качестве параметра найденный элемент
//     const block =  document.querySelector(`.merch-item[data-id="${product.id}"]`); // находим в корзине элемент с id
//     block.querySelector('.bskt-price-span').textContent = product.quantity * product.price; // находим span
//     block.querySelector('.merch-span').textContent = product.quantity;// находим span
//   }
// };

// // Каталог товаров
// class ProductsList extends List {
//   constructor(cart, container = '.goods-list', url = '/catalogData.json') {
//     super(container, url) // Вызываем constructor базового класса с прам-и текущего const-ra
//     this.cart = cart;
//     this.getJson()
//       .then(item => this.handleItem(item)) // этим методом добавляем все товары в массив this.goods[]
//                                           //  и отрисовываем все товары на экран
//                                           //  при момощи метода createMarkup()
//   }

//   _init() {
//     this.btnEl.addEventListener('click', () => {this.bsktEl.classList.toggle('none')});

//     document.querySelector(this.container).addEventListener('click', e => {
//       if(e.target.classList.contains('btn-add')) {
//         this.cart.addProduct(e.target);
//       }
//     });

//     document.querySelector('.form-head').addEventListener('submit', e => {
//       e.preventDefault();
//       this._productMatch(document.querySelector('.search-input').value);
//     });
//   }

//   _productMatch(value) {
//     const regExp = new RegExp(value, 'i');
//     this.filterGoods = this.allProducts.filter(product => regExp.test(product.title))
//     this.allProducts.forEach(el => {
//       const product = document.querySelector(`.goods-item[data-id="${el.id}"]`);
//       if (this.filterGoods.includes(el)) {
//         product.style.removeProperty('display');
//       } else {
//         product.style.display = 'none';
//       }
//     });
//   }
// }

// // универсальный объект по которому будем находить класс при верстве createMarkup()
// const list2 = {
//   ProductsList: ProductItem,
//   Cart: CartItem,
// }

// const cart = new Cart();
// const products = new ProductsList(cart); // Если мы хотим использовать в классе методы другого класса,
//                                         // то удобнее    всего в конструктор передать объект класса, методы которого нам нужны в данном классе.



