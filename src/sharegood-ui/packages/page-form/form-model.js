function trim(x) {
    if (x && typeof x === 'string') {
        return x.replace(/^\s+|\s+$/gm, '')
    } else if (x && typeof x === 'number') {
        return Number(x.toString().replace(/^\s+|\s+$/gm, ''))
    } else {
        return x
    }
}

export default {
    props: {
        name: {
            type: String,
            default: '',
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        label: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            currentValue: this.value,
        }
    },
    methods: {
        onInputEvent(value) {
            const dataList = this.dataList || []
            const target = dataList.filter(item => item.value == value)
            this.onChange &&
                this.onChange({
                    name: this.name,
                    value: value,
                    option: target[0],
                })
            console.log('onInputEvent', this.name, value)
            this.$emit('input', this.name, trim(value), target[0])
        },
        reset() {
            this.currentValue = ''
        },
    },
    watch: {
        value(val) {
            this.currentValue = trim(val)
            //this.handleChange && this.handleChange(this.currentValue)
            console.log(12345, this.currentValue)
        },
    },
}
