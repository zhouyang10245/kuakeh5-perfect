<!--test.vue-->
<template>
    <div class="qk-input">
        <input class="qk-input-item outline"
              :id='keyname'
               v-model="value"
               :placeholder="placeholder"
               :readonly='formtype=="只读"'
               :isMust='formtype=="必填"'
               type="text"
               @input='change'>
    </div>
</template>

<script>
export default {
    name: 'QkInput',
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
    }
}
</script>

<style lang="scss" scoped>
.qk-input-item {
    display: block;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
}
</style>
