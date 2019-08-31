//localStorage和sessionStorage
export default{
	//根据参数name传进来名称的值
	getSession:function(name){
		if(!name){
			return
		}
		return JSON.parse(window.sessionStorage.getItem(name))
	},
	setSession:function(name,content){
		if(!name){
			return
		}
		if(content !== 'String'){
			content = JSON.stringify(content)
		}
		window.sessionStorage.setItem(name,content)
	},
	removeSession:function(name){
		if(!name){
			return
		}
		return window.sessionStorage.removeItem(name)
	},
	getLocal:function(name){
		if(!name){
			return
		}
		return JSON.parse(window.localStorage.getItem(name))
	},
	setLocal:function(name,content){
		if(!name){
			return 
		}
		if(content !== 'String'){
			content = JSON.stringify(content)
		}
		window.localStorage.setItem(name,content)
	},
	removeLocal:function(name){
		if(!name){
			return 
		}
		return window.localStorage.removeItem(name)
	}
}