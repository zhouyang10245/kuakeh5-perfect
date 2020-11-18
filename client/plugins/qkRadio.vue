<!--test.vue-->
<template>
    <div class="qk-radio">
        <el-radio-group v-model="value"
                        :readonly='formtype=="只读"'
                        :isMust='formtype=="必填"'
                        :id='keyname'>
            <el-radio class='marginB10'
                      v-for='item in options'
                      :key='item.value'
                      :label="item.value">{{item.value}}</el-radio>
        </el-radio-group>
    </div>
</template>

<script>
export default {
    name: 'QkRadio',
    props: {
        keyname: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => {
                return [
                    {
                        value: '选项一'
                    },
                    {
                        value: '选项二'
                    }
                ]
            }
        },
        formtype: {
            type: String,
            default: '选填'
        },
        value: {
            require: false
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.qk-radio {
    display: block;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
}
</style>
