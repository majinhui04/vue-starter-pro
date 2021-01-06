const modules = {}
const interceptors = []
const requireContext = require.context(
    '@/api/interceptors/modules',
    false,
    /\.js/,
)
const requireAll = context => {
    context.keys().forEach(key => {
        modules[key] = requireContext(key).default || requireContext(key)
    })
}

requireAll(requireContext)

Object.keys(modules).forEach(key => {
    let target = modules[key]
    Object.keys(target).forEach(name => {
        let result = target[name]

        interceptors.push(result)
    })
})
export default interceptors
