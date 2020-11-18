<template>
  <el-form-item  label="选项管理：">
    <div>
      <br />
      <ul>
          <li v-for='(item, index) in optionsList' :key='index'>
              <el-input v-model="item.value"  placeholder="请输入选项"></el-input> 
              <i class='el-icon-remove-outline' @click="deleteRadio(index)"></i>
              <i class='el-icon-circle-plus-outline' @click="add(index)"></i>
          </li>
      </ul>
    </div>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-qk-options",
		props: {
			options: Array
		},
		data() {
			return {
                optionsList: [],
                value:''
			}
		},
		mounted() {
			this.optionsList = this.options;
        },
        methods:{
            deleteRadio(index){
                this.optionsList.splice(index, 1)
            },
            add(index){
                this.optionsList.splice(index+1, 0, {
                    value: ''
                })
            }
        },
		watch: {
			options(val) {
				this.optionsList = val;
            },
            optionsList() {
				this.$emit('update:options', this.optionsList)
			}
		}
	}
</script>

<style lang='scss' scoped>
li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .el-input{
        flex: 1;
    }
    i{
        font-size: 18px;
        margin:  0 10px;
    }
}
</style>
