import PopComponent from './Pop.vue'

const Pop = {}

Pop.install = (Vue) => {
    const PopConstructor = Vue.extend(PopComponent)
    const instance = new PopConstructor()
    let div = document.createElement('div')
    instance.$mount(div)
    document.body.appendChild(instance.$el)

    Vue.prototype.$pop = function ({
        message,
        type
    }) {
        instance.isShow = true
        instance.message = message
        instance.type = type
    }
}

export default Pop