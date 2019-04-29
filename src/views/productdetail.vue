<template>
  <div>
    <loading loader="bars" color="#32312f" :active.sync="isLoading"></loading>
    <div class="prdDetail">
      <ul class="menu">
        <li>
          <router-link to="/">首頁</router-link>
          <span>
            <i class="fas fa-chevron-right"></i>
          </span>
        </li>
        <li>
          {{product.category}}
          <span>
            <i class="fas fa-chevron-right"></i>
          </span>
        </li>
        <li>{{product.title}}</li>
      </ul>

      <div class="detail_item">
        <div class="img">
          <div>
            <span class="new" v-if="product.is_newarrive">NEW</span>
            <span class="sale" v-if="is_sale(product)">SALE</span>
            <img :src="product.imageUrl" alt>
          </div>
        </div>
        <div class="content">
          <h4 class="content_title">{{product.title}}</h4>
          <div class="content_cont">
            <p class="p1">{{product.description}}</p>
            <p class="p2">商品描述：</p>
            <p class="p3">{{product.content}}</p>
          </div>
          <div class="pricelist">
            <span
              class="price"
              :class="{'originalPrice':is_sale(product)}"
            >{{product.origin_price | currency}}</span>
            <span class="salePrice" v-if="is_sale(product)">{{product.sale_price | currency}}</span>
          </div>
          <div id="proform" prevent>
            <div class="product_number">
              <!--數字增減開始-->
              <label for="quantity">數量</label>
              <div class="wan_spinner">
                <a href="#" class="minus" disabled @click.prevent="operation(false)">-</a>
                <input id="quantity" name="quantity" type="text" :value="qty">
                <a href="#" class="plus" @click.prevent="operation(true)">+</a>
              </div>
              <!--數字增減結束-->
            </div>
            <div class="product_btn">
              <!-- <a href="#" title="加入購物車"> -->
              <div class="products_addcart" @click="addCart">加入購物車</div>
              <!-- </a> -->
            </div>
          </div>
        </div>
      </div>
      <maybe @getDetail="getProduct"></maybe>
      <hr>
    </div>
  </div>
</template>


<script>

  import maybe from '@/components/maybelikeproduct.vue'

  export default {
    name: 'productdetail',
    components: {
      maybe
    },
    data() {
      return {
        isLoading: false,
        product: {},
        qty: 1
      }
    },
    methods: {
      is_sale(item) {
        return parseInt(item.origin_price) > parseInt(item.sale_price)
      },
      getProduct(id) {
        const _this = this
        // console.log(_this.$route.params)
        const api = `${process.env.APIPATH}/product/${_this.$route.params.id}`
        _this.isLoading = true
        this.$http.get(api).then((response) => {
          _this.product = response.data
          setTimeout(() => {
            _this.isLoading = false
          }, 500);
        })
      },
      // 運算點選時加減
      operation(status) {
        if (status) {
          this.qty += 1
        }
        if (!status && this.qty > 1) {
          this.qty -= 1
        }
      },

      addCart() {
        const _this = this
        const api = `${process.env.APIPATH}/cart`
        _this.isLoading = true
        let data = Object.assign({}, _this.product);
        data.qty = _this.qty
        data.id = ''

        _this.$http.post(api, data).then((response) => {

          _this.qty = 1
          _this.$bus.$emit('cartlength', {
            length: 1
          })
          _this.isLoading = false
        })
      }
    },
    created() {
      this.getProduct()
    }
  }
</script>



<style lang='scss' scoped>
  .prdDetail {
    max-width: 1080px;
    margin: 0 auto;
    margin-top: 180px;

    .menu {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      margin: 35px 0;
      padding: 10px 40px;
      color: #32312f;
      li {
        letter-spacing: 2px;
        color: #b83152;
        a {
          text-decoration: none;
        }
      }
      span {
        color: #999;
        font-size: 14px;
        padding: 0 10px;
      }
    }
    .detail_item {
      display: inline-flex;
      padding: 0 10px;
      margin: 30px 0;
      width: 100%;
      .img {
        flex: 4;
        text-align: center;
        div {
          // margin: 0 auto;
          position: relative;
          max-height: 300px;
          max-width: 300px;
          padding: 10px;
        }
        .new,
        .sale {
          z-index: 1;
          color: #ffffff;
          font-size: 14px;
          display: block;
          border-radius: 50%;
          position: absolute;
          top: 2%;
          left: 5%;
          padding: 5px;
          line-height: 40px;
          width: 50px;
          height: 50px;
          background-color: #2d2c2a;
        }
        .sale {
          background-color: #ef3434;
        }
        img {
          max-height: 400px;
          max-width: 400px;
          padding: 10px;
        }
      }
      .content {
        flex: 5;
        padding-right: 10px;
        .content_title {
          // font-size: 22px;
          padding: 10px 0;
          font-weight: 500;
        }
        .content_cont {
          min-height: 200px;
          &::after {
            content: "";
            margin-top: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #c3c3c3;
            display: inline-block;
            width: 100%;
          }
          &::before {
            content: "";
            margin-top: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #c3c3c3;
            display: inline-block;
            width: 100%;
          }
          p {
            padding: 10px 0;
          }
          .p1 {
            font-size: 20px;
            font-weight: 400;
          }
          .p2 {
            // font-size: 18px;
            margin-top: 15px;
            font-weight: 400;
          }
          .p3 {
            font-weight: 300;
          }
        }
        .pricelist {
          margin-bottom: 20px;
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
        }
        #proform {
          display: flex;
          flex-direction: column;
          a {
            text-decoration: none;
          }
          .product_number {
            label {
              font-size: 13px;
              text-transform: capitalize;
              color: #aaaaaa;
              margin-bottom: 0;
            }
            .wan_spinner {
              display: inline-block;
              width: 100%;
              #quantity {
                width: 80%;
                background: none;
                border: 1px solid #c3c3c3;
                border-left: none;
                border-right: none;
                vertical-align: middle;
                text-align: center;
                height: 40px;
                font-size: 14pt;
                font-weight: 300;
                // margin-right: -5px;
              }
              .minus {
                color: #595757;
                font-weight: 400;
                width: 10%;
                height: 40px;
                display: inline-block;
                border: 1px solid #c3c3c3;
                border-right: 0px;
                font-size: 20pt;
                transition: 0.5s;
                text-align: center;
                vertical-align: middle;
                line-height: 36px;
                margin-right: -4px;
                font-family: monospace;
                border-radius: 3px 0px 0px 3px;
                &:hover {
                  color: #9a2945;
                }
              }
              .plus {
                color: #595757;
                font-weight: 400;
                width: 10%;
                height: 40px;
                display: inline-block;
                border: 1px solid #c3c3c3;
                border-left: 0px;
                font-size: 20pt;
                transition: 0.5s;
                text-align: center;
                vertical-align: middle;
                line-height: 36px;
                margin-left: -4px;
                font-family: monospace;
                border-radius: 0px 3px 3px 0px;
                &:hover {
                  color: #9a2945;
                }
              }
            }
          }
          .product_btn {
            // flex: 5;
            margin-top: 20px;
            // border-radius: 10px;
            .products_addcart {
              cursor: pointer;
              display: block;
              font-weight: bolder;
              background: #b83152;
              color: #fff;
              width: 100%;
              height: 40px;
              font-size: 12pt;
              letter-spacing: 1pt;
              font-weight: 300;
              // padding: 5px 0;
              line-height: 40px;
              border: 1pt solid transparent;
              transition: 0.5s;
              text-align: center;
              border-radius: 3px;
              &:hover {
                background: #9a2945;
              }
            }
          }
        }
      }
    }
  }

  hr {
    width: 60%;
    margin: 60px auto 130px auto;
  }

  @media (max-width: 860px) {
    .prdDetail {
      .detail_item {
        .img {
          flex: 1;
          img {
            max-height: 300px;
            max-width: 300px;
            padding: 10px;
          }
        }
        .content {
          flex: 5;
          padding: 0 10px;
          .content_title {
            // font-size: 22px;
            padding: 10px 0;
            // text-align: center;
            font-weight: 500;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .prdDetail {
      .detail_item {
        display: flex;
        flex-direction: column;
        .img {
          div {
            margin: 0 auto;
          }
        }
      }
      .menu {
        padding: 10px 0px 10px 10px;
        margin: 35px 0 0 0;
      }
    }
    hr {
      width: 60%;
      margin: 70px auto 50px auto;
    }
  }
</style>
