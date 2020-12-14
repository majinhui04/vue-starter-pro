// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm

function clone(objectToBeCloned) {
    // Basis.
    if (!(objectToBeCloned instanceof Object)) {
        return objectToBeCloned
    }

    var objectClone

    // Filter out special objects.
    var Constructor = objectToBeCloned.constructor
    objectClone = new Constructor()

    // Clone each property.
    for (var prop in objectToBeCloned) {
        objectClone[prop] = clone(objectToBeCloned[prop])
    }

    return objectClone
}

function DDM() {}
DDM.originObject = {}
DDM.from = function(originObject) {
    this.originObject = {}
    this.originObject = clone(originObject)
    return this
}
// DDM.map = function(keyArray) {
//     const result = {}
//     keyArray.forEach(key => {
//         result[key] = this.originObject[key]
//     })
//     this.originObject = result
//     return this
// }
DDM.end = function() {
    return this.originObject
}
DDM.add = function(field, value) {
    this.originObject[field] = value
    return this
}
DDM.remove = function(field) {
    if (field.length) {
        field.forEach(key => {
            delete this.originObject[key]
        })
    } else {
        delete this.originObject[field]
    }

    return this
}
DDM.replace = function(originField, newField, defaultValue) {
    if (typeof originField === 'object') {
        defaultValue = newField
        //console.log(this.originObject, originField)
        Object.keys(originField).forEach(key => {
            let newKey = originField[key]
            let value = this.originObject[key]

            this.originObject[newKey] = value || defaultValue
            delete this.originObject[key]
        })
        return this
    } else {
        let value = this.originObject[originField]
        this.originObject[newField] = value || defaultValue
        delete this.originObject[originField]
        return this
    }
}
DDM.get = function(keyArray) {
    const result = {}
    keyArray.forEach(key => {
        result[key] = this.originObject[key]
    })
    this.originObject = result
    return this
}
DDM.to = function(target) {
    Object.keys(this.originObject).forEach(key => {
        target[key] = this.originObject[key]
    })
    return this
}
export default DDM
