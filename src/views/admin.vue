<template>
  <div>
    <!-- 讀取的效果 -->
    <loading loader="bars" color="#32312f" :active.sync="isLoading"></loading>

    <nav class="navbar bg-dark p-0 shadow">
      <div class="container">
        <div class="w-100 row py-2">
          <div class="col d-flex justify-content-between">
            <ul class="navbar-nav d-flex flex-row">
              <li class="nav-item mr-3">
                <router-link class="nav-link" to="/admin">
                  <i class="fas fa-home mr-1"></i>後台首頁
                </router-link>
              </li>
              <li class="nav-item mr-3">
                <router-link class="nav-link" to="/admin/productsManager">
                  <i class="fas fa-archive mr-1"></i>產品列表
                </router-link>
              </li>
              <li class="nav-item mr-3">
                <router-link class="nav-link" to="/admin/orderManager">
                  <i class="far fa-file-alt mr-1"></i>訂單列表
                </router-link>
              </li>
            </ul>
            <ul class="navbar-nav d-flex flex-row">
              <li class="nav-item mr-3">
                <!-- <a class="nav-link" href="#">回到首頁</a> -->
                <router-link class="nav-link" to="/">回到首頁</router-link>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="singout">登出</a>
              </li>-->
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <main role="main" class="col-md-9 col px-2 my-5 mx-auto border">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'admin',
    data() {
      return {
        isLoading: false,
      }
    },
    // methods: {
    //   singout() {
    //     const _this = this
    //     localStorage.setItem('userId', '')
    //   }
    // }
  }
</script>

<style lang='scss' scope>
  body {
    font-size: 1rem;
  }

  .nav-link {
    font-weight: 500;
    margin-right: 4px;
    color: #ffffff;
  }

  [role="main"] {
    // min-height: 100vh;
    padding-top: 48px; /* Space for fixed navbar */
  }
</style>