import TableFilter from '../packages/table-filter/index.js'
import TableView from '../packages/table-view/index.js'
import Loading from '../packages/loading/index.js'
import ExportButton from '../packages/export-button/index.js'
import Pagination from '../packages/pagination/index.js'
import Chart from '../packages/chart/index.js'
import Upload from '../packages/upload/index.js'
import PageForm from '../packages/page-form/index.js'
import PageDialog from '../packages/page-dialog/index.js'
import DataView from '../packages/data-view/index.js'
import Line from '../packages/charts/Line/index.js'
import Pie from '../packages/charts/Pie/index.js'
import Bar from '../packages/charts/Bar/index.js'
import BaseChart from '../packages/charts/index.js'

import '../packages/styles/index.css'

const components = [
    BaseChart,
    Line,
    Pie,
    Bar,
    PageDialog,
    PageForm,
    Chart,
    Pagination,
    ExportButton,
    TableFilter,
    TableView,
    Loading,
    Upload,
    DataView,
]

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        component.opts = opts
        Vue.component(component.name, component)
    })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default {
    version: process.env.Version || 'debug',
    install,
}
