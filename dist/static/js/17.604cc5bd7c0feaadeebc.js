webpackJsonp([17],{"0wiy":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Xxa5"),s=a.n(r),n=a("exGp"),i=a.n(n),o=a("Dd8w"),l=a.n(o),c=a("WsNp"),u=a("P9l9"),d=a("NYxO"),_={data:function(){return{imgUrl:"https://elm.cangdu.org/img/",orderList:[]}},components:{allHeader:c.a},computed:l()({},Object(d.d)(["userinfo"])),methods:{order:function(){var t=this;return i()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.$toast.loading({mask:!0,message:"订单加载中,请稍后"}),e.next=3,Object(u.q)(t.userinfo.user_id,20,0);case 3:(a=e.sent)&&(t.orderList=a,t.$toast.clear());case 5:case"end":return e.stop()}},e,t)}))()}},mounted:function(){this.order()}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("all-header",[a("font",{attrs:{slot:"tl"},slot:"tl"},[t._v("\n\t\t\t我的订单\n\t\t")])],1),t._v(" "),a("div",{staticClass:"content p-b50"},[a("ul",{staticClass:"ordersList"},t._l(t.orderList,function(e,r){return a("li",{key:r},[a("router-link",{attrs:{to:{path:"/order/orderInfo/",query:{id:e.id}}}},[a("h3",[t._v("\n\t\t\t\t\t"+t._s(e.restaurant_name)+"\n\t\t\t\t\t"),a("span",[t._v("订单状态："),a("font",{style:{color:"#"+e.status_bar.color}},[t._v(t._s(e.status_bar.title))])],1)]),t._v(" "),a("div",{staticClass:"imgTxt"},[a("span",{staticClass:"img"},[a("img",{attrs:{src:t.imgUrl+e.restaurant_image_url,alt:""}})]),t._v(" "),a("div",{staticClass:"txt"},[a("h4",[t._v("\n\t\t\t\t\t\t\t下单时间："+t._s(e.formatted_created_at)+"\n\t\t\t\t\t\t")]),t._v(" "),a("h5",[t._v("\n\t\t\t\t\t\t\t￥"+t._s(e.total_amount)+"\n\t\t\t\t\t\t")])]),t._v(" "),a("van-icon",{staticClass:"icondel",attrs:{name:"delete"}})],1),t._v(" "),a("p",[a("a",{attrs:{href:""}},[t._v("再来一单")])])])],1)}),0),t._v(" "),a("transition",{attrs:{name:"van-slide-left",mode:"out-in"}},[a("router-view")],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(_,v,!1,function(t){a("kUYH")},"data-v-672a4e3a",null);e.default=m.exports},kUYH:function(t,e){}});