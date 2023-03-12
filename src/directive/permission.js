import store from "../store"

function hasPermission(el = false,value){
    if(!Array.isArray(value)){
        throw new Error('需要配置权限')
    }
    let hasAuth = value.findIndex(item =>store.state.ruleNames.includes(item)) != -1
    if(el && !hasAuth){
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
}

export default {
    install(app){
        app.directive('permission',{
            mounted(el,binding){
                // console.log(el,binding);
                hasPermission(el,binding.value)
            }
        })
    }
}