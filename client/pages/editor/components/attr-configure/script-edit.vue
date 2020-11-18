<template>
  <div class="components-script-edit">
    <p class="page-title fontBold">脚本编辑</p>
    <p class="gray paddingL10 fontsize-12">js脚本在编辑模式下无效果</p>
    <div class="paddingT20">
      <el-input type="textarea" :rows="20"
                v-model="activePage.script"
                placeholder="请输入代码"></el-input>
    </div>
  </div>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	export default {
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
            activePage:function(){
                return this.projectData.pages.find(ele=>{
                    return ele.uuid == this.activePageUUID
                })
            }
        }
	}
</script>

<style scoped>

</style>
