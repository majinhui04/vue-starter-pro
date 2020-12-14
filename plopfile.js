const componentGenerator = require('./plop-templates/component/prompt')
const entryGenerator = require('./plop-templates/entry/prompt')
const spaGenerator = require('./plop-templates/spa/prompt')

module.exports = function(plop) {
    plop.setHelper('formatPath', function(name) {
        if (name === 'index') {
            return ''
        } else {
            return name
        }
    })
    plop.setGenerator('spa', spaGenerator)
    plop.setGenerator('entry', entryGenerator)
    plop.setGenerator('component', componentGenerator)
}
