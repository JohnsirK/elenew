// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入vuex
import store from '@/store/index.js'
Vue.config.productionTip = false

//引入fastclick,解决移动端300ms
import fastClick from 'fastclick'
fastClick.attach(document.body)

//按需引入vantUI组件，并挂载vue中
import {
	//按钮
	Button,
	//Icon图标组件
	Icon,
	//NavBar 导航栏
	NavBar,
	//toast提示
	Toast,
	//切换
	Tabbar,
	// 底部切换
	TabbarItem,
	//swiper 轮播
	Swipe,
	// swiper 轮播
	SwipeItem,
	//tag标记
	Tag,
	//Rate 星级评分
	Rate,
	//数据加载提示
	Loading,
	//图片懒加载
	Lazyload,
	//索引栏
	IndexBar,
	IndexAnchor,
	//单元格
	Cell,
	CellGroup,
	//搜索
	Search,
	//下拉菜单
	DropdownMenu,
	DropdownItem,
	//粘性布局
	Sticky,
	//分类选择
	TreeSelect,
	//NoticeBar通知栏
	NoticeBar,
	//tab标签页
	Tab,
	Tabs,
	//图片预览
	ImagePreview,
	//遮罩
	Overlay,
	//上拉菜单
	ActionSheet,
	//复选框组
	Checkbox,
	CheckboxGroup,
	//输入框
	Field,
	//弹出层
	Popup,
	//省市区
	Area,
	//单选
	RadioGroup,
	Radio
	
} from 'vant'
//挂载到Vue
Vue.use(Button)
	 .use(Icon)
	 .use(NavBar)
	 .use(Toast)
	 .use(Tabbar)
	 .use(TabbarItem)
	 .use(Swipe)
	 .use(SwipeItem)
	 .use(Tag)
	 .use(Rate)
	 .use(Loading)
	 .use(Lazyload)
	 .use(IndexBar)
	 .use(IndexAnchor)
	 .use(Cell)
	 .use(CellGroup)
	 .use(Search)
	 .use(DropdownMenu)
	 .use(DropdownItem)
	 .use(Sticky)
	 .use(TreeSelect)
	 .use(NoticeBar)
	 .use(Tab)
	 .use(Tabs)
	 .use(ImagePreview)
	 .use(Overlay)
	 .use(ActionSheet)
	 .use(Checkbox)
	 .use(CheckboxGroup)
	 .use(Field)
	 .use(Popup)
	 .use(Area)
	 .use(RadioGroup)
	 .use(Radio)
	 
//全局引入css文件
import '@/assets/css/reset.css'

//全局引入swiper，之所以不用vant swipe是因为有移动端误触问题
import 'swiper/dist/css/swiper.min.css'

//vue占位插件
import VueOccupy from 'vue-occupy'
Vue.use(VueOccupy)

 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //此处将vuex注册到vue实例里
  store,
  components: { App },
  template: '<App/>'
})
