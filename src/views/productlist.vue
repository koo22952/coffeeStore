<template>
  <div>
    <loading loader="bars" color="#32312f" :active.sync="isLoading"></loading>
    <div class="product_list">
      <!-- swiper -->
      <swiper class="product_img" :options="swiperOption">
        <swiper-slide>
          <div class="img"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="img"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <ul class="menu">
        <li>
          <router-link to="/">首頁</router-link>
          <span>
            <i class="fas fa-chevron-right"></i>
          </span>
        </li>
        <li>{{menu}}</li>
      </ul>

      <div class="product_box">
        <div class="categories">
          <ul class="items">
            <li class="all">
              <!-- class="cateactive" -->
              <a href="#" @click.prevent="filterCategories('all')">所有商品</a>
            </li>
            <li class="item">
              <a href="#" @click.prevent="filterCategories('典藏單品')">典藏單品</a>
            </li>
            <li class="item">
              <a href="#" @click.prevent="filterCategories('職人嚴選')">職人嚴選</a>
            </li>
            <li class="item">
              <a href="#" @click.prevent="filterCategories('濾掛咖啡')">濾掛咖啡</a>
            </li>
          </ul>
        </div>
        <div class="product_items">
          <div class="item">
            <div class="product" v-for="(item,key) in filterPagination[currentPage]" :key="item.id">
              <div class="prod_content">
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
            </div>
          </div>
          <!-- 頁籤 -->
          <nav aria-label="Page navigation example">
            <ul class="pagination mt-3 justify-content-center" v-if="pages">
              <li class="page-item" :class="{'disabled':currentPage === 0}">
                <a
                  href="#"
                  aria-label="Previous"
                  class="page-link"
                  @click.prevent="chousePage(false,false)"
                >
                  <span aria-hidden="true">«</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li
                class="page-item"
                :class="{'active':page-1 === currentPage}"
                v-for="page in pages"
                :key="page"
              >
                <!-- currentPage=page-1 -->
                <a href="#" class="page-link" @click.prevent="chousePage(page)">{{page}}</a>
              </li>
              <li class="page-item" :class="{'disabled':currentPage === filterPagination.length-1}">
                <a
                  href="#"
                  aria-label="Next"
                  class="page-link"
                  @click.prevent="chousePage(false,true)"
                >
                  <span aria-hidden="true">»</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import $ from 'jquery'

  export default {
    name: 'productlist',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        // swiper的方法
        swiperOption: {
          slidesPerView: 1, //出現幾個
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
        },
        products: [],
        filterData: [],
        isLoading: false,
        pages: 0,  //一共會有幾頁
        currentPage: 0,  //目前在第幾頁
        menu: '所有商品'
      }
    },
    computed: {
      // 分頁
      filterPagination() {
        let _this = this

        const pagination = [];
        _this.filterData.forEach((value, i) => {
          if (i % 6 === 0) {
            pagination.push([]); //每幾筆就增加一個空白分頁
          }
          const page = parseInt(i / 6); //每一個分頁內有幾筆資料
          pagination[page].push(value)
        });
        _this.pages = pagination.length
        _this.currentPage = 0;
        return pagination;
      },
    },
    methods: {
      // 點擊Categories做出篩選
      filterCategories(item) {
        const _this = this
        if (item === 'all') {
          _this.filterData = _this.products
          _this.menu = '全部商品'
          return
        } else {
          _this.filterData = _this.products.filter(n => {
            return n.category == item
          })
          _this.menu = item
        }
      },
      //查看是否是特價的
      is_sale(item) {
        return parseInt(item.origin_price) > parseInt(item.sale_price)
      },
      chousePage(page, direction) {
        console.log(page, direction)
        let goWhere = $(".menu").position()
        if (page) {
          this.currentPage = page - 1
        } else if (direction) {
          this.currentPage += 1
        } else {
          this.currentPage -= 1
        }
        $('html, body').animate({
          scrollTop: goWhere.top
        }, 600);
      },
      getProducts() {
        const _this = this
        const api = `${process.env.APIPATH}/product?is_enabled=1`
        // _this.isLoading = true
        this.$http.get(api).then((response) => {
          // console.log(response.data)
          _this.products = response.data
          _this.filterData = response.data
          // setTimeout(() => {
          // _this.isLoading = false
          // }, 500);
        })
      },
      getProduct(id) {
        const _this = this
        const api = `${process.env.APIPATH}/product/${id}`
        // _this.isLoading = true
        this.$http.get(api).then((response) => {
          _this.$router.push(`/productdetail/${id}`)
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

<style lang='scss' scoped>
  .product_list {
    max-width: 1080px;
    margin: 0 auto;
    margin-top: 150px;
    .product_img {
      width: 100%;
      height: 480px;
      .img {
        height: 100%;
        background-position: 50% 50%;
        background-size: cover;
        background-image: url("../assets/img/product_list_bg1.jpg");
      }
    }
    .menu {
      list-style: none;
      display: flex;
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
    .product_box {
      display: flex;
      .categories {
        flex: 1;
        .items {
          list-style: none;
          padding: 10px 40px;
          // flex-direction: column;
          // align-items: flex-start;
          margin-right: 10px;
          .all {
            &::after {
              content: "";
              margin-top: 10px;
              margin-bottom: 10px;
              border-bottom: 1px solid #32312f;
              display: block;
              width: 150px;
            }
          }
          li {
            margin-bottom: 5px;
            cursor: pointer;
            a {
              text-decoration: none;
            }
          }
        }
      }
      .product_items {
        flex: 5;
        padding: 5px 15px;
        margin-bottom: 40px;
        .item {
          display: flex;
          flex-wrap: wrap;
          .product {
            width: 270px;
            margin: 0 0px 30px 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .prod_content {
              position: relative;
              padding: 5px 0px;
              text-align: center;
              .new,
              .sale {
                z-index: 1;
                color: #ffffff;
                font-size: 14px;
                display: block;
                border-radius: 50%;
                position: absolute;
                top: 10px;
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
                  z-index: 2;
                }
                &::before {
                  content: "詳細介紹";
                  position: absolute;
                  top: 45%;
                  right: 50%;
                  font-size: 1px;
                  opacity: 0;
                  transform: translate(50%);
                  z-index: 3;
                  display: block;
                  background-color: transparent;
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
                min-height: 240px;
                padding: 10px;
              }
              .prodTitle {
                margin: 0 auto;
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
              &:hover {
                background-color: #9a2945;
              }
            }
          }
        }
      }
    }
  }
  .Page {
    justify-content: center;
    display: flex;
  }

  @media (max-width: 1096px) {
    .product_list {
      .product_box {
        .product_items {
          flex: 5;
          padding: 5px 5px;
          margin-bottom: 40px;
          .item {
            .product {
              width: 33%;
            }
          }
        }
      }
    }
  }

  @media (max-width: 987px) {
    .product_list {
      .product_box {
        .product_items {
          .item {
            .product {
              width: 50%;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .product_list {
      .product_box {
        flex-direction: column;
        .product_items {
          .item {
            .product {
              width: 50%;
              padding: 0 5px;
            }
          }
        }
        .categories {
          .items {
            padding: 10px 20px;
            margin: 15px 0 40px 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-right: 0px;
            .all {
              &::after {
                display: none;
              }
            }
            li {
              width: 100%;
              padding: 5px;
              .cateactive {
                color: #b83152;
              }
              a {
                display: inline-block;
                text-align: center;
                width: 100%;
                &.cateactive::after {
                  width: 15%;
                  border-bottom: 1.5px solid #9a2945;
                }
                &::after {
                  content: "";
                  display: block;
                  border-bottom: 1px solid #32312f;
                  padding-bottom: 2px;
                  width: 65%;
                  margin: 5px auto;
                  transition: all 0.3s ease-in;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 500px) {
    .product_list {
      .product_img {
        display: none;
      }
      .product_box {
        .product_items {
          .item {
            .product {
              width: 100%;
            }
          }
        }
        .categories {
          .items {
            padding: 10px 5px;
            flex-wrap: wrap;
            li {
              width: 50%;
            }
          }
        }
      }
    }
  }
</style>
