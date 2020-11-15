import CofirmComponent from './Confirm.vue'

const Confirm = {}

Confirm.install = (Vue) => {
    const ConfirmConstructor = Vue.extend(CofirmComponent)
    const instance = new ConfirmConstructor()
    let div = document.createElement('div')
    instance.$mount(div)
    document.body.appendChild(instance.$el)

    Vue.prototype.$confirm = function ({
        message,
        onOk,
        onCancel
    }) {
        instance.message = onOk
        instance.onCancel = onCancel
        instance.message = message
        instance.isShow = true
    }
}

export default Confirm