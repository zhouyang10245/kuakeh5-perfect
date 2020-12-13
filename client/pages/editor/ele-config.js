import $config from '@client/config'

export default [
	{
		title: '基础组件',
		components: [
			{
				elName: 'qk-text',
				title: '文字',
				icon: 'iconfont iconwenben',
				// 每个组件设置props来展示哪些显示哪些编辑项
				valueType: '', // 标识数据类型，用于表单组件
				defaultStyle: {
					height: 40
				}
			},
			{
				elName: 'qk-image',
				title: '图片',
				icon: 'iconfont icontupian',
				valueType: '', // 标识数据类型，用于表单组件,
				defaultStyle: {
					height: 200
				}
			},
			{
				elName: 'qk-button',
				title: '按钮',
				icon: 'iconfont iconanniuzu',
				// 每个组件设置props来展示哪些显示哪些编辑项
				valueType: '', // 标识数据类型，用于表单组件
				defaultStyle: {
					width: 140,
					height: 40,
					paddingTop: 10,
					paddingBottom: 10,
					borderColor: "#999999",
					borderStyle: 'solid',
					borderWidth: 1,
					borderRadius: 4
				}
			},
			{
				elName: 'qk-rectangle-border',
				title: '矩形边框',
				icon: 'iconfont iconjuxing',
				valueType: '',
				defaultStyle: {
					width: 120,
					height: 100,
					borderColor: "#999999",
					borderStyle: 'solid',
					borderWidth: 2
				}
			},
			{
				elName: 'qk-rectangle-border',
				title: '分割线',
				icon: 'iconfont icon758bianjiqi_fengexian',
				valueType: '',
				defaultStyle: {
					height: 1,
					width: 300,
					backgroundColor: '#999999'
				}
			},
			{
				elName: 'qk-image-carousel',
				title: '图片轮播',
				icon: 'iconfont iconshouyelunbotu',
				valueType: '', // 标识数据类型，用于表单组件,
				defaultStyle: {
					height: 210
				}
			},
			{
				elName: 'qk-iframe',
				title: '内嵌iframe',
				icon: 'iconfont iconiframetianjia',
				valueType: '',
				defaultStyle: {
					width: $config.canvasH5Width,
					height: 300,
					paddingTop: 10,
					paddingBottom: 10
				}
			}
		]
	},
	{
		title: '表单组件',
		components: [
			{
				elName: 'qk-input',
				title: '文本框',
				icon: 'iconfont iconwenbenkuang',
				isForm: true,
				defaultStyle: {
					height: 38,
					width: 250,
					paddingTop: 2,
					paddingBottom: 2,
					paddingLeft: 10,
					paddingRight: 10,
					borderColor: "#999999",
					borderStyle: 'solid',
					borderWidth: 1,
					borderRadius: 4
				}
			},
			{
				elName: 'qk-textarea',
				title: '多行文本',
				icon: 'iconfont iconwenbenkuang',
				isForm: true,
				defaultStyle: {
					height: 58,
					width: 250,
					paddingTop: 6,
					paddingBottom: 6,
					paddingLeft: 10,
					paddingRight: 10,
					borderColor: "#999999",
					borderStyle: 'solid',
					borderWidth: 1,
					borderRadius: 4
				}
			},
			{
				elName: 'qk-radio',
				title: '单选框',
				icon: 'iconfont iconplus-radio',
                isForm: true,
                defaultStyle: {
                    textAlign: 'left'
				}
			},
			{
				elName: 'qk-checkbox',
				title: '复选框',
                icon: 'iconfont iconduoxuan',
                valueType: 'Array',
                isForm: true,
                defaultStyle: {
                    textAlign: 'left'
				}
			},
			{
				elName: 'date',
				title: '日期选择器',
				icon: 'iconfont iconriqi',
				isForm: true,
			},
			{
				elName: 'time',
				title: '时间选择器',
				icon: 'iconfont iconshijian',
				isForm: true,
			},
			{
				elName: 'datetime',
				title: '日期时间',
				icon: 'iconfont iconriqishijian',
				isForm: true,
			}
		]
	},
	{
		title: '功能组件',
		components: [
			{
				elName: 'qk-bg-music',
				title: '音乐',
				icon: 'iconfont iconyinlemusic217',
				valueType: '',
				defaultStyle: {
					height: 52,
					width: 52,
				}
			},
		]
	},
	{
		title: '业务组件',
		components: [
            {
				elName: 'qk-navmenu',
				title: '导航',
				icon: 'el-icon-notebook-2',
				valueType: '',
				defaultStyle: {
					height: 52,
                    width: 200
				}
            },
            {
				elName: 'qk-search-input',
				title: '搜索框',
				icon: 'el-icon-search',
				valueType: '',
				defaultStyle: {
					height: 45,
                    width: 350,
                    borderRadius: 200
				}
			},
            {
				elName: 'qk-news',
				title: '新闻',
				icon: 'el-icon-news',
				valueType: '',
				defaultStyle: {
					height: 210,
                    width: 600
				}
            },
            {
				elName: 'qk-courses',
				title: '课程',
				icon: 'el-icon-set-up',
				valueType: '',
				defaultStyle: {
					height: 363,
                    width:1200
				}
            },
            {
				elName: 'course',
				title: '自定义课程',
				icon: 'el-icon-set-up',
                isGroup: true,
				defaultStyle: {
					height: 340,
                    width: 375
                },
                children:[
                    {
                        elName: 'qk-image',
                        title: '图片',
                        valueType: '', // 标识数据类型，用于表单组件,
                        defaultStyle: {
                            height: 200
                        }
                    },
                    {
                        elName: 'qk-text',
                        title: '文字',
                        // 每个组件设置props来展示哪些显示哪些编辑项
                        valueType: '', // 标识数据类型，用于表单组件
                        defaultStyle: {
                            height: 40,
                            top: 230,
                            textAlign: 'left',
                            fontSize: 18,
                            lineHeight: 2.4,
                            fontWeight: 'bold'
                        }
                    },
                    {
                        elName: 'qk-text',
                        title: '文字',
                        // 每个组件设置props来展示哪些显示哪些编辑项
                        valueType: '', // 标识数据类型，用于表单组件
                        defaultStyle: {
                            height: 40,
                            width: 150,
                            top: 270,
                            lineHeight: 2.4,
                            textAlign: 'left'
                        }
                    },
                    {
                        elName: 'qk-text',
                        title: '文字',
                        // 每个组件设置props来展示哪些显示哪些编辑项
                        valueType: '', // 标识数据类型，用于表单组件
                        defaultStyle: {
                            height: 40,
                            width: 225,
                            left: 250,
                            top: 270,
                            lineHeight: 2.4,
                            textAlign: 'right'
                        }
                    },
                    {
                        elName: 'qk-text',
                        title: '文字',
                        // 每个组件设置props来展示哪些显示哪些编辑项
                        valueType: '', // 标识数据类型，用于表单组件
                        defaultStyle: {
                            height: 40,
                            top: 310,
                            textAlign: 'left',
                            lineHeight: 2.4
                        }
                    },
                ]
			}
        ]
	}
]
