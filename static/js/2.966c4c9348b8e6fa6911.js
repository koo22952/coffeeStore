webpackJsonp([2],{"/bQp":function(t,e){t.exports={}},"3fs2":function(t,e,r){var n=r("RY/4"),i=r("dSzd")("iterator"),s=r("/bQp");t.exports=r("FeBl").getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||s[n(t)]}},"5zde":function(t,e,r){r("zQR9"),r("qyJz"),t.exports=r("FeBl").Array.from},"880/":function(t,e,r){t.exports=r("hJx8")},"8NO8":function(t,e){},"94VQ":function(t,e,r){"use strict";var n=r("Yobk"),i=r("X8DO"),s=r("e6n0"),o={};r("hJx8")(o,r("dSzd")("iterator"),function(){return this}),t.exports=function(t,e,r){t.prototype=n(o,{next:i(1,r)}),s(t,e+" Iterator")}},Mhyx:function(t,e,r){var n=r("/bQp"),i=r("dSzd")("iterator"),s=Array.prototype;t.exports=function(t){return void 0!==t&&(n.Array===t||s[i]===t)}},PJ24:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("c/Tr"),i=r.n(n),s=r("woOf"),o=r.n(s),a=r("7t+N"),c=r.n(a),u={name:"confirm",data:function(){return{order:{},products:[],user:{},isLoading:!1}},computed:{newProductsList:function(){return this.products.map(function(t){var e=o()({},t);return e.price,void 0!=e.sale_price&&""!=e.sale_price||(e.sale_price=e.origin_price),parseInt(e.origin_price)>parseInt(e.sale_price)?e.price=e.sale_price:e.price=e.origin_price,e})},Totalprice:function(){return i()(this.newProductsList).reduce(function(t,e){return t+parseInt(e.price,10)},0)}},methods:{goto:function(){this.$router.push("/")},getOrder:function(){var t=this;t.isLoading=!0;var e="https://nameless-forest-65777.herokuapp.com/customerorder/"+this.$route.params.id;t.$http.get(e).then(function(e){t.order=e.data,t.products=e.data.products,t.user=e.data.user,t.isLoading=!1})},checkpaid:function(){var t=this;t.$bus.$emit("fakecartlength",{});var e="https://nameless-forest-65777.herokuapp.com/customerorder/"+this.$route.params.id;t.$http.patch(e,{is_paid:!0}).then(function(e){t.getOrder()}),c()("html, body").animate({scrollTop:0},600)},delAllCart:function(){var t=this,e="https://nameless-forest-65777.herokuapp.com/cart/";t.$http.get(e).then(function(r){r.data.forEach(function(r){var n=r.id,i=e+"/"+n;t.$http.delete(i).then(function(e){t.$bus.$emit("fakecartlength",{})})})})}},created:function(){this.getOrder(),this.delAllCart()}},l={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("loading",{attrs:{loader:"bars",color:"#32312f",active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),t._v(" "),r("div",{staticClass:"container top"},[r("div",{staticClass:"checkout-nav"},[t._m(0),t._v(" "),t._m(1),t._v(" "),r("div",{staticClass:"step"},[r("span",{staticClass:"badge line_thr",class:{active:t.order.is_paid}},[r("span",{staticClass:"text"},[t._v("3")])]),t._v(" "),r("span",[t._v("訂單完成")])])])]),t._v(" "),r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"row justify-content-center mt-5"},[r("div",{staticClass:"col-lg-8 col-md-10"},[t.order.is_paid?t._e():r("table",{staticClass:"table"},[t._m(2),t._v(" "),r("tbody",[t._l(t.newProductsList,function(e,n){return r("tr",{key:e.id},[r("th",[r("img",{staticClass:"align-middle d-md-inline d-none",staticStyle:{"max-width":"100px"},attrs:{src:e.imageUrl,alt:""}})]),t._v(" "),r("td",{staticClass:"align-middle"},[t._v(t._s(e.title))]),t._v(" "),r("td",{staticClass:"align-middle text-center"},[t._v(t._s(e.qty))]),t._v(" "),r("td",{staticClass:"align-middle text-right"},[t._v(t._s(t._f("currency")(e.qty*e.price)))])])}),t._v(" "),r("tr",[r("td",{staticClass:"text-right align-bottom",attrs:{colspan:"3"}},[t._v("合計")]),t._v(" "),r("td",{staticClass:"text-right"},[r("strong",{staticClass:"h4"},[t._v(t._s(t._f("currency")(t.Totalprice)))])])])],2)]),t._v(" "),t.order.is_paid?r("h3",{staticClass:"thank"},[t._v("Thank you 感謝您的購買")]):t._e(),t._v(" "),r("form",{on:{submit:function(e){return e.preventDefault(),t.checkpaid(e)}}},[r("h4",{staticClass:"text-center p-3"},[t._v("訂單資料")]),t._v(" "),r("table",{staticClass:"table"},[r("tbody",[r("tr",[r("th",{attrs:{width:"30%"}},[t._v("Email")]),t._v(" "),r("td",[t._v(t._s(t.user.email))])]),t._v(" "),r("tr",[r("th",[t._v("姓名")]),t._v(" "),r("td",[t._v(t._s(t.user.name))])]),t._v(" "),r("tr",[r("th",[t._v("電話")]),t._v(" "),r("td",[t._v(t._s(t.user.tel))])]),t._v(" "),r("tr",[r("th",[t._v("地址")]),t._v(" "),r("td",[t._v(t._s(t.user.address))])]),t._v(" "),r("tr",[r("th",[t._v("付款狀態")]),t._v(" "),t.order.is_paid?r("td",{staticClass:"text-success font-weight-bold"},[t._v("已付款")]):r("td",{staticClass:"text-danger font-weight-bold"},[t._v("尚未付款")])])])]),t._v(" "),r("div",{staticClass:"text-center"},[t.order.is_paid?r("button",{staticClass:"btn btn-btncolor w-100",on:{click:t.goto}},[t._v("再去逛逛")]):r("button",{staticClass:"btn btn-btncolor w-100"},[t._v("確認付款")])])])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"step",attrs:{href:"#"}},[e("span",{staticClass:"badge line_one active"},[e("span",{staticClass:"text"},[this._v("1")])]),this._v(" "),e("span",[this._v("購物車")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"step"},[e("span",{staticClass:"badge active"},[e("span",{staticClass:"text"},[this._v("2")])]),this._v(" "),e("span",[this._v("訂單確認")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}}),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("商品名稱")]),this._v(" "),e("th",{attrs:{scope:"col",width:"60px"}},[this._v("數量")]),this._v(" "),e("th",{staticClass:"text-right",attrs:{scope:"col"}},[this._v("小記")])])])}]};var d=r("VU/8")(u,l,!1,function(t){r("8NO8")},"data-v-79438df9",null);e.default=d.exports},PzxK:function(t,e,r){var n=r("D2L2"),i=r("sB3e"),s=r("ax3d")("IE_PROTO"),o=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),n(t,s)?t[s]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?o:null}},RPLV:function(t,e,r){var n=r("7KvD").document;t.exports=n&&n.documentElement},"RY/4":function(t,e,r){var n=r("R9M2"),i=r("dSzd")("toStringTag"),s="Arguments"==n(function(){return arguments}());t.exports=function(t){var e,r,o;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),i))?r:s?n(e):"Object"==(o=n(e))&&"function"==typeof e.callee?"Arguments":o}},Yobk:function(t,e,r){var n=r("77Pl"),i=r("qio6"),s=r("xnc9"),o=r("ax3d")("IE_PROTO"),a=function(){},c=function(){var t,e=r("ON07")("iframe"),n=s.length;for(e.style.display="none",r("RPLV").appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;n--;)delete c.prototype[s[n]];return c()};t.exports=Object.create||function(t,e){var r;return null!==t?(a.prototype=n(t),r=new a,a.prototype=null,r[o]=t):r=c(),void 0===e?r:i(r,e)}},"c/Tr":function(t,e,r){t.exports={default:r("5zde"),__esModule:!0}},dSzd:function(t,e,r){var n=r("e8AB")("wks"),i=r("3Eo+"),s=r("7KvD").Symbol,o="function"==typeof s;(t.exports=function(t){return n[t]||(n[t]=o&&s[t]||(o?s:i)("Symbol."+t))}).store=n},dY0y:function(t,e,r){var n=r("dSzd")("iterator"),i=!1;try{var s=[7][n]();s.return=function(){i=!0},Array.from(s,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!i)return!1;var r=!1;try{var s=[7],o=s[n]();o.next=function(){return{done:r=!0}},s[n]=function(){return o},t(s)}catch(t){}return r}},e6n0:function(t,e,r){var n=r("evD5").f,i=r("D2L2"),s=r("dSzd")("toStringTag");t.exports=function(t,e,r){t&&!i(t=r?t:t.prototype,s)&&n(t,s,{configurable:!0,value:e})}},fBQ2:function(t,e,r){"use strict";var n=r("evD5"),i=r("X8DO");t.exports=function(t,e,r){e in t?n.f(t,e,i(0,r)):t[e]=r}},h65t:function(t,e,r){var n=r("UuGF"),i=r("52gC");t.exports=function(t){return function(e,r){var s,o,a=String(i(e)),c=n(r),u=a.length;return c<0||c>=u?t?"":void 0:(s=a.charCodeAt(c))<55296||s>56319||c+1===u||(o=a.charCodeAt(c+1))<56320||o>57343?t?a.charAt(c):s:t?a.slice(c,c+2):o-56320+(s-55296<<10)+65536}}},msXi:function(t,e,r){var n=r("77Pl");t.exports=function(t,e,r,i){try{return i?e(n(r)[0],r[1]):e(r)}catch(e){var s=t.return;throw void 0!==s&&n(s.call(t)),e}}},qio6:function(t,e,r){var n=r("evD5"),i=r("77Pl"),s=r("lktj");t.exports=r("+E39")?Object.defineProperties:function(t,e){i(t);for(var r,o=s(e),a=o.length,c=0;a>c;)n.f(t,r=o[c++],e[r]);return t}},qyJz:function(t,e,r){"use strict";var n=r("+ZMJ"),i=r("kM2E"),s=r("sB3e"),o=r("msXi"),a=r("Mhyx"),c=r("QRG4"),u=r("fBQ2"),l=r("3fs2");i(i.S+i.F*!r("dY0y")(function(t){Array.from(t)}),"Array",{from:function(t){var e,r,i,d,v=s(t),f="function"==typeof this?this:Array,p=arguments.length,h=p>1?arguments[1]:void 0,_=void 0!==h,g=0,m=l(v);if(_&&(h=n(h,p>2?arguments[2]:void 0,2)),void 0==m||f==Array&&a(m))for(r=new f(e=c(v.length));e>g;g++)u(r,g,_?h(v[g],g):v[g]);else for(d=m.call(v),r=new f;!(i=d.next()).done;g++)u(r,g,_?o(d,h,[i.value,g],!0):i.value);return r.length=g,r}})},"vIB/":function(t,e,r){"use strict";var n=r("O4g8"),i=r("kM2E"),s=r("880/"),o=r("hJx8"),a=r("/bQp"),c=r("94VQ"),u=r("e6n0"),l=r("PzxK"),d=r("dSzd")("iterator"),v=!([].keys&&"next"in[].keys()),f=function(){return this};t.exports=function(t,e,r,p,h,_,g){c(r,e,p);var m,y,x,b=function(t){if(!v&&t in k)return k[t];switch(t){case"keys":case"values":return function(){return new r(this,t)}}return function(){return new r(this,t)}},C=e+" Iterator",w="values"==h,O=!1,k=t.prototype,S=k[d]||k["@@iterator"]||h&&k[h],A=S||b(h),P=h?w?b("entries"):A:void 0,z="Array"==e&&k.entries||S;if(z&&(x=l(z.call(new t)))!==Object.prototype&&x.next&&(u(x,C,!0),n||"function"==typeof x[d]||o(x,d,f)),w&&S&&"values"!==S.name&&(O=!0,A=function(){return S.call(this)}),n&&!g||!v&&!O&&k[d]||o(k,d,A),a[e]=A,a[C]=f,h)if(m={values:w?A:b("values"),keys:_?A:b("keys"),entries:P},g)for(y in m)y in k||s(k,y,m[y]);else i(i.P+i.F*(v||O),e,m);return m}},zQR9:function(t,e,r){"use strict";var n=r("h65t")(!0);r("vIB/")(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,r=this._i;return r>=e.length?{value:void 0,done:!0}:(t=n(e,r),this._i+=t.length,{value:t,done:!1})})}});
//# sourceMappingURL=2.966c4c9348b8e6fa6911.js.map