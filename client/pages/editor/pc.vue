<template>
    <div class="page-editor editor-wrapper"
         v-loading="loading">
        <!--左侧导航-->
        <div class="editor-side-bar border-R">
            <el-tabs tab-position="left"
                     v-model="activeSideBar"
                     style="height: 100%;">
                <template v-for="(item, index) in sidebarMenus">
                    <el-tab-pane :name="item.value"
                                 :key="index"
                                 v-if="!item.pageMode || (item.pageMode && item.pageMode === pageMode)">
                        <el-tooltip slot="label"
                                    class="item"
                                    effect="dark"
                                    :content="item.label"
                                    placement="right">
                            <i :class="item.elementUiIcon"></i>
                        </el-tooltip>
                    </el-tab-pane>
                </template>
            </el-tabs>
        </div>
        <!--组件&页面&模板-->
        <div class="editor-page-edit-wrapper">
            <componentLibs @setDragging='setDragging'
                           v-if="activeSideBar === 'componentLibs'" />
            <pageManage v-if="activeSideBar === 'pageManage'" />
            <elementManage v-if="activeSideBar === 'elementManage'" />
            <templateLibs v-if="activeSideBar === 'templateLibs'" />
        </div>
        <!--页面编辑区域-->
        <div class="editor-main">
            <div class="control-bar-wrapper">
                <controlBar :scale.sync="canvasConfig.scale"
                            @import-psd-data="importPsdData"
                            @showPreview="showPreviewFn"
                            @cancel="cancelFn"
                            @publish="publishFn"
                            @save="saveFn" />
            </div>
            <div class="control-bar-progress">
                <i class='el-icon-remove-outline'
                   @click="decrease"></i>
                <el-progress :percentage="percentage"
                             :color="customColor"></el-progress>
                <i class='el-icon-circle-plus-outline'
                   @click="increase"></i>
            </div>
            <editorPan :scale.sync="canvasConfig.scale" />
        </div>
        <!--属性编辑区域-->
        <div class="el-attr-edit-wrapper scrollbar-wrapper">
            <el-tabs v-model="activeAttr"
                     stretch>
                <el-tab-pane label="属性"
                             name="属性">
                    <attrEdit></attrEdit>
                </el-tab-pane>
                <el-tab-pane label="事件"
                             name="事件">
                    <eventEdit></eventEdit>
                </el-tab-pane>
                <!-- <el-tab-pane label="动画"
                             name="动画">
                    <animationEdit></animationEdit>
                </el-tab-pane> -->
                <el-tab-pane label="JS脚本"
                             name="脚本">
                    <scriptEdit></scriptEdit>
                </el-tab-pane>
                <el-tab-pane label="页面设置"
                             name="页面属性">
                    <pageAttrEdit></pageAttrEdit>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--预览-->
        <previewPage v-if="showPreview"
                     :pageData="projectData"
                     :pageId="id"
                     @closePreview="showPreview = false"
                     @publishFn="publishFn"
                     @saveFn="saveFn"></previewPage>
        <!--我的图片-->
        <imageLibs />
    </div>
</template>

<script>
import componentLibs from './components/component-libs/Index'
import pageManage from './components/page-manage'
import elementManage from './components/element-manage'
import templateLibs from './components/template-libs'
import editorPan from './components/editor-panel/Index'
// 属性编辑相关组件
import attrEdit from './components/attr-configure/attr-edit'
import eventEdit from './components/attr-configure/event-edit'
import pageAttrEdit from './components/attr-configure/page-attr-edit'
import scriptEdit from './components/attr-configure/script-edit'

import controlBar from './components/control-bar'

import previewPage from './components/preview'
import imageLibs from '@client/components/image-libs'

import { mapState, mapGetters } from 'vuex'
import html2canvas from 'html2canvas'

export default {
    components: {
        componentLibs,
        pageManage,
        templateLibs,
        imageLibs,
        editorPan,
        attrEdit,
        eventEdit,
        pageAttrEdit,
        scriptEdit,
        controlBar,
        previewPage,
        elementManage
    },
    data () {
        return {
            id: '', // 当前页面id
            loading: false,
            showPreview: false,
            activeAttr: '属性',
            activeSideBar: 'componentLibs',
            sidebarMenus: [
                {
                    label: '组件列表',
                    value: 'componentLibs',
                    elementUiIcon: 'el-icon-s-operation'
                },
                {
                    label: '组件管理',
                    value: 'elementManage',
                    elementUiIcon: 'el-icon-files'
                },
                {
                    label: '页面管理',
                    value: 'pageManage',
                    elementUiIcon: 'el-icon-document'
                }
                // {
                //     label: '模板库',
                //     value: 'templateLibs',
                //     elementUiIcon: 'el-icon-files'
                // }
            ],
            canvasConfig: {
                scale: 1
            },
            dragging: null,
            percentage: 60,
            customColor: '#409eff',
        }
    },
    computed: {
        ...mapState({
            projectData: state => state.editor.projectData,
            activePageUUID: state => state.editor.activePageUUID,
            activeElementUUID: state => state.editor.activeElementUUID
        }),
        ...mapGetters([
            'pageMode'
        ])
    },
    created () {
        let data = {
            "name": "",
            "title": "未命名场景",
            "description": "",
            "coverImage": "",
            "auther": "",
            "width": 1960,
            "height": 1960,
            "scale": 0.6,
            "pages": [{
                "uuid": "e3049550-7e8c-45c8-abac-555687213f9c",
                "name": "",
                "elements": [{
                    "uuid": "0518b7e9-cdc5-471e-b30d-838a674fb7d1",
                    "elName": "qk-button",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 140,
                        "height": 40,
                        "top": 710,
                        "left": 1649,
                        "rotate": 0,
                        "paddingTop": 10,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 10,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "#999999",
                        "borderStyle": "solid",
                        "borderRadius": 4,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 19
                    },
                    "events": [],
                    "propsValue": {
                        "text": "查看更多>"
                    },
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "9fc1d26b-69f9-4969-aa26-587da16003b0",
                    "elName": "qk-news",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 575,
                        "height": 403,
                        "top": 232,
                        "left": 1169,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 18
                    },
                    "events": [],
                    "propsValue": {
                        "newslist": [{
                            "url": "/",
                            "title": "中国教育发展战略学会温州终身学习研究基地落户温州城市大学",
                            "time": "2020-10-01"
                        }, {
                            "url": "/",
                            "title": "做更好的自己！温州学习网@爱学习的女子",
                            "time": "2020-10-01"
                        }, {
                            "url": "/",
                            "title": "中国老年教育发展温州高峰论坛在温州城市大学举行",
                            "time": "2020-10-01"
                        }, {
                            "url": "/",
                            "title": "浙江老年电视大学 温州分校授牌",
                            "time": "2020-10-01"
                        }, {
                            "url": "/",
                            "title": "温州市等级社区学校评审会顺利召开 2016年市级社区学校新增49",
                            "time": "2020-10-01"
                        }, {
                            "title": "中国教育发展战略学会温州终身学习研究基地落户温州城市大学",
                            "time": "2020-12-07",
                            "url": "/"
                        }, {
                            "title": "中国老年教育发展温州高峰论坛在温州城市大学举行",
                            "time": "2020-12-02",
                            "url": "2"
                        }]
                    },
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "fe5e57b6-8c85-48f0-a756-e497970af9a2",
                    "elName": "qk-rectangle-border",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 567,
                        "height": 1,
                        "top": 196,
                        "left": 1170,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "#999999",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 17
                    },
                    "events": [],
                    "propsValue": {},
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "b8e8da96-61ca-424c-927e-96fcd0a8cf3a",
                    "elName": "qk-text",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 40,
                        "top": 1145,
                        "left": 207,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 26,
                        "fontWeight": 600,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "left",
                        "color": "#3377FF",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 16
                    },
                    "events": [],
                    "propsValue": {
                        "text": "推荐课程"
                    },
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "068c33de-cd03-4e37-ac5e-50863c94279f",
                    "elName": "qk-text",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 40,
                        "top": 707,
                        "left": 203,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 26,
                        "fontWeight": 600,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "left",
                        "color": "#3377FF",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 15
                    },
                    "events": [],
                    "propsValue": {
                        "text": "热门课程"
                    },
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "39b5a91d-24e4-4142-84de-e3f3571bc2b8",
                    "elName": "qk-text",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 40,
                        "top": 145,
                        "left": 1170,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 26,
                        "fontWeight": 600,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "left",
                        "color": "#3377FF",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 14
                    },
                    "events": [],
                    "propsValue": {
                        "text": "今日要闻"
                    },
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "94416d05-48d0-49fb-abed-0f46033896df",
                    "elName": "qk-image-carousel",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 922,
                        "height": 495,
                        "top": 138,
                        "left": 200,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 13
                    },
                    "events": [],
                    "propsValue": {
                        "imageSrcList": ["http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg", "http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg", "http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg"],
                        "interval": 2500
                    },
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "501934fc-f578-4d6b-842a-cff137c2efb7",
                    "elName": "qk-button",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 140,
                        "height": 40,
                        "top": 30,
                        "left": 1464,
                        "rotate": 0,
                        "paddingTop": 10,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 10,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 1,
                        "borderColor": "#F9F8F8",
                        "borderStyle": "solid",
                        "borderRadius": 4,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#FBF9F9",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 12
                    },
                    "events": [{
                        "type": "link",
                        "url": ""
                    }],
                    "propsValue": {
                        "text": "登录"
                    },
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "c8f860fd-dc18-4f5e-aa2f-027d64b762ce",
                    "elName": "qk-search-input",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 478,
                        "height": 45,
                        "top": 27,
                        "left": 754,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 200,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 11
                    },
                    "events": [],
                    "propsValue": {
                        "placeholder": "请输入",
                        "url": ""
                    },
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "6e405662-f498-47d3-a337-514373549eac",
                    "elName": "qk-image",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 191,
                        "height": 60,
                        "top": 20,
                        "left": 243,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 10
                    },
                    "events": [],
                    "propsValue": {
                        "imageSrc": "http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg"
                    },
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "4b6ab841-6c82-4610-ad7f-93a0381150dd",
                    "elName": "course",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 340,
                        "top": 770,
                        "left": 1420,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 9
                    },
                    "events": [],
                    "propsValue": {},
                    "valueType": "String",
                    "children": [{
                        "uuid": "0ed64a3e-1125-446c-bfe4-09f1836aa190",
                        "elName": "qk-image",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 200,
                            "top": 0,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 1.4,
                            "letterSpacing": 0,
                            "textAlign": "center",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "imageSrc": "http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709fa4b680060b.png?Signature=jYLtfBji9d0nrMOUxMF4XZhZabs%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1606971591"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "1d660db4-7465-4911-aa09-6a2f1ad915d9",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 210,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 18,
                            "fontWeight": "bold",
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "摄影艺术概论（2020秋学期）"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "9ca4f1c2-360f-42f5-83da-2e9ab4d33a98",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 150,
                            "height": 40,
                            "top": 250,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "周志鹏"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "da7277db-e112-4fe3-9f8f-0054f33d36df",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 225,
                            "height": 40,
                            "top": 250,
                            "left": 137,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "right",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "学生数：89"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "239cc97f-3121-4937-ba70-ffa21cdfc04c",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 290,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "浙江工商大学"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }],
                    "isGroup": true,
                    "isForm": false
                }, {
                    "uuid": "c9a0b497-c015-4fee-a843-5379f7d2c93e",
                    "elName": "qk-rectangle-border",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 1960,
                        "height": 100,
                        "top": -1,
                        "left": 1,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 2,
                        "borderColor": "#999999",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "rgba(51, 119, 255, 1)",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 8
                    },
                    "events": [],
                    "propsValue": {},
                    "valueType": "String",
                    "children": [],
                    "isGroup": false,
                    "isForm": false
                }, {
                    "uuid": "1e16a403-2777-4ceb-82f3-2d49e0d5897c",
                    "elName": "course",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 340,
                        "top": 1210,
                        "left": 1426,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 7
                    },
                    "events": [],
                    "propsValue": {},
                    "valueType": "String",
                    "children": [{
                        "uuid": "8e4d21c0-74e5-4dd2-979a-8ce4610e3d2a",
                        "elName": "qk-image",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 200,
                            "top": 0,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 1.4,
                            "letterSpacing": 0,
                            "textAlign": "center",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "imageSrc": "http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709fa7a604078c.png?Signature=klgpNKoylK209QGC0s6dRsNd664%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1606971591"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "6ef3f9af-0455-45de-baa2-572d76720755",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 210,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 18,
                            "fontWeight": "bold",
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "基础会计（第七期）"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "67cf53e2-d650-45a5-ab0d-7c5a4db3607f",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 150,
                            "height": 40,
                            "top": 250,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "万建华"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "562fba75-ad0f-4666-bb81-b2c852ff44e1",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 225,
                            "height": 40,
                            "top": 250,
                            "left": 137,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "right",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "学生数：110"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "304cfd6e-626b-473f-91e0-2b8717a52afb",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 290,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "浙江工贸职业技术学院"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }],
                    "isGroup": true,
                    "isForm": false
                }, {
                    "uuid": "6ece7454-032b-41bf-bae6-ef159946e74d",
                    "elName": "course",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 340,
                        "top": 770,
                        "left": 610,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 7
                    },
                    "events": [],
                    "propsValue": {},
                    "valueType": "String",
                    "children": [{
                        "uuid": "dc2431de-b5c0-4c09-9ab8-5b3bf527532c",
                        "elName": "qk-image",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 200,
                            "top": 0,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 1.4,
                            "letterSpacing": 0,
                            "textAlign": "center",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "imageSrc": "http://media.zjooc.cn/coursecover%2F2c9180827082cbc50170af915dd50f49.jpg?Signature=GxD7XQeGqGD2%2BK2a0mu2CAgp2hY%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1606971591"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "80a83b10-9021-46aa-9e2d-79074adada05",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 210,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 18,
                            "fontWeight": "bold",
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "大学生体能素质"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "e2189f2c-3ed0-4f5a-8da4-b16d99c3a139",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 150,
                            "height": 40,
                            "top": 250,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "张娜"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "b9504623-5314-4a4c-a63a-1d810574b68a",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 225,
                            "height": 40,
                            "top": 250,
                            "left": 137,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "right",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "学生数：100"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "fdd35300-4572-4c48-83da-53c550d0de04",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 290,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "温州医科大学"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }],
                    "isGroup": true,
                    "isForm": false
                }, {
                    "uuid": "3b1db871-a38f-4264-8a5f-fcf05ece7d7a",
                    "elName": "course",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 340,
                        "top": 770,
                        "left": 1015,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "#E0DDDD",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 6
                    },
                    "events": [],
                    "propsValue": {},
                    "valueType": "String",
                    "children": [{
                        "uuid": "ceb54a19-232e-4743-8552-fd0450a11098",
                        "elName": "qk-image",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 200,
                            "top": 0,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 1.4,
                            "letterSpacing": 0,
                            "textAlign": "center",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "imageSrc": "http://media.zjooc.cn/videocover%2F402881f870ec8a3a0170ec8a51c2000b.png?Signature=l915xm88eY47iyoSHXXP93pwuII%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1606971591"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "6dc13cd5-578c-4d9a-a992-a7eeac859edd",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 210,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 18,
                            "fontWeight": "bold",
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "创意文化与表现"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "939a607c-558a-452e-a632-49c242a71de8",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 150,
                            "height": 40,
                            "top": 250,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "胡文才"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "dce23e0c-4885-47f2-8610-f380cba91510",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 225,
                            "height": 40,
                            "top": 250,
                            "left": 137,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "right",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "学生数：96"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "c8d0424c-572c-4182-bf44-fe089dc713f1",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 290,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "浙江财经大学"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }],
                    "isGroup": true,
                    "isForm": false
                }, {
                    "uuid": "7e02a2b8-50af-4d5d-9a5f-5040cb4e9aac",
                    "elName": "course",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 340,
                        "top": 1213,
                        "left": 610,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 5
                    },
                    "events": [],
                    "propsValue": {},
                    "valueType": "String",
                    "children": [{
                        "uuid": "a889055d-47ac-4974-ab2b-9d458a0e7818",
                        "elName": "qk-image",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 200,
                            "top": 0,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 1.4,
                            "letterSpacing": 0,
                            "textAlign": "center",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "imageSrc": "http://media.zjooc.cn/coursecover%2F2c918082746e333d017554412e5a75bd.jpg?Signature=a7mMKHhqKwbEIKSmo981j6vc9Q4%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1606971591"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "0cbd9d7a-d946-4774-bc9a-a6112496a9b3",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 210,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 18,
                            "fontWeight": "bold",
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "人体（系统）解剖学"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "594d9019-f041-46df-ba36-09eeb4246596",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 150,
                            "height": 40,
                            "top": 250,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "张博"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "21b2ac49-88b2-424e-a73c-cb63b47403a0",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 225,
                            "height": 40,
                            "top": 250,
                            "left": 137,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "right",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "学生数：120"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "f10f5ec9-56c8-4468-94b8-f01626a8b188",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 290,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "湖州师范大学"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }],
                    "isGroup": true,
                    "isForm": false
                }, {
                    "uuid": "bd21118b-d7cd-4ea4-a76a-cb3558a05e49",
                    "elName": "course",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 340,
                        "top": 1214,
                        "left": 1015,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 4
                    },
                    "events": [],
                    "propsValue": {},
                    "valueType": "String",
                    "children": [{
                        "uuid": "0f4298cb-f13e-452f-bf65-a70f18fa57a3",
                        "elName": "qk-image",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 200,
                            "top": 0,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 1.4,
                            "letterSpacing": 0,
                            "textAlign": "center",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "imageSrc": "http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709f9feac4034e.png?Signature=8ux2Jp6FJwOR85wjezNL5kUHUy8%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1606971591"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "92f756ea-7d1d-475d-b9e7-fc95735dbe38",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 210,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 18,
                            "fontWeight": "bold",
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "移动营销"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "7ac615b0-3d54-47d8-a31b-a6a90cd85ba0",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 150,
                            "height": 40,
                            "top": 250,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "魏振峰"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "e020c7e0-b601-48f6-b1c9-e9c831534c93",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 225,
                            "height": 40,
                            "top": 250,
                            "left": 137,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "right",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "学生数：110"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "a52da9e5-7da6-47f0-b619-04c44c468e10",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 290,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "浙江工贸职业技术学院"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }],
                    "isGroup": true,
                    "isForm": false
                }, {
                    "uuid": "3a415b33-87f3-45e4-94a1-4cf6b8efd433",
                    "elName": "course",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 340,
                        "top": 1215,
                        "left": 203,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 2
                    },
                    "events": [],
                    "propsValue": {},
                    "valueType": "String",
                    "children": [{
                        "uuid": "3d6a4840-a7e2-4cd2-900d-a772ec7dab22",
                        "elName": "qk-image",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 200,
                            "top": 0,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 1.4,
                            "letterSpacing": 0,
                            "textAlign": "center",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "imageSrc": "http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709f9b86770072.png?Signature=koMS15RGTgtmUbkAPHG9MfYIiuM%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1606971591"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "a300fbbc-5741-494c-8bf9-9fca9e9b4e7f",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 210,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 18,
                            "fontWeight": "bold",
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "经济法学"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "f35309b7-9bbb-4664-9b33-e18a37fc08e0",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 150,
                            "height": 40,
                            "top": 250,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "韩林丽"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "d4b4e6f8-26bb-4374-a026-bc9f94c402a2",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 225,
                            "height": 40,
                            "top": 250,
                            "left": 137,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "right",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "学生数：130"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "c75e929b-e318-49d2-ab89-3d519a0789c9",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 290,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "浙江财经大学"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }],
                    "isGroup": true,
                    "isForm": false
                }, {
                    "uuid": "954f0cd4-e217-4afa-89a3-df2add115805",
                    "elName": "course",
                    "animations": [],
                    "commonStyle": {
                        "position": "absolute",
                        "width": 375,
                        "height": 340,
                        "top": 770,
                        "left": 203,
                        "rotate": 0,
                        "paddingTop": 0,
                        "paddingLeft": 0,
                        "paddingRight": 0,
                        "paddingBottom": 0,
                        "marginTop": 0,
                        "marginLeft": 0,
                        "marginRight": 0,
                        "marginBottom": 0,
                        "borderWidth": 0,
                        "borderColor": "",
                        "borderStyle": "solid",
                        "borderRadius": 0,
                        "boxShadow": "",
                        "fontSize": 16,
                        "fontWeight": 500,
                        "lineHeight": 1.4,
                        "letterSpacing": 0,
                        "textAlign": "center",
                        "color": "#000000",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        "backgroundRepeat": "no-repeat",
                        "opacity": 1,
                        "zIndex": 1
                    },
                    "events": [],
                    "propsValue": {},
                    "valueType": "String",
                    "children": [{
                        "uuid": "eb4ce06f-1131-48ea-901d-1e2d64fd0dfc",
                        "elName": "qk-image",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 200,
                            "top": 0,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 1.4,
                            "letterSpacing": 0,
                            "textAlign": "center",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "imageSrc": "http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709f9b13fe0015.png?Signature=TsGBQNJ9E702zS2KkH8zOf4sJZA%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1606971591"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "e2c598db-4313-4f26-8915-7fc16b3f579e",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 210,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 18,
                            "fontWeight": "bold",
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "电路分析基础"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "1f4202a9-4520-41f1-b809-231b7023e66a",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 150,
                            "height": 40,
                            "top": 250,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "鲁丰"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "e897ef57-07bd-4136-aca2-8807e267c21b",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 225,
                            "height": 40,
                            "top": 250,
                            "left": 137,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "right",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "学生数：123"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }, {
                        "uuid": "852bff2d-17ce-4153-8c69-65c46c23b030",
                        "elName": "qk-text",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 375,
                            "height": 40,
                            "top": 290,
                            "left": 0,
                            "rotate": 0,
                            "paddingTop": 0,
                            "paddingLeft": 0,
                            "paddingRight": 0,
                            "paddingBottom": 0,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 0,
                            "borderColor": "",
                            "borderStyle": "solid",
                            "borderRadius": 0,
                            "boxShadow": "",
                            "fontSize": 16,
                            "fontWeight": 500,
                            "lineHeight": 2.4,
                            "letterSpacing": 0,
                            "textAlign": "left",
                            "color": "#000000",
                            "backgroundColor": "",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            "backgroundRepeat": "no-repeat",
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "text": "中国计量大学"
                        },
                        "valueType": "String",
                        "children": [],
                        "isGroup": false,
                        "isForm": false
                    }],
                    "isGroup": true,
                    "isForm": false
                }],
                "theme": "iview",
                "commonStyle": {
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "backgroundSize": "cover"
                },
                "config": {}
            }]
        }
        this.$store.dispatch('setPrjectData')
        this.id = this.$route.query.id;
        this.projectData.scale = 0.6
        this.projectData.width = 1960
        this.projectData.height = 1960
        // this.initPageData();
        if (localStorage.getItem('data')) {
            this.$store.dispatch('setPrjectData', {
                ...JSON.parse(localStorage.getItem('data'))
            })
        } else {
            this.$store.dispatch('setPrjectData', {
                ...data
            })
        }

    },
    methods: {
        // 设置拖拽信息
        setDragging (item) {
            this.dragging = item
        },
        /**
         * 初始化页面数据
         */
        initPageData () {
            this.loading = true;
            this.$axios.get('/page/detail/' + this.id).then(res => {
                this.loading = false;
                this.$store.dispatch('setPrjectData', {
                    ...res.body
                })
            }).catch(() => {
                this.loading = false;
            })
        },
        /**
         * 保存
         */
        async saveFn () {
            // await this.screenshots()
            // 提交数据再预览
            localStorage.setItem('data', JSON.stringify(this.projectData))
            // this.$axios.post('/page/update/' + this.id, this.projectData).then(() => {
            //     this.$message.success('保存成功!')
            //     this.showPreview = false
            // })
        },
        /**
         * 保存
         */
        async publishFn () {
            // await this.screenshots()
            // 提交数据再预览
            this.$axios.post('/page/publish/' + this.id, this.projectData).then(() => {
                this.$message.success('发布成功!')
                this.showPreview = false
                this.$router.push({ path: 'page-list', query: { previewId: this.id } })
            })
        },
        async showPreviewFn () {
            // await this.screenshots()
            // 提交数据再预览
            this.$axios.post('/page/update/' + this.id, this.projectData).then(() => {
                this.showPreview = true
            })
        },
        /**
         * 退出
         */
        cancelFn () {
            this.$confirm('确认退出编辑?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push('/page-list')
            }).catch(() => { })
        },
        /**
         * 提供截屏作为项目主图
         */
        screenshots () {
            const el = document.querySelector("#canvas-panel")
            return new Promise((resolve, reject) => {
                html2canvas(el, { proxy: `${this.$config.baseURL}/common/html2canvas/corsproxy` }).then(canvas => {
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.6)
                    const blob = this.$mUtils.dataURItoBlob(dataUrl)
                    const file = new window.File([blob], +new Date() + '.png', { type: 'image/png' })
                    let params = new FormData()
                    params.append('file', file);
                    this.$axios.post('/common/uploadFile', params).then(res => {
                        // 替换主图链接
                        this.projectData.coverImage = res.body;
                        resolve(res.body)
                    }).catch(err => {
                        reject(err)
                    })
                })
            })
        },
        /**
         *
         * @param dataList
         */
        importPsdData (psdData) {
            let elementsList = psdData.elements
            let psdWidth = psdData.document.width;
            let scalingRatio = this.projectData.width / psdWidth
            elementsList.forEach(item => {
                let { width, height, top, left, imageSrc, opacity, zIndex } = item;
                setTimeout(() => {
                    this.$store.dispatch('addElement', {
                        elName: 'qk-image',
                        defaultStyle: {
                            width: width * scalingRatio,
                            height: height * scalingRatio,
                            top: top * scalingRatio,
                            left: left * scalingRatio,
                            zIndex: zIndex,
                            opacity
                        },
                        needProps: {
                            imageSrc: imageSrc
                        }
                    })
                }, 10)
            })
        },

        // 设置缩放
        increase () {
            this.percentage += 10;
            if (this.percentage > 100) {
                this.percentage = 100;
            }
            this.projectData.scale = this.percentage / 100
        },
        decrease () {
            this.percentage -= 10;
            if (this.percentage < 50) {
                this.percentage = 50;
            }
            this.projectData.scale = this.percentage / 100
        }
    }
}
</script>

<style lang="scss" scoped>
.editor-wrapper {
    display: flex;
    height: 100%;
    position: relative;
    .editor-side-bar {
        width: 55px;
    }
    .editor-page-edit-wrapper {
        width: 210px;
        padding: 0 1px;
    }
    .editor-main {
        flex: 1;
        background: #f0f2f5;
        position: relative;
        overflow: auto;
    }
    .el-attr-edit-wrapper {
        width: 380px;
        padding: 0;
    }
}

.control-bar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 1000;
}
.control-bar-progress {
    position: fixed;
    right: 400px;
    bottom: 20px;
    z-index: 1000;
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
<style lang="scss">
.editor-side-bar {
    .el-tabs__item.is-active {
        background: rgba(37, 165, 137, 0.09);
    }
}

.el-attr-edit-wrapper {
    .el-tabs {
        height: 100%;
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 10px;
    }
    .el-tabs__content {
        height: calc(100% - 55px);
        & > div {
            height: 100%;
        }
        .attr-edit-inner {
            padding-left: 16px;
            padding-right: 16px;
        }
    }
}
</style>
