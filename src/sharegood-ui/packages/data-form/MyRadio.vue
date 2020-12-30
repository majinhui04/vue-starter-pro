<template>
    <div class="sg-form-field">
        <el-radio-group v-model="currentValue" @change="onInputEvent">
            <el-radio
                :label="item.value"
                v-for="item in dataList"
                :key="item.value"
                >{{ item.label }}</el-radio
            >
        </el-radio-group>
    </div>
</template>

<script>
import formMixins from './form-model'

export default {
    name: 'Radio',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        options: {
            type: [Array, Function],
            default() {
                return []
            },
        },
    },
    mixins: [formMixins],
    watch: {
        options(val) {
            this.dataList = val
        },
    },
    mounted() {
        if (Array.isArray(this.options)) {
            this.initOptions(this.options)
        } else {
            const result = this.options()
            if (result.then) {
                result
                    .then(list => {
                        this.initOptions(list)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            } else {
                this.initOptions(result)
            }
        }
    },
    data() {
        return {
            dataList: [],
            currentValue: this.value,
        }
    },
    methods: {
        initOptions(options) {
            this.dataList = options
        },
    },
}
</script>
