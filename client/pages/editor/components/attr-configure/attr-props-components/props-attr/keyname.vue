<template>
    <el-form-item label="对应字段："
                  :rules="[
                            { required: true, message: '请输入对应字段', trigger: 'blur' }
                    ]">
        <el-input type="textarea"
                  :rows="1"
                  placeholder="请输入对应字段"
                  v-model="name"
                  style='width:200px'>
        </el-input>
    </el-form-item>
</template>

<script>
export default {
    name: "attr-qk-keyname",
    props: {
        keyname: String
    },
    data () {
        return {
            name: ''
        }
    },
    mounted () {
        this.name = this.keyname;
    },
    watch: {
        keyname (val) {
            this.name = val;
        },
        name () {
            this.$emit('update:keyname', this.name)
        }
    }
}
</script>

<style scoped>
</style>
