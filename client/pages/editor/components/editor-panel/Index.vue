<template>
    <div class="editor-pane"
         @click="handleClickCanvas"
         @keyup.esc="handleKeyup">
        <div class="editor-pane-inner">
            <div class="editor-main"
                 :style="{transform: 'scale('+ projectData.scale +')', width: projectData.width + 'px', height: projectData.height + 'px', transformOrigin: '0 0 0' }">
                <div class="page-preview-wrapper"
                     ref="canvas-panel"
                     id="canvas-panel"
                     @dragover.prevent="handleDragOver($event)"
                     @drop='handleDrop($event)'
                     :style="getCommonStyle(activePage.commonStyle)">
                    <!--页面组件列表展示-->
                    <EditShapeItem :elements='activePage.elements'></EditShapeItem>
                    <!-- 框架变动组件 -->
                    <div class="edit-shape-point"
                         v-for="item in pointList"
                         :key="item"
                         @mousedown="handleMouseDownOnPoint(item)"
                         :style="getPointStyle(item)"></div>
                </div>

                <div class="page-wrapper-menu-operation menu-item-on-edit-panel"
                     :style="{transform: 'scale('+(1/scale)+')'}"
                     :class="{active: activeElementUUID}">
                    <el-tooltip v-for="(item, index) in menuOptions"
                                :key="index"
                                effect="dark"
                                :content="item.title"
                                placement="right">
                        <div class="menu-item menu-item-on-edit-panel"
                             @click="handleElementCommand(item.value)">
                            <i class="menu-item-on-edit-panel"
                               :class="[item.icon]"></i>
                        </div>
                    </el-tooltip>
                </div>
                <div class="page-wrapper-mask"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { camelCase } from 'lodash'
// import { _qk_register_components_object } from '@client/plugins/index'
// import editShape from '@/components/edit-shape'
import EditShapeItem from './item'
import editorProjectConfig from '@client/pages/editor/DataModel'
import { mapState, mapGetters } from 'vuex'
import html2canvas from 'html2canvas';

// todo 测试用
// window._qk_register_components_object = _qk_register_components_object
export default {
    props: {
        // canvas画板缩放
        scale: {
            type: Number,
            default: 1
        }
    },
    components: {
        // 批量注册qk组件
        // ..._qk_register_components_object,
        // 画板组件
        // [editShape.name]: editShape,
        EditShapeItem
    },
    data () {
        return {
            getCommonStyle: editorProjectConfig.getCommonStyle,
            menuOptions: [{
                title: '复制',
                icon: 'iconfont iconfuzhi',
                value: 'copy'
            }, {
                title: '删除',
                icon: 'iconfont iconshanchu',
                value: 'delete'
            }, {
                title: '字体放大',
                icon: 'iconfont iconzitifangda',
                value: 'fontA+'
            }, {
                title: '字体缩小',
                icon: 'iconfont iconzitisuoxiao',
                value: 'fontA-'
            }, {
                title: '字体加粗',
                icon: 'iconfont iconzitijiacu',
                value: 'fontB'
            }, {
                title: '图层上移',
                icon: 'iconfont iconziyuan1',
                value: 'layerUp'
            }, {
                title: '图层下移',
                icon: 'iconfont iconxiayiyiceng',
                value: 'layerDown'
            }, {
                title: '图层置顶',
                icon: 'iconfont iconcontrol-top',
                value: 'layerTop'
            }, {
                title: '图层置底',
                icon: 'iconfont iconcontrol-bottom',
                value: 'layerBottom'
            }],
            // l = left, t = top, r = right, b = bottom
            pointList: ['lb', 'rb'],
            // 上下左右 对应的 东南西北
            directionKey: {
                t: 'n',
                b: 's',
                l: 'w',
                r: 'e'
            }
        }
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
    created () {
        let self = this
        // 定义delete按键事件
        document.onkeydown = function (e) {
            let key = e.keyCode
            if (key == 46) {
                self.handleElementCommand("delete")
            }

        }
    },
    mounted () {

    },
    methods: {
        
        handleClickCanvas (e) {
            if (!e.target.classList.contains('element-on-edit-pane') && !e.target.classList.contains('menu-item-on-edit-panel')) {
                this.$store.dispatch('setActiveElementUUID', '');
            }
        },
        /**
         * 提供截屏作为项目主图
         */
        screenshots () {
            const el = document.querySelector('#canvas-panel')
            html2canvas(el, {
                width: 375,
                height: 667,
                proxy: '/htmltocanvas/corsproxy' // 设置跨域接口
            }).then(canvas => {
                let url = canvas.toDataURL("image/jpeg");
                this.$store.commit('updateCoverImage', url)
            });
        },
        /**
             * 获取point计算后样式
             * @param point
             * @returns {{}}
             */
        getPointStyle (point) {
            const pos = this.projectData
            const height = pos.height
            const width = pos.width
            let hasT = /t/.test(point)
            let hasB = /b/.test(point)
            let hasL = /l/.test(point)
            let hasR = /r/.test(point)
            let newLeft = hasL ? 0 : width
            let newTop = height
            const style = {
                marginLeft: (hasL || hasR) ? '-5px' : 0,
                marginTop: (hasT || hasB) ? '-5px' : 0,
                left: `${newLeft}px`,
                top: `${newTop}px`,
                cursor: point.split('').reverse().map(m => this.directionKey[m]).join('') + '-resize'
            }
            return style
        },
        /**
             * 鼠标点击可以的按钮resize事件
             * @param point
             * @param downEvent
             */
        handleMouseDownOnPoint (point) {
            let downEvent = event;
            // 抛出事件让父组件设置当前元素选中状态
            downEvent.stopPropagation()
            downEvent.preventDefault() // Let's stop this event.
            const pos = { ...this.projectData }
            let height = pos.height
            let width = pos.width
            let startX = downEvent.clientX
            let startY = downEvent.clientY
            let move = moveEvent => {
                let currX = moveEvent.clientX
                let currY = moveEvent.clientY
                let disY = currY - startY
                let disX = currX - startX
                let hasT = /t/.test(point)
                let hasB = /b/.test(point)
                let hasL = /l/.test(point)
                let hasR = /r/.test(point)
                let newHeight = +height + (hasT ? -disY : hasB ? disY : 0)
                let newWidth = +width + (hasL ? -disX : hasR ? disX : 0)

                pos.height = newHeight > 0 ? newHeight : 0
                pos.width = newWidth > 0 ? newWidth : 0
                this.projectData.width = pos.width
                this.projectData.height = pos.height
            }
            let up = () => {
                this.projectData.width = pos.width
                this.projectData.height = pos.height
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }
            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        },
        //首先把div变成可以放置的元素，即重写dragenter/dragover
        handleDragOver (e) {
            e.dataTransfer.dropEffect = 'move'// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
        },
        handleDrop (e) {
            const el = this.$refs['canvas-panel'].getBoundingClientRect()
            let props = this.getComponentProps(this.$parent.dragging.elName);

            let x = e.clientX - el.x
            let y = e.clientY - el.y
            this.$set(this.$parent.dragging.defaultStyle, 'left', x)
            this.$set(this.$parent.dragging.defaultStyle, 'top', y)
            this.$store.dispatch('addElement', { ...this.$parent.dragging, needProps: props })
        },
        /**
         * 根据elname获取组件默认props数据
         * @param elName
         */
        getComponentProps (elName) {
            let elComponentData
            for (let key in this._qk_register_components_object) {
                if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
                    elComponentData = this._qk_register_components_object[key];
                    break;
                }
            }
            if (!elComponentData) return {}

            let props = {}

            for (let key in elComponentData.props) {
                props[key] = [Object, Array].includes(elComponentData.props[key].type) ? elComponentData.props[key].default() : elComponentData.props[key].default
            }

            return props;

        }
    }
}
</script>

<style lang="scss" scoped>
.editor-pane {
    height: 100%;
    width: 100%;
    border: 1px solid #f5f5f5;
    border-width: 0 1px;
    background-image: linear-gradient(
            45deg,
            #f5f5f5 25%,
            transparent 0,
            transparent 75%,
            #f5f5f5 0
        ),
        linear-gradient(
            45deg,
            #f5f5f5 25%,
            transparent 0,
            transparent 75%,
            #f5f5f5 0
        );
    background-position: 0 0, 13px 13px;
    background-size: 26px 26px;
    display: flex;
    justify-content: center;
}

.editor-pane-inner {
    height: 100%;
    width: 100%;
    padding: 20px;
}

.editor-main {
    border-radius: 3px;
    box-shadow: 0 3px 10px #dcdcdc;
    margin: 25px auto;
    position: relative;
    background: white;
    transform-origin: center top;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==");
}

.page-preview-wrapper {
    height: 100%;
    position: relative;
    .edit-shape-point {
        width: 10px;
        height: 10px;
        background-color: #fff;
        border: 1px solid #59c7f9;
        border-radius: 10px;
        position: absolute;
        z-index: 1001;
    }
}

.page-wrapper-mask {
    height: 100%;
    width: 100%;
    z-index: 1000;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    outline: rgba(236, 238, 240, 0.77) solid 10000px;
}

.element-on-edit-pane {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.page-wrapper-menu-operation {
    position: absolute;
    right: -80px;
    top: 5%;
    width: 0;
    background: white;
    color: #333;
    text-align: center;
    z-index: 1002;
    border-radius: 4px;
    display: none;
    transition: all 0.28s;
    opacity: 0;
    transform-origin: center top;
    .menu-item {
        padding: 10px;
        cursor: pointer;
        &.i {
            font-size: 24px;
            line-height: 30px;
        }
        &:hover {
            background: rgba(37, 165, 137, 0.09);
            color: $primary;
            &.i {
                font-weight: bold;
                font-size: 26px;
            }
        }
    }
    &.active {
        display: block;
        width: 60px;
        opacity: 1;
    }
}
</style>
