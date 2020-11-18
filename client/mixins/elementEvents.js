/**
 *  元素点击事件相关方法
 * */

export default {
	methods: {
		/**
		 * 链接跳转
		 */
		_event_link(eventData) {
			return new Promise((resolve) => {
				if(eventData.url){
					window.location.href = eventData.url;
				}
				resolve()
			})
		},
		/**
		 * 分享
		 * @private
		 */
		_event_share() {
			return new Promise((resolve) => {
				window.alert('分享')
				resolve()
			})
		},
		/**
		 * 表单提交
		 * @private
		 */
		_event_submitForm(eventData, element, page){
			return new Promise((resolve) => {
				// 获取提交接口
                // let apiUrl = eventData.url;
                
				// 获取页面表单数据
                let formdata ={}
                console.log(page)
				// page.pages.forEach(data => {
					page.pages[this.$route.params.num].elements.forEach(item => {
						if(!item.isForm) return;
                        let key = item.propsValue.keyname || '';
                        formdata[key] = item.propsValue.value;
					})
                // })
                localStorage.setItem("data", JSON.stringify(page))
                localStorage.setItem('info', JSON.stringify(formdata))
                // this.$axios.post(apiUrl, formdata).then(res=>{
                //     this.$message.success("提交成功")
                // })
				resolve()
			})
		}
	}
}
