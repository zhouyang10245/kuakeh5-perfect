<template>
    <div>
        <edit-shape v-for="item in elements"
                    :key="item.uuid"
                    :uuid="item.uuid"
                    :defaultStyle="item.commonStyle"
                    :style="getCommonStyle(item.commonStyle)"
                    @handleElementClick="handleElementClick($event, item.uuid)"
                    @resize="handleElementResize"
                    :active="item.uuid === activeElementUUID">
            <div v-if="item.isGroup"
                 class='element-menu-box'>
                <EditItem :elements='item.children'></EditItem>
            </div>
            <component v-else
                       :is="item.elName"
                       class="element-on-edit-pane"
                       v-bind="{...item.propsValue, value: item.value}">
            </component>
        </edit-shape>
    </div>
</template>
<script>
import editShape from '@/components/edit-shape'
import editorProjectConfig from '@client/pages/editor/DataModel'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'EditItem',
    props: {
        elements: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data () {
        return {
            getCommonStyle: editorProjectConfig.getCommonStyle,
        }
    },
    created () {
    },
    components: {
        // 批量注册qk组件
        // ..._qk_register_components_object,
        // 画板组件
        [editShape.name]: editShape
    },
    computed: {
        ...mapState({
            projectData: state => state.editor.projectData,
            activePageUUID: state => state.editor.activePageUUID,
            activeElementUUID: state => state.editor.activeElementUUID
        }),
        ...mapGetters([
            'currentPageIndex',
            'activeElementIndex',
            'activeElement',
            'activePage'
        ])
    },
    methods: {
        /**
         * 元素被点击
         * @param uuid
         */
        handleElementClick (e, uuid) {
            this.$store.dispatch('setActiveElementUUID', uuid);
        },
        /**
         * 移动改变元素大小定位
         * @param pos 当pos有值表示移动中需要实时同步样式变化，pos为undefind时则表示移动结束，记一次历史纪录
         * 鼠标移动完成时才记入历史纪录
         */
        handleElementResize (pos) {
            let self = this

            if (!pos) {
                this.$store.dispatch('addHistoryCache')
                return;
            }

            function getPageIndex (list) {
                var data = null

                list.forEach((ele) => {
                    if (ele.uuid == self.activeElementUUID) {
                        data = ele
                    } else if (ele.children) {
                        data = data ? data : getPageIndex(ele.children)
                    }
                })
                return data
            }
            let activeElement = getPageIndex(this.projectData.pages[this.currentPageIndex].elements)
            let scale = {
                width:  pos.width ? pos.width / activeElement.commonStyle.width : 1,
                height:  pos.height ? pos.height / activeElement.commonStyle.height : 1
            }
            activeElement.commonStyle.left = pos.left
            // 更新元素commonStyle
            activeElement.commonStyle = {
                ...pos
            }
            if (activeElement.children) {
                activeElement.children.forEach(ele => {
                    ele.commonStyle.width = ele.commonStyle.width * scale.width
                    ele.commonStyle.height = ele.commonStyle.height * scale.height
                })
            }
        },
    }
}
</script>