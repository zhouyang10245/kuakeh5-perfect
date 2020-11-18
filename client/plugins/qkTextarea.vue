<!--test.vue-->
<template>
    <div class="qk-textarea">
        <textarea class="qk-textarea-item"
                  :id='keyname'
                  :placeholder="placeholder"
                  v-model="value"
                  :readonly='formtype=="只读"'
                  :isMust='formtype=="必填"' 
                  @input="change" />
    </div>
</template>

<script>
export default {
    name: 'QkTextarea',
    props: {
        keyname: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入'
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
    },
    methods:{
        change(){
            this.$emit("changDara", this.value)
        }
    },
    created () {
    }
}
</script>

<style lang="scss" scoped>
.qk-textarea-item {
    display: block;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
}
</style>
