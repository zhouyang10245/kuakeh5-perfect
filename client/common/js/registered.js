import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

export function autoLoadingGlobalComponent () {
    const requireComponent = require.context(
        './../../plugins', // 当前基础组件相对与main.js的相对位置
        false, // 是否查询子目录
        /[a-z]\w+\.(vue|js)$/
    );
    let comments = {}
    requireComponent.keys().forEach(fileName => {
        const componentConfig = requireComponent(fileName);
        comments[componentConfig.default.name] = componentConfig.default
        const componentName = upperFirst(
            camelCase(
                fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
            )
        );  
        // 全局注册组件
        Vue.component(
            componentName,
            componentConfig.default || componentConfig
        );
    });
    Vue.prototype._qk_register_components_object = comments
}
