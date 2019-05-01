# coffeeStore 電商網站

![](https://upload.cc/i1/2019/05/02/Z9zlcJ.png)

## RWD

![](https://upload.cc/i1/2019/05/02/pXU0VD.png)


## Demo
[https://koo22952.github.io/coffeeStore/dist/#/](https://koo22952.github.io/coffeeStore/dist/#/)

## 簡介
此為前端練習作品，主要功能為：

+ 前台: 所有商品、商品分類、以及商品細項展示，購物車功能、下單、結帳資訊、會員登入註冊、管理員登入等。
+ 後台: 產品管理（新增/修改/刪除）、訂單管理。
+ API: JSON Server 自行設定（已經放到heroku） 

### 主要練習
+ VueCli 2
+ VueRouter
+ Webpack
+ 元件概念
+ API操作
+ JSON Server使用
+ RWD
+ 前台手刻css
+ Bootstrap 自定義元件設計

## 使用外掛
+ [bootstrap](https://bootstrap.hexschool.com/) 
+ [vue-axios](https://www.npmjs.com/package/vue-axios)
+ [swiper](http://idangero.us/swiper/) (圖片滑動的slideshow)
+ [VeeValidate](https://baianat.github.io/vee-validate/) (驗證)

## 內容介紹
### loading
過場效果

![](https://upload.cc/i1/2019/05/02/rea8M2.png)

### 熱銷商品
+ 不會出現SALE的商品,最多出現三筆

![](https://upload.cc/i1/2019/05/02/JHoDpR.png)

### 商品過濾
+ 使用filter 將商品過濾出來,並自製頁籤 

![](https://upload.cc/i1/2019/05/02/xivOHV.png)

### 詳細內容
+ router帶入商品唯一ID，顯示單一商品詳細介紹，選擇數量加入購物車 

![](https://upload.cc/i1/2019/05/02/HZy3uG.png)

### 購物車
+ 利用 event bus 達到元件同步更新資料，購物車旁邊數字表示 

![](https://upload.cc/i1/2019/05/02/KUxZVt.png)

### 結帳資訊
+ 顯示購物車細節，有收合選項，自動帶出商品合計金額；使用操作的步驟說明

![](https://upload.cc/i1/2019/05/02/CAYEjU.png)
![](https://upload.cc/i1/2019/05/02/qxMbTc.png)

### 表單驗證
+ 表單基本檢查

![](https://upload.cc/i1/2019/05/02/BSnJX3.png)

### 訂單資訊
+ 訂單成立後，router帶入訂單唯一ID，顯示訂單資訊，購物車同步清空

![](https://upload.cc/i1/2019/05/02/c3genW.png)

### 送出訂單
+ 結帳後送出訂單，結帳狀態更改為已付款
+ 上方圈圈顯示黑色

![](https://upload.cc/i1/2019/05/02/sQIek8.png)

### 登入/註冊
+ 管理者登入可進入後台，一般會員無法進入
+ 登入過後登入的小圖示會變成門表示登出

![](https://upload.cc/i1/2019/05/02/PdbvI4.png)
![](https://upload.cc/i1/2019/05/02/Unq5xh.png)

### 後台內容介紹
後台主要使用bootstrap無RWD，商品的新增刪除修改及訂單的查詢

![](https://upload.cc/i1/2019/05/02/T921VJ.png)

### -------

此次架設一個電商網站的作品，從開始設計網頁圖，一直到自製API，API的串接
要注意的細節非常之多，正式上線的電商，還真的不是蓋的！

還有金流的串連、API的等等等的



