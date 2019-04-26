<template>
  <div>
    <div class="hotProduct" v-if="newProducts.length">
      <div class="title">
        <p>熱銷商品</p>
      </div>
      <div class="product_list">
        <!-- swiper -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,key) in newProducts" :key="item.id">
            <div class="prod">
              <div class="img" @click="getProduct(item.id)">
                <span class="new" v-if="item.is_newarrive">NEW</span>
                <img :src="item.imageUrl" alt>
              </div>
              <div class="prodTitle">
                <p>{{item.title}}</p>
              </div>
              <p class="price">{{item.origin_price | currency}}</p>
              <!-- <p class="salePrice">$220</p> -->
            </div>
            <div class="btn" @click="addCart(item)">加入購物車</div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  // require styles
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
          slidesPerView: 3, //出現幾個
          spaceBetween: 10,
          loop: true,
          speed: 600,
          // autoplay: {
          //   delay: 5000,
          // },
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          },
          // 響應式
          breakpoints: {
            //当宽度小于等于320
            615: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            //当宽度小于等于480
            915: {
              slidesPerView: 2,
              spaceBetween: 20
            },
          }
        },
        products: [],
        isLoading: false
      }
    },
    computed: {
      // 將sale的商品去除
      newProducts() {
        return this.products.filter(n => {
          if (n.sale_price == undefined || n.sale_price == "") {
            n.sale_price = n.origin_price
          }
          return parseInt(n.origin_price) <= parseInt(n.sale_price)
        })
      }
    },
    methods: {
      getProducts() {
        const _this = this
        const api = `${process.env.APIPATH}/product?is_enabled=1`
        // _this.isLoading = true
        this.$http.get(api).then((response) => {
          // console.log(response.data)
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
        })
      },
    },
    created() {
      this.getProducts()
    }
  }
</script>

<style lang='scss' scoped>
  .hotProduct {
    margin: 0 auto;
    margin-bottom: 100px;
    max-width: 940px;
    width: 100%;
    height: auto;
    text-align: center;
    color: #32312f;
    .title {
      color: #2d2c2a;
      margin: 0px auto 30px auto;
      letter-spacing: 5px;
      padding-bottom: 20px;
      &::after {
        content: "";
        margin-top: 10px;
        margin-bottom: 10px;
        border-bottom: 2.5px solid #32312f;
        display: inline-block;
        width: 50px;
      }
      p {
        text-align: center;
        font-size: 24px;
        font-weight: 500;
      }
    }
    .product_list {
      // height: 5000px;
      padding-bottom: 30px;
      .swiper-slide {
        position: relative;
        padding: 5px 15px;
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
        .salePrice {
          font-size: 20px;
          font-weight: bolder;
          padding-bottom: 10px;
          color: #ef3434;
        }
        .img {
          cursor: pointer;
          position: relative;
          max-width: 260px;
          margin: 0 auto;
          padding: 10px;
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
          max-width: 240px;
          max-height: 240px;
          padding: 10px;
        }
        .prodTitle {
          margin: 0 auto;
          text-align: center;
          padding: 5px;
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
          text-align: center;
          color: #fff;
          border: none;
          padding: 5px;
          background: #b83152;
          font-size: 14px;
          line-height: 30px;
          border-radius: 40px;
          transition: all 0.2s ease-in-out;
          &:hover {
            // box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);
            background: #9a2945;
          }
        }
      }
    }
  }
</style>
