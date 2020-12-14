import DataView from './data-view';

/* istanbul ignore next */
DataView.install = function(Vue) {
    Vue.component(DataView.name, DataView);
};

export default DataView;
