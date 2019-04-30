<template>
  <div>
    <!-- 讀取的效果 -->
    <loading loader="bars" color="#32312f" :active.sync="isLoading"></loading>

    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立產品</button>
    </div>
    <div class="table-responsive">
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="140">分類</th>
            <th>產品名稱</th>
            <th width="100" class="text-right">價錢</th>
            <th width="110" class="text-center">價格狀態</th>
            <th width="110" class="text-center">是否啟用</th>
            <th width="90" class="text-center">新品</th>
            <th width="130" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,key) in paginationPage[currentPage]" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-right">
              <span v-if="saleProduct(item)" class="text-danger">{{item.sale_price | currency}}</span>
              <span v-else>{{item.origin_price | currency}}</span>
            </td>
            <td class="text-center">
              <span v-if="saleProduct(item)" class="text-danger">特價中</span>
              <span v-else>原價</span>
            </td>
            <td class="text-center">
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td class="text-center">
              <span v-if="item.is_newarrive" class="text-success">是</span>
              <span v-else></span>
            </td>
            <td class="text-center">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
                <button class="btn btn-outline-danger btn-sm" @click="delProductModal(item)">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center mb-4">
        <li class="page-item" :class="{'disabled':currentPage === 0}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="currentPage-=1">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :class="{'active':currentPage === page - 1}" v-for="page in pages">
          <a class="page-link" href="#" @click.prevent="currentPage=page-1">{{page}}</a>
        </li>

        <li class="page-item" :class="{'disabled':currentPage === paginationPage.length-1}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="currentPage+=1">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Modal -->
    <div>
      <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span v-if="isNew">新增產品</span>
                <span v-else>編輯 {{tempProduct.title}}</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <!-- <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input
                      type="text"
                      v-model="tempProduct.imageUrl"
                      class="form-control"
                      id="image"
                      placeholder="請輸入圖片連結"
                    >
                  </div>-->
                  <div class="form-group">
                    <label for="customFile">
                      上傳圖片
                      <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                    </label>
                    <input
                      class="form-control pt-1"
                      type="file"
                      id="customFile"
                      ref="files"
                      accept="image/*"
                      @change="uploadFile"
                    >
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt>
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">名稱</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      v-model="tempProduct.title"
                      placeholder="請輸入名稱"
                    >
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="tempProduct.category"
                        id="category"
                        placeholder="請輸入分類"
                      >
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input
                        type="unit"
                        class="form-control"
                        v-model="tempProduct.unit"
                        id="unit"
                        placeholder="請輸入單位"
                      >
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">售價</label>
                      <input
                        type="number"
                        class="form-control"
                        id="origin_price"
                        placeholder="請輸入售價"
                        v-model="tempProduct.origin_price"
                      >
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">特價</label>
                      <input
                        type="number"
                        v-model="tempProduct.sale_price"
                        class="form-control"
                        id="price"
                        placeholder="請輸入特價"
                      >
                    </div>
                  </div>
                  <hr>

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea
                      v-model="tempProduct.description"
                      type="text"
                      class="form-control"
                      id="description"
                      placeholder="請輸入產品描述"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea
                      v-model="tempProduct.content"
                      type="text"
                      class="form-control"
                      id="content"
                      placeholder="請輸入產品說明內容"
                    ></textarea>
                  </div>
                  <div class="form-group d-flex">
                    <div class="form-check mr-3">
                      <input
                        class="form-check-input"
                        :true-value="1"
                        :false-false="0"
                        v-model="tempProduct.is_enabled"
                        type="checkbox"
                        id="is_enabled"
                      >
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        :true-value="1"
                        :false-false="0"
                        v-model="tempProduct.is_newarrive"
                        type="checkbox"
                        id="is_newarrive"
                      >
                      <label class="form-check-label" for="is_newarrive">是否為新品</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updataProduct">確認</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProducts">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>

  import $ from 'jquery'

  export default {
    name: 'prdouctsManager',
    data() {
      return {
        products: [],
        pages: 0,
        currentPage: 0,
        tempProduct: {
        },
        isNew: false,
        isLoading: false,
        status: {
          fileUploading: false
        }
      }
    },
    computed: {
      paginationPage() {
        let _this = this
        const pagination = [];
        this.products.forEach((value, i) => {
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
      // currentPage() {
      // this.products 
      // 新增就跳到page最後一頁
      // 刪除的話就保留在原始頁,
      // 如果是刪除到當頁的最後一個,就跳回前一頁
      // }
    },
    methods: {
      saleProduct(item) {
        return parseInt(item.origin_price) > parseInt(item.sale_price)
      },
      getProducts() {
        const _this = this
        const api = `${process.env.APIPATH}/product`
        _this.isLoading = true
        _this.$http.get(api).then((response) => {
          _this.products = response.data
          _this.isLoading = false
        })

      },
      openModal(isNew, item) {
        if (isNew) {
          this.tempProduct = {};
          this.isNew = true;
        } else {
          // 物件傳參考,利用 Object.assing 
          this.tempProduct = Object.assign({}, item);
          this.isNew = false;
        }
        $('#productModal').modal('show')
      },
      updataProduct() {
        const _this = this
        let api = `${process.env.APIPATH}/product`
        let httpMethod = 'post';
        if (!_this.isNew) {
          api = `${process.env.APIPATH}/product/${_this.tempProduct.id}`
          httpMethod = 'put'
        }

        this.$http[httpMethod](api, _this.tempProduct).then((response) => {
          // console.log(response.data)
          if (response.data) {
            $('#productModal').modal('hide')
            _this.getProducts();
          } else {
            $('#productModal').modal('hide')
            _this.getProducts();
            // console.log('新增失敗')
          }
        })
      },
      uploadFile(e) {
        // e.target.files.length
        // if (this.tempProduct.imageUrl == "") {
        const file = e.target.files.item(0)
        const reader = new FileReader()
        reader.addEventListener('load', this.imageLoaded)
        reader.readAsDataURL(file)
        // } else {
        //   this.tempProduct.imageUrl = ''
        // }
      },
      imageLoaded(e) {
        // this.tempProduct.imageUrl = e.target.result
        this.status.fileUploading = true
        setTimeout(() => {
          this.$set(this.tempProduct, "imageUrl", e.target.result)
          this.status.fileUploading = false
        }, 1000)


      },
      delProductModal(item) {
        this.tempProduct = Object.assign({}, item);
        $("#delProductModal").modal("show");
      },
      //刪除項目
      delProducts() {
        const _this = this;
        const api = `${process.env.APIPATH}/product/${_this.tempProduct.id}`;
        this.$http.delete(api).then(response => {
          // console.log(response.data);
          $("#delProductModal").modal("hide");
          _this.getProducts()
          // _this.products = response.data.products;
        });
      },
    },
    created() {
      this.getProducts();
    }
  }
</script>


<style lang="scss" scoped>
  hr {
    width: 90%;
    margin-top: 10px;
    margin-bottom: 30px;
  }
</style>
