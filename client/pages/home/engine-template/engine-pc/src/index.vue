<template>
    <div class="engine-template-wrapper">
        <template v-if='pageData.pages'>
            <div class="relative"
                 v-for="(page, i) in pageData.pages"
                 :key="i"
                 :style="getCommonStyle(page.commonStyle)">
                <!--页面内容区域-->
                <div class="quark-page-wrapper"
                     :style="getCommonStyle({...page.commonStyle, top: pageTop, height: pageData.height, width: pageData.width, position: 'relative'}, scalingRatio)">
                    <componentsTemplate v-for="(item, index) in page.elements"
                                        :key="index"
                                        @handleElementClick="handleElementClick"
                                        :element="item"
                                        :style="getCommonStyle(item.commonStyle, scalingRatio)">
                    </componentsTemplate>
                </div>
            </div>
        </template>

    </div>
</template>

<script>
import editorProjectConfig from '@client/pages/editor/DataModel'
import componentsTemplate from '../../components/components-template'
import $config from '@client/config'
import elementEvents from '@client/mixins/elementEvents'
export default {
    name: 'engineH5Long',
    components: {
        componentsTemplate
    },
    mixins: [elementEvents],
    data () {
        return {
            getCommonStyle: editorProjectConfig.getCommonStyle,
            scalingRatio: 1,

            pageTop: 0
        }
    },
    created () {
        let data = {
            "shareConfig": {
                "coverImage": "",
                "title": "这是#分享者#的大力推荐",
                "description": "这是#分享者#大力推荐的H5"
            },
            "title": "未命名场景",
            "coverImage": "",
            "description": "我用夸克可视化编辑器做了一个超酷炫的H5，快来看看吧。",
            "width": 375,
            "height": 644,
            "pageMode": "h5",
            "flipType": 0,
            "slideNumber": false,
            "status": 1,
            "isPublish": false,
            "isTemplate": false,
            "script": "this.$axios.get(\"http://www.wanandroid.com/article/list/0/json\" ).then(res=>{\n  window.userInfo = {\n     name: '张三',\n      phone:'17826857080'\n  }\n})",

            "members": [],
            "_id": "5f9796241b4d4b3a995300d4",
            "pages": [{
                "uuid": "c97b3536-76ee-4312-b09b-a75b99c0ad5c",
                "name": "",
                "elements": [
                    {
                        "uuid": "8ca4ae17-1283-4fe0-be22-17e3ff7e58b1",
                        "elName": "qk-input",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 250,
                            "height": 38,
                            "top": 49,
                            "left": 14,
                            "rotate": 0,
                            "paddingTop": 2,
                            "paddingLeft": 10,
                            "paddingRight": 10,
                            "paddingBottom": 2,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 1,
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
                            "opacity": 1,
                            "zIndex": 1
                        },
                        "events": [],
                        "propsValue": {
                            "placeholder": "请输入姓名"
                        },
                        "valueType": "String",
                        "isForm": true
                    }, {
                        "uuid": "4161205a-7db3-4e41-afee-268b70da57ee",
                        "elName": "qk-input",
                        "animations": [],
                        "commonStyle": {
                            "position": "absolute",
                            "width": 250,
                            "height": 38,
                            "top": 107,
                            "left": 14,
                            "rotate": 0,
                            "paddingTop": 2,
                            "paddingLeft": 10,
                            "paddingRight": 10,
                            "paddingBottom": 2,
                            "marginTop": 0,
                            "marginLeft": 0,
                            "marginRight": 0,
                            "marginBottom": 0,
                            "borderWidth": 1,
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
                            "opacity": 1,
                            "zIndex": 2
                        },
                        "events": [],
                        "propsValue": {
                            "placeholder": "请输入手机号码"
                        },
                        "valueType": "String",
                        "isForm": true
                    }
                ],
                "commonStyle": {
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "backgroundSize": "cover"
                }
            }],
            "author": "5dd8d0df1659195eb93b16e9",
            "created": "2020-10-27T03:38:12.174Z",
            "updated": "2020-10-27T03:38:12.174Z",
            "__v": 0
        }
        window._pageData = data
        if (data.script) {
            eval(data.script)
        }
        this.pageData = window._pageData;
        this.scalingRatio = document.body.clientWidth / $config.canvasH5Width
        this.pageTop = (document.documentElement.clientHeight - this.pageData.height * this.scalingRatio) / 2
        this.pageTop = Math.max(this.pageTop, 0);
    },
    computed: {
        pageData: () => {
            return window._pageData
        }
    },
    methods: {
        /**
         * 按钮点击事件
         * @param eventsData
         */
        async handleElementClick (eventsData, element) {
            for (let i = 0, len = eventsData.length; i < len; i++) {
                if (this['_event_' + eventsData[i].type]) {
                    await this['_event_' + eventsData[i].type](eventsData[i], element, this.pageData)
                }
            }
        }
    }
}
</script>

<style scoped>
.engine-template-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.relative {
    position: relative;
}

.hidden {
    overflow: hidden;
}
</style>
