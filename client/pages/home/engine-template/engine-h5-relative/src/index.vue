<template>
    <div class="engine-template-wrapper">
        <!-- <div class="relative"
             v-for="(page, i) in pageData.pages"
             :key="i"
             :style="getCommonStyle(page.commonStyle)"> -->
        <div class="relative"
              style='width:100%;overflow-x: hidden'
             :style="getCommonStyle(page.commonStyle)">
            <!--页面内容区域-->
            <div class="quark-page-wrapper"
                 :style="getCommonStyle({...page.commonStyle, top: pageTop, height: pageData.height, width: pageData.width, position: 'relative'}, scalingRatio)">
                <componentsTemplate v-for="(item, index) in page.elements"
                                    :key="index"
                                    @handleElementClick="handleElementClick"
                                    :element="item"
                                    :styleObj="getCommonStyle(item.commonStyle, scalingRatio)">
                </componentsTemplate>
            </div>
        </div>
    </div>
</template>

<script>
import editorProjectConfig from '@client/pages/editor/DataModel'
import componentsTemplate from '../../components/components-template'
// import $config from '@client/config'
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
            pageData: {
                pages: []
            },
            page: {

            },
            pageTop: 0
        }
    },
    created () {
        let data = window._pageData = JSON.parse(localStorage.getItem("data"))
        let num = this.$route.params.num
        // this.$axios.get("http://www.tianqiapi.com/api", {
        //     version: 'v9',
        //     appid: '23035354',
        //     appsecret: '8YvlPNrz'
        // }).then(res => {
        //     return new Promise(resolve => {
        //             resolve({ name: '张三', phone: '17826857080' })
        //     })
        // })
        if (window._pageData.pages[num].script) {
            eval(window._pageData.pages[num].script).then(res => {
                let keys = Object.keys(res)
                let info = JSON.parse(localStorage.getItem("info"))
                data.pages[num].elements.forEach(ele => {
                    if (info && ele.propsValue && ele.propsValue.keyname && keys.includes(ele.propsValue.keyname)) {
                        ele.propsValue.value = info[ele.propsValue.keyname]
                    }
                })
                this.init()
            }).catch(err => {
                console.log(err, 555)
            })
        } else {
            this.init()
        }

    },
    methods: {
        init () {
            this.pageData = window._pageData;
            this.page = window._pageData.pages[this.$route.params.num]
            // this.scalingRatio = document.body.clientWidth / $config.canvasH5Width
            this.pageTop = (document.documentElement.clientHeight - this.pageData.height * this.scalingRatio) / 2
            this.pageTop = Math.max(this.pageTop, 0);
        },
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
