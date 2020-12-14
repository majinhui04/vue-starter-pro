<template>
    <BaseChart
        ref="chart"
        :config="config"
        :getOption="getOption"
        :option="option"
    ></BaseChart>
</template>
<script>
import option from './option'
import getOption from './getOption'
import BaseChart from '../BaseChart'
import mix from '../lib/mix'

export default {
    name: 'SgBar',
    mixins: [mix],
    data() {
        return {
            option,
            getOption,
        }
    },
    mounted() {},
}
</script>
