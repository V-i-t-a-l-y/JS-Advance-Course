'use strict';

const filter_product = {
  data() {
    return {
      searchLine: ''
    }
  },

  template: `<form action="#" class="form-head" @submit.prevent="$parent.$refs.products.goodsFilter(searchLine)" >
                <input type="text" v-model="searchLine" class="search-input" placeholder="Search...">
                <button type="submit" class="search-icon">
                  <i class="fas fa-search fa-lg"></i>
                </button>
             </form>`
}
