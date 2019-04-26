<template>
  <div>
    <div class="product_list">
      <p class="maybe">你可能會喜歡</p>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,key) in products" :key="item.id">
          <div class="prod">
            <div class="img" @click="getProduct(item.id)">
              <span class="new" v-if="item.is_newarrive">NEW</span>
              <span class="sale" v-if="is_sale(item)">SALE</span>
              <img :src="item.imageUrl" alt>
            </div>
            <div class="prodTitle">
              <p>{{item.title}}</p>
            </div>
            <div>
              <span
                class="price"
                :class="{'originalPrice':is_sale(item)}"
              >{{item.origin_price | currency}}</span>
              <span class="salePrice" v-if="is_sale(item)">{{item.sale_price | currency}}</span>
            </div>
          </div>
          <div class="btn" @click="addCart(item)">加入購物車</div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>


<script>

  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        // swiper的方法
        swiperOption: {
          slidesPerView: 4, //出現幾個
          spaceBetween: 10,
          loop: true,
          speed: 600,
          autoplay: {
            delay: 5000,
          },
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          },
          // 響應式
          breakpoints: {
            //当宽度小于等于320
            535: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            //当宽度小于等于480
            813: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1060: {
              slidesPerView: 3,
              spaceBetween: 20
            },
          }
        },
        products: [],
      }
    },
    methods: {
      is_sale(item) {
        return parseInt(item.origin_price) > parseInt(item.sale_price)
      },
      getProducts() {
        const _this = this
        // console.log(this.$route.params.id)
        //不包含網頁已經顯示的ID
        const api = `${process.env.APIPATH}/product?id_ne=${this.$route.params.id}&is_enabled=1`
        // _this.isLoading = true
        _this.$http.get(api).then((response) => {
          _this.products = response.data
          // setTimeout(() => {
          // _this.isLoading = false
          // }, 500);
        })
      },
      getProduct(id) {
        const _this = this
        const api = `${process.env.APIPATH}/product/${id}`
        _this.$http.get(api).then((response) => {
          _this.$router.push(`/productdetail/${id}`)
          _this.$emit('getDetail', id)
          _this.getProducts()
          // setTimeout(() => {
          // _this.isLoading = false
          // }, 800);
        })
      },
      addCart(item, qty = 1) {
        const _this = this
        const api = `${process.env.APIPATH}/cart`
        // _this.isLoading = true
        let data = Object.assign({}, item);
        data.qty = qty
        data.id = ''
        _this.$http.post(api, data).then((response) => {
                    _this.$bus.$emit('cartlength', {
            length: 1
          })
          // _this.isLoading = false
        })
      }
    },
    created() {
      this.getProducts()
    }
  }
</script>

<style lang="scss" scoped>
  .product_list {
    // height: 5000px;
    padding-bottom: 30px;
    text-align: center;
    .maybe {
      text-align: left;
      margin: 40px 10px;
    }
    .swiper-slide {
      position: relative;
      padding: 5px 0px;
      margin-bottom: 40px;
      .prod {
        padding: 5px 0px;
      }
      .new,
      .sale {
        color: #ffffff;
        font-size: 14px;
        display: block;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        left: 5px;
        padding: 5px;
        line-height: 40px;
        width: 50px;
        height: 50px;
        background-color: #2d2c2a;
      }
      .sale {
        background-color: #ef3434;
      }
      .price {
        font-size: 20px;
        font-weight: bolder;
        padding-bottom: 10px;
      }
      .originalPrice {
        font-size: 16px;
        font-weight: 400;
        color: #757f89;
        text-decoration: line-through;
      }
      .salePrice {
        font-size: 20px;
        font-weight: bolder;
        padding-bottom: 10px;
        color: #ef3434;
      }
      .img {
        cursor: pointer;
        position: relative;
        max-width: 220px;
        max-height: 220px;
        margin: 0 auto;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: block;
          background-color: transparent;
          transition: background-color 0.8s ease;
        }
        &::before {
          content: "詳細介紹";
          position: absolute;
          top: 45%;
          right: 50%;
          font-size: 1px;
          opacity: 0;
          transform: translate(50%);
          z-index: 1;
          display: block;
          // background-color: transparent;
          transition: all 0.4s ease;
        }
        &:hover::after {
          background-color: rgba(50, 49, 47, 0.9);
        }
        &:hover::before {
          opacity: 1;
          // font-weight: 700;
          font-size: 20px;
          color: #ffffff;
        }
      }
      img {
        max-width: 200px;
        max-height: 200px;
        padding: 10px;
      }
      .prodTitle {
        // margin: 0 auto;
        // text-align: center;
        padding: 5px 0px;
        &::after {
          content: "";
          margin-top: 10px;
          margin-bottom: 10px;
          border-bottom: 2.5px solid #adadad;
          display: inline-block;
          width: 50px;
        }
        p {
          font-size: 16px;
        }
      }
      .btn {
        width: 120px;
        height: 40px;
        cursor: pointer;
        // text-align: center;
        color: #fff;
        border: none;
        padding: 5px;
        background: #b83152;
        font-size: 14px;
        line-height: 30px;
        border-radius: 40px;
        margin-top: 5px;
        &:hover {
          background: #9a2945;
        }
      }
    }
  }
</style>
