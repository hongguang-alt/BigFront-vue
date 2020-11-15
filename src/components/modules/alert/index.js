import AlertComponent from './Alert'

const Alert = {}


Alert.install = (Vue) => {
    const AlertConstructor = Vue.extend(AlertComponent)
    const instance = new AlertConstructor()
    //实例挂载到一个div标签上面
    instance.$mount(document.createElement('div'))
    //这样挂载的是整个页面的下面
    document.body.appendChild(instance.$el)

    //添加一个实例方法
    Vue.prototype.$alert = ({
        AType,
        message,
        onClose
    }) => {
        instance.AType = AType
        instance.message = message
        instance.onClose = onClose
        instance.isShow = true
    }
}

export default Alert