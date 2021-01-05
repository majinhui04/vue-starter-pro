const modules = {}
const apis = {}
const requireContext = require.context('@/api/modules', false, /\.js/)
const requireAll = context => {
    context.keys().forEach(key => {
        modules[key] = requireContext(key).default || requireContext(key)
    })
}

requireAll(requireContext)

Object.keys(modules).forEach(key => {
    let target = modules[key]
    Object.keys(target).forEach(name => {
        let cb = target[name]

        apis[name] = cb
    })
})

export default apis
