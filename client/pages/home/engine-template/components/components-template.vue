<template>
    <div class="quark-element-wrapper"
         @click="handleClick">
        <div v-if="element.isGroup"
             class='element-menu-box'
             :style='styleObj'>
            <ComponentsTemplate v-for="(item, index) in element.children"
                                :key="index"
                                :element="item"
                                :styleObj="getCommonStyle(item.commonStyle, scalingRatio)">
            </ComponentsTemplate>
        </div>
        <!-- <component v-else
                   :is="item.elName"
                   class="element-on-edit-pane"
                   v-bind="{...item.propsValue, value: item.value}">
        </component> -->
        <component v-else
                   :style='styleObj'
                   :is="element.elName"
                   class="quark-element"
                   v-bind.sync="element.propsValue"
                   @changDara='changDara' > 
        </component>
    </div>
</template>

<script>
// import {_qk_register_components_object} from '@client/plugins/index'
import editorProjectConfig from '@client/pages/editor/DataModel'
import runAnimations from '@client/common/js/runAnimations'
import elementEvents from '@client/mixins/elementEvents'

export default {
    name: "ComponentsTemplate",
    components: {
        // 批量注册qk组件
        // ..._qk_register_components_object,
    },
    props: {
        element: {
            type: Object,
            require: true
        },
        styleObj: {
            type: Object
        }
    },
    data () {
        return {
            getCommonStyle: editorProjectConfig.getCommonStyle,
            scalingRatio:1
        }
    },
    mixins: [elementEvents],
    mounted () {
        let cssText = this.$el.style.cssText;
        let animations = this.element.animations || [];
        runAnimations(this.$el, animations, false, () => {
            this.$el.style.cssText = cssText
        })
    },
    methods: {
        /**
         * 按钮点击事件
         * @param eventsData
         */
        async handleClick () {
            let eventsData = this.element.events
            let element = this.element

            for (let i = 0, len = eventsData.length; i < len; i++) {
                if (this['_event_' + eventsData[i].type]) {
                    await this['_event_' + eventsData[i].type](eventsData[i], element, this.pageData)
                }
            }
        },
        changDara (value) {
            this.element.propsValue.value = value
        }
    }
}
</script>
