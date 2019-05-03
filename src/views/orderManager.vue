<template>
  <div class="orderbox">
    <loading loader="bars" color="#32312f" :active.sync="isLoading"></loading>
    <table class="table">
      <thead>
        <tr style="background: #c9c9c9;">
          <td>訂單日期</td>
          <td>Email</td>
          <td>購買款項</td>
          <td class="text-right">應付金額</td>
          <td class="text-center">是否付款</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in sortOrder[currentPage]"
          :key="key"
          v-if="orders.length"
          :class="{'text-secondary': !item.is_paid}"
        >
          <td>{{ item.create_at | dateFilter }}</td>
          <td>
            <span v-text="item.user.email" v-if="item.user"></span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.title }} 數量：{{ product.qty }}
                {{ product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td class="text-center">
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 頁籤 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination mt-3 mt-5">
        <li class="page-item" :class="{'disabled':currentPage === 0}">
          <a href="#" aria-label="Previous" class="page-link" @click.prevent="currentPage-=1">
            <span aria-hidden="true">«</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{'active':currentPage === page - 1}"
          v-for="page in pages"
          :key="page"
        >
          <a href="#" class="page-link" @click.prevent="currentPage=page-1">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled':currentPage === sortOrder.length-1}">
          <a href="#" aria-label="Next" class="page-link" @click.prevent="currentPage+=1">
            <span aria-hidden="true">»</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

  // import pagination from '@/components/Pagination'
  export default {
    data() {
      return {
        orders: [],
        pagination: {},
        isLoading: false,
        pages: 0,
        currentPage: 0,
      }
    },

    methods: {
      getOrders(page) {
        const vm = this;
        const api = `${process.env.APIPATH}/customerorder`;
        vm.isLoading = true
        this.$http.get(api).then(function (response) {
          vm.orders = response.data;
          vm.isLoading = false
        });
      },
      // openDeleteModel(item) {
      //   this.tempProduct = Object.assign({}, item)
      //   $("#delProductModal").modal("show");
      // }
    },
    computed: {
      sortOrder() {
        const _this = this;
        let newOrder = [];
        if (_this.orders.length) {
          newOrder = _this.orders.sort((a, b) => {
            const aIsPaid = a.is_paid ? 1 : 0;
            const bIsPaid = b.is_paid ? 1 : 0;
            return bIsPaid - aIsPaid;
          });
        }
        const pagination = [];
        newOrder.forEach((value, i) => {
          if (i % 15 === 0) {
            pagination.push([]); //每幾筆就增加一個空白分頁
          }
          const page = parseInt(i / 15); //每一個分頁內有幾筆資料
          pagination[page].push(value)
        });
        _this.pages = pagination.length
        _this.currentPage = 0;
        return pagination;
      },
    },
    created() {
      this.getOrders();
    }
  };
</script>


<style lang="scss" scoped>
  @import "~bootstrap/scss/bootstrap";
  @import "~bootstrap/scss/functions";
  .orderbox {
    padding: 20px;
    box-sizing: border-box;
    max-width: 1080px;
    margin: 10px auto;
    border: 1px solid #eee;
  }
</style>