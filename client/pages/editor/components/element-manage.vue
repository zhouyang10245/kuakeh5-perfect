<template>
    <div class="components-page-manage scrollbar-wrapper">
        <p class="page-title text-center">组件管理</p>
        <el-scrollbar style="height: 100%;"
                      class="components-main-conten">
            <el-tree :data="elemets"
                     node-key="uuid"
                     default-expand-all
                     draggable
                     @node-drag-start="handleDragStart"
                     @node-drag-end="handleDragEnd"
                     :allow-drop="allowDrop"
                     :props="defaultProps"
                     :expand-on-click-node="false">
                <span class="custom-tree-node"
                      slot-scope="{ data }">
                    <div class="page-item clearfix"
                         :key="data.uuid"
                         @click="changeActivePage(data)"
                         :class="{active: activeElementUUID === data.uuid}">
                        <div class="inline-block"
                             @dblclick="setEditId(data.uuid)">
                            <el-input v-if='editUuid == data.uuid'
                                      @blur="changename"
                                      v-model="data.name"
                                      style="width:130px"></el-input>
                            <template v-else>
                                {{data.name || data.elName}} {{data.isGroup ? '(组)' : ''}}
                            </template>
                        </div>
                        <div class="page-item-btn-wrapper pull-right width20">
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    <i class="el-icon-more-outline"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>
                                        <div class="btn-item"
                                             @click="handleElementCommand('copy')"><i class="iconfont iconfuzhi"></i>  复制{{data.isGroup ? '组' : '组件'}}</div>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <div class="btn-item"
                                             @click="handleElementCommand('delete')"><i class="iconfont iconshanchu"></i> 删除{{data.isGroup ? '组' : '组件'}}</div>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </span>
            </el-tree>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    data () {
        return {
            editUuid: null,
            dragging: null,
            defaultProps: {
                children: 'children',
                label: 'name'
                // disabled: 'editable'
            },
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
        ]),
        elemets () {
            let data = this.activePage
            return data.elements.sort((a, b) => {
                return b.commonStyle.zIndex - a.commonStyle.zIndex
            })
        }
    },
    methods: {
        // 拖拽开始存储父节点数据
        handleDragStart (node) {
            this.dragging = node.parent.data
        },
        // 拖拽结束
        handleDragEnd (draggingNode, dropNode, type) {
            let data = [...this.elemets]
            let beforeLeval = draggingNode.level
            let afterLevel = dropNode.level + (type == 'inner' ? 1 : 0)
            let dragElemnt = this.getElementByid(data, draggingNode.data.uuid)
            // 保证层级改变后元素位置不在
            // 组内到组外
            if (beforeLeval > afterLevel) {
                dragElemnt.commonStyle.left += this.dragging.commonStyle.left
                dragElemnt.commonStyle.top += this.dragging.commonStyle.top
                //  组外到组内
            } else if (beforeLeval < afterLevel) {
                let parentElement = this.getParentById(this.activePage, draggingNode.data.uuid)

                dragElemnt.commonStyle.left -= parentElement.commonStyle.left
                dragElemnt.commonStyle.top -= parentElement.commonStyle.top
            }

            this.$store.dispatch('setElement', this.setZIndex(data));
        },
        getParentById (element, id) {
            var data = null
            let list = element.elements || element.children
            list.forEach((ele) => {
                if (ele.uuid == id) {
                    data = element
                } else if (ele.children) {
                    data = data ? data : this.getParentById(ele, id)
                }
            })
            return data
        },
        getElementByid (list, id) {
            var data = null
            list.forEach((ele) => {
                if (ele.uuid == id) {
                    data = ele
                } else if (ele.children) {
                    data = data ? data : this.getElementByid(ele.children, id)
                }
            })
            return data
        },
        setZIndex (list) {
            return list.map((ele, index) => {
                ele.commonStyle.zIndex = list.length - index
                if (ele.children) {
                    ele.children = this.setZIndex(ele.children)
                }
                return ele
            })
        },
        // 最多俩级
        allowDrop (draggingNode, dropNode, type) {
            // 暂最多支持俩级
            if (dropNode.level == 3 || draggingNode.level == 3 || (dropNode.level == 2 && type == 'inner') || (!dropNode.data.isGroup && type == 'inner')) {
                return false
            } else {
                return true;
            }
        },
        /**
         * 切换选中页面
         * @param item
         */
        changeActivePage (item) {
            this.$store.dispatch('setActiveElementUUID', item.uuid);
        },
        /**
         * 对元素进行操作命令
         */
        handleElementCommand (command) {
            this.$store.dispatch('elementCommand', command)
        },
        setEditId (id) {
            this.editUuid = id
        },
        changename () {
            this.editUuid = null
        }
    }
}
</script>

<style lang="scss" scoped>
.components-page-manage {
    height: 100%;
    padding-top: 60px;
    padding-bottom: 60px;
    position: relative;
}
.page-title {
    position: absolute;
    top: 16px;
    left: 0;
    width: 100%;
}
/deep/.el-tree-node__content {
    height: 70px;
    .custom-tree-node {
        width: 100%;
        .page-item {
            height: 70px;
            line-height: 70px;
            width: 100%;
            cursor: pointer;
            transition: all 0.28s;
            border-bottom: 1px solid #e6ebed;
            // background: white;
            color: #666666;
            padding: 0 10px;
            display: flex;
            & > .pull-right {
                width: 20px;
                &.custom-loading-btn {
                    width: 84px;
                }
            }
            & > .inline-block {
                flex: 1;
            }
            // &:hover {
            //     background-color: #eee;
            //     .page-item-btn-wrapper {
            //         display: block;
            //         opacity: 1;
            //     }
            // }
            // &.active {
            //     background-color: #eee;
            //     color: #111;
            //     .page-item-index {
            //         background: $primary;
            //         color: white;
            //     }
            // }
            .page-item-index {
                display: inline-block;
                width: 24px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                border-radius: 12px;
                background-color: #ccc;
                color: #fff;
                margin-right: 8px;
            }
            .page-item-btn-wrapper {
                .btn-item {
                    display: inline-block;
                    padding: 4px 4px;
                    font-size: 18px;
                    transition: all 0.28s;
                    &:hover {
                        color: $primary;
                        transform: scale(1.05);
                    }
                }
            }
        }
    }
}

.bottom-btn-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 60px;
    text-align: center;
    width: 100%;
    padding-top: 12px;
}
</style>
