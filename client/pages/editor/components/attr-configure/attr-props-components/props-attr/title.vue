<template>
  <el-form-item label="业务标题：">
    <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入文本内容"
            v-model="tempText">
    </el-input>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-qk-title",
		props: {
			title: String
		},
		data() {
			return {
				tempText: ''
			}
		},
		mounted() {
			this.tempText = this.title;
		},
		watch: {
			title() {
				this.tempText = this.title;
			},
			tempText() {
				this.$emit('update:title', this.tempText)
			}
		}
	}
</script>

<style scoped>

</style>
