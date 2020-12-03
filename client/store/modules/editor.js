import { cloneDeep, merge } from 'lodash'
import editorProjectConfig from '@client/pages/editor/DataModel'

/**
 * 编辑器数据状态存储
 */
const state = {
  // 所有模板
  projectList: [
    {
      name: '',
      title: '未命名场景一',
      description: '',
      coverImage: '',
      auther: '',
      width: 1960,
      height: 1960,
      scale: 0.6,
      pages: [
        {
          uuid: 'e3049550-7e8c-45c8-abac-555687213f9c',
          name: '',
          elements: [
            {
              uuid: 'cbd86027-240f-42ea-b613-3fb70d703169',
              elName: 'qk-rectangle-border',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 1961,
                height: 136,
                top: 1605,
                left: -1,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 0,
                borderColor: '#999999',
                borderStyle: 'solid',
                borderRadius: 0,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#060606',
                backgroundColor: 'rgba(10, 10, 10, 1)',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 12,
              },
              events: [],
              propsValue: {},
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: '3c7eb87e-a61a-4afb-8b97-140cf63bda03',
              elName: 'qk-text',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 375,
                height: 40,
                top: 1656,
                left: 775,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 0,
                borderColor: '',
                borderStyle: 'solid',
                borderRadius: 0,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#F9F7F7',
                backgroundColor: '',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 12,
              },
              events: [],
              propsValue: {
                text: 'Copyright © 2016-2019  浙ICP备05018780号-10',
              },
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: 'e18b9078-f561-4aff-ab39-df9f9458cb7d',
              elName: 'qk-courses',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 1568,
                height: 417,
                top: 1146,
                left: 203,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 0,
                borderColor: '',
                borderStyle: 'solid',
                borderRadius: 0,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 11,
              },
              events: [],
              propsValue: {
                title: '推荐课程',
                courselist: [
                  {
                    url: '/',
                    src:
                      'http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709f9b86770072.png?Signature=RSGpU0B35XEFQ7PZbaKWs108NCA%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058002',
                    title: '经济法学',
                    teacher: '韩林丽',
                    num: 111,
                    org: '浙江财经大学',
                  },
                  {
                    url: '/',
                    title: '人体（系统）解剖学',
                    src:
                      'http://media.zjooc.cn/coursecover%2F2c918082746e333d017554412e5a75bd.jpg?Signature=lvQ3b6Esgcyq%2Bi1iugLRysTVC0c%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058003',
                    teacher: '张博',
                    num: 20,
                    org: '湖州师范学院',
                  },
                  {
                    url: '/',
                    title: '移动营销',
                    src:
                      'http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709f9feac4034e.png?Signature=%2Fgzfr165ql6qGZ491rcyvbQ2hIs%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058003',
                    teacher: '魏振峰',
                    num: 110,
                    org: '浙江工贸职业技术学院',
                  },
                  {
                    url: '/',
                    title: '基础会计',
                    src:
                      'http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709fa7a604078c.png?Signature=Jj5zr%2F7PTkVPpz8NPJmouWQZsCk%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058003',
                    teacher: '万建华',
                    num: 125,
                    org: '浙江工商大学',
                  },
                ],
              },
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: '0b4f77ca-9954-46d4-9c34-28388ee052c4',
              elName: 'qk-courses',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 1568,
                height: 417,
                top: 703,
                left: 203,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 0,
                borderColor: '',
                borderStyle: 'solid',
                borderRadius: 0,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 9,
              },
              events: [],
              propsValue: {
                title: '热门课程',
                courselist: [
                  {
                    url: '/',
                    src:
                      'http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709f9b13fe0015.png?Signature=Y8WNncFVCABDlmqnSsRCcSHYzAc%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058002',
                    title: '电路基础分析',
                    teacher: '鲁丰',
                    num: 111,
                    org: '中国计量大学现代科技学院',
                  },
                  {
                    url: '/',
                    title: '大学生体能素质',
                    src:
                      'http://media.zjooc.cn/coursecover%2F2c9180827082cbc50170af915dd50f49.jpg?Signature=hFCp%2Fa4bCc9pbZc3kziCmahj%2BrY%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058002',
                    teacher: '张娜',
                    num: 20,
                    org: '温州医科大学',
                  },
                  {
                    url: '/',
                    title: '创意文化与表现',
                    src:
                      'http://media.zjooc.cn/videocover%2F402881f870ec8a3a0170ec8a51c2000b.png?Signature=gBr942f186MWmVJqXFc0k%2BkJZGc%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058002',
                    teacher: '胡文才',
                    num: 120,
                    org: '浙江财经大学',
                  },
                  {
                    url: '/',
                    title: '摄影艺术概论',
                    src:
                      'http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709fa4b680060b.png?Signature=3ESl7TGH%2FtRABjxMe5T5PNZ9I9g%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058002',
                    teacher: '周志鹏',
                    num: 125,
                    org: '浙江工商大学',
                  },
                ],
              },
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: '9fc1d26b-69f9-4969-aa26-587da16003b0',
              elName: 'qk-news',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 575,
                height: 403,
                top: 232,
                left: 1169,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 0,
                borderColor: '',
                borderStyle: 'solid',
                borderRadius: 0,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 8,
              },
              events: [],
              propsValue: {
                newslist: [
                  {
                    url: '/',
                    title:
                      '中国教育发展战略学会温州终身学习研究基地落户温州城市大学',
                    time: '2020-10-01',
                  },
                  {
                    url: '/',
                    title: '做更好的自己！温州学习网@爱学习的女子',
                    time: '2020-10-01',
                  },
                  {
                    url: '/',
                    title: '中国老年教育发展温州高峰论坛在温州城市大学举行',
                    time: '2020-10-01',
                  },
                  {
                    url: '/',
                    title: '浙江老年电视大学 温州分校授牌',
                    time: '2020-10-01',
                  },
                  {
                    url: '/',
                    title:
                      '温州市等级社区学校评审会顺利召开 2016年市级社区学校新增49',
                    time: '2020-10-01',
                  },
                  {
                    title:
                      '中国教育发展战略学会温州终身学习研究基地落户温州城市大学',
                    time: '2020-12-07',
                    url: '/',
                  },
                  {
                    title: '中国老年教育发展温州高峰论坛在温州城市大学举行',
                    time: '2020-12-02',
                    url: '2',
                  },
                ],
              },
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: 'fe5e57b6-8c85-48f0-a756-e497970af9a2',
              elName: 'qk-rectangle-border',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 567,
                height: 1,
                top: 196,
                left: 1170,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 0,
                borderColor: '',
                borderStyle: 'solid',
                borderRadius: 0,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '#999999',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 7,
              },
              events: [],
              propsValue: {},
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: '39b5a91d-24e4-4142-84de-e3f3571bc2b8',
              elName: 'qk-text',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 375,
                height: 40,
                top: 145,
                left: 1170,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 0,
                borderColor: '',
                borderStyle: 'solid',
                borderRadius: 0,
                boxShadow: '',
                fontSize: 26,
                fontWeight: 600,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'left',
                color: '#3377FF',
                backgroundColor: '',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 6,
              },
              events: [],
              propsValue: {
                text: '今日要闻',
              },
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: '94416d05-48d0-49fb-abed-0f46033896df',
              elName: 'qk-image-carousel',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 922,
                height: 495,
                top: 138,
                left: 200,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 0,
                borderColor: '',
                borderStyle: 'solid',
                borderRadius: 0,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 5,
              },
              events: [],
              propsValue: {
                imageSrcList: [
                  'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
                  'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
                  'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
                ],
                interval: 2500,
              },
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: '501934fc-f578-4d6b-842a-cff137c2efb7',
              elName: 'qk-button',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 140,
                height: 40,
                top: 30,
                left: 1464,
                rotate: 0,
                paddingTop: 10,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 10,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 1,
                borderColor: '#F9F8F8',
                borderStyle: 'solid',
                borderRadius: 4,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#FBF9F9',
                backgroundColor: '',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 4,
              },
              events: [
                {
                  type: 'link',
                  url: '',
                },
              ],
              propsValue: {
                text: '登录',
              },
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: 'c8f860fd-dc18-4f5e-aa2f-027d64b762ce',
              elName: 'qk-search-input',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 478,
                height: 45,
                top: 27,
                left: 754,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 0,
                borderColor: '',
                borderStyle: 'solid',
                borderRadius: 200,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 3,
              },
              events: [],
              propsValue: {
                placeholder: '请输入',
                url: '',
              },
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: '6e405662-f498-47d3-a337-514373549eac',
              elName: 'qk-image',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 191,
                height: 60,
                top: 20,
                left: 243,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 0,
                borderColor: '',
                borderStyle: 'solid',
                borderRadius: 0,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 2,
              },
              events: [],
              propsValue: {
                imageSrc:
                  'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
              },
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
            {
              uuid: 'c9a0b497-c015-4fee-a843-5379f7d2c93e',
              elName: 'qk-rectangle-border',
              animations: [],
              commonStyle: {
                position: 'absolute',
                width: 1960,
                height: 100,
                top: -1,
                left: 1,
                rotate: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                borderWidth: 2,
                borderColor: '#999999',
                borderStyle: 'solid',
                borderRadius: 0,
                boxShadow: '',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#000000',
                backgroundColor: 'rgba(51, 119, 255, 1)',
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 1,
              },
              events: [],
              propsValue: {},
              valueType: 'String',
              children: [],
              isGroup: false,
              isForm: false,
            },
          ],
          theme: 'iview',
          commonStyle: {
            backgroundColor: 'rgba(245, 245, 245, 1)',
            backgroundImage: '',
            backgroundSize: 'cover',
          },
          config: {},
        },
      ],
    },
    {
        "name": "",
        "title": "未命名场景二",
        "description": "",
        "coverImage": "",
        "auther": "",
        "width": 1960,
        "height": 1960,
        "scale": 0.6,
        "pages": [{
            "uuid": "e3049550-7e8c-45c8-abac-555687213f9c",
            "name": "",
            "elements": [{
                "uuid": "3c7eb87e-a61a-4afb-8b97-140cf63bda03",
                "elName": "qk-text",
                "animations": [],
                "commonStyle": {
                    "position": "absolute",
                    "width": 375,
                    "height": 40,
                    "top": 1656,
                    "left": 775,
                    "rotate": 0,
                    "paddingTop": 0,
                    "paddingLeft": 0,
                    "paddingRight": 0,
                    "paddingBottom": 0,
                    "marginTop": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "marginBottom": 0,
                    "borderWidth": 0,
                    "borderColor": "",
                    "borderStyle": "solid",
                    "borderRadius": 0,
                    "boxShadow": "",
                    "fontSize": 16,
                    "fontWeight": 500,
                    "lineHeight": 1.4,
                    "letterSpacing": 0,
                    "textAlign": "center",
                    "color": "#F9F7F7",
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "backgroundSize": "cover",
                    "backgroundRepeat": "no-repeat",
                    "opacity": 1,
                    "zIndex": 9
                },
                "events": [],
                "propsValue": {
                    "text": "Copyright © 2016-2019  浙ICP备05018780号-10"
                },
                "valueType": "String",
                "children": [],
                "isGroup": false,
                "isForm": false
            }, {
                "uuid": "cbd86027-240f-42ea-b613-3fb70d703169",
                "elName": "qk-rectangle-border",
                "animations": [],
                "commonStyle": {
                    "position": "absolute",
                    "width": 1961,
                    "height": 136,
                    "top": 1605,
                    "left": -1,
                    "rotate": 0,
                    "paddingTop": 0,
                    "paddingLeft": 0,
                    "paddingRight": 0,
                    "paddingBottom": 0,
                    "marginTop": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "marginBottom": 0,
                    "borderWidth": 0,
                    "borderColor": "#999999",
                    "borderStyle": "solid",
                    "borderRadius": 0,
                    "boxShadow": "",
                    "fontSize": 16,
                    "fontWeight": 500,
                    "lineHeight": 1.4,
                    "letterSpacing": 0,
                    "textAlign": "center",
                    "color": "#060606",
                    "backgroundColor": "rgba(10, 10, 10, 1)",
                    "backgroundImage": "",
                    "backgroundSize": "cover",
                    "backgroundRepeat": "no-repeat",
                    "opacity": 1,
                    "zIndex": 8
                },
                "events": [],
                "propsValue": {},
                "valueType": "String",
                "children": [],
                "isGroup": false,
                "isForm": false
            }, {
                "uuid": "e18b9078-f561-4aff-ab39-df9f9458cb7d",
                "elName": "qk-courses",
                "animations": [],
                "commonStyle": {
                    "position": "absolute",
                    "width": 1568,
                    "height": 417,
                    "top": 1114,
                    "left": 203,
                    "rotate": 0,
                    "paddingTop": 0,
                    "paddingLeft": 0,
                    "paddingRight": 0,
                    "paddingBottom": 0,
                    "marginTop": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "marginBottom": 0,
                    "borderWidth": 0,
                    "borderColor": "",
                    "borderStyle": "solid",
                    "borderRadius": 0,
                    "boxShadow": "",
                    "fontSize": 16,
                    "fontWeight": 500,
                    "lineHeight": 1.4,
                    "letterSpacing": 0,
                    "textAlign": "center",
                    "color": "#000000",
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "backgroundSize": "cover",
                    "backgroundRepeat": "no-repeat",
                    "opacity": 1,
                    "zIndex": 7
                },
                "events": [],
                "propsValue": {
                    "title": "推荐课程",
                    "courselist": [{
                        "url": "/",
                        "src": "http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709f9b86770072.png?Signature=RSGpU0B35XEFQ7PZbaKWs108NCA%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058002",
                        "title": "经济法学",
                        "teacher": "韩林丽",
                        "num": 111,
                        "org": "浙江财经大学"
                    }, {
                        "url": "/",
                        "title": "人体（系统）解剖学",
                        "src": "http://media.zjooc.cn/coursecover%2F2c918082746e333d017554412e5a75bd.jpg?Signature=lvQ3b6Esgcyq%2Bi1iugLRysTVC0c%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058003",
                        "teacher": "张博",
                        "num": 20,
                        "org": "湖州师范学院"
                    }, {
                        "url": "/",
                        "title": "移动营销",
                        "src": "http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709f9feac4034e.png?Signature=%2Fgzfr165ql6qGZ491rcyvbQ2hIs%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058003",
                        "teacher": "魏振峰",
                        "num": 110,
                        "org": "浙江工贸职业技术学院"
                    }, {
                        "url": "/",
                        "title": "基础会计",
                        "src": "http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709fa7a604078c.png?Signature=Jj5zr%2F7PTkVPpz8NPJmouWQZsCk%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058003",
                        "teacher": "万建华",
                        "num": 125,
                        "org": "浙江工商大学"
                    }]
                },
                "valueType": "String",
                "children": [],
                "isGroup": false,
                "isForm": false
            }, {
                "uuid": "0b4f77ca-9954-46d4-9c34-28388ee052c4",
                "elName": "qk-courses",
                "animations": [],
                "commonStyle": {
                    "position": "absolute",
                    "width": 1568,
                    "height": 417,
                    "top": 673,
                    "left": 203,
                    "rotate": 0,
                    "paddingTop": 0,
                    "paddingLeft": 0,
                    "paddingRight": 0,
                    "paddingBottom": 0,
                    "marginTop": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "marginBottom": 0,
                    "borderWidth": 0,
                    "borderColor": "",
                    "borderStyle": "solid",
                    "borderRadius": 0,
                    "boxShadow": "",
                    "fontSize": 16,
                    "fontWeight": 500,
                    "lineHeight": 1.4,
                    "letterSpacing": 0,
                    "textAlign": "center",
                    "color": "#000000",
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "backgroundSize": "cover",
                    "backgroundRepeat": "no-repeat",
                    "opacity": 1,
                    "zIndex": 6
                },
                "events": [],
                "propsValue": {
                    "title": "热门课程",
                    "courselist": [{
                        "url": "/",
                        "src": "http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709f9b13fe0015.png?Signature=Y8WNncFVCABDlmqnSsRCcSHYzAc%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058002",
                        "title": "电路基础分析",
                        "teacher": "鲁丰",
                        "num": 111,
                        "org": "中国计量大学现代科技学院"
                    }, {
                        "url": "/",
                        "title": "大学生体能素质",
                        "src": "http://media.zjooc.cn/coursecover%2F2c9180827082cbc50170af915dd50f49.jpg?Signature=hFCp%2Fa4bCc9pbZc3kziCmahj%2BrY%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058002",
                        "teacher": "张娜",
                        "num": 20,
                        "org": "温州医科大学"
                    }, {
                        "url": "/",
                        "title": "创意文化与表现",
                        "src": "http://media.zjooc.cn/videocover%2F402881f870ec8a3a0170ec8a51c2000b.png?Signature=gBr942f186MWmVJqXFc0k%2BkJZGc%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058002",
                        "teacher": "胡文才",
                        "num": 120,
                        "org": "浙江财经大学"
                    }, {
                        "url": "/",
                        "title": "摄影艺术概论",
                        "src": "http://media.zjooc.cn/coursecover%2F402881f8709f9b0101709fa4b680060b.png?Signature=3ESl7TGH%2FtRABjxMe5T5PNZ9I9g%3D&AWSAccessKeyId=bdfe4ebb83921f35681f&Expires=1607058002",
                        "teacher": "周志鹏",
                        "num": 125,
                        "org": "浙江工商大学"
                    }]
                },
                "valueType": "String",
                "children": [],
                "isGroup": false,
                "isForm": false
            }, {
                "uuid": "94416d05-48d0-49fb-abed-0f46033896df",
                "elName": "qk-image-carousel",
                "animations": [],
                "commonStyle": {
                    "position": "absolute",
                    "width": 1572,
                    "height": 495,
                    "top": 138,
                    "left": 200,
                    "rotate": 0,
                    "paddingTop": 0,
                    "paddingLeft": 0,
                    "paddingRight": 0,
                    "paddingBottom": 0,
                    "marginTop": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "marginBottom": 0,
                    "borderWidth": 0,
                    "borderColor": "",
                    "borderStyle": "solid",
                    "borderRadius": 0,
                    "boxShadow": "",
                    "fontSize": 16,
                    "fontWeight": 500,
                    "lineHeight": 1.4,
                    "letterSpacing": 0,
                    "textAlign": "center",
                    "color": "#000000",
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "backgroundSize": "cover",
                    "backgroundRepeat": "no-repeat",
                    "opacity": 1,
                    "zIndex": 5
                },
                "events": [],
                "propsValue": {
                    "imageSrcList": ["http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg", "http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg", "http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg"],
                    "interval": 2500
                },
                "valueType": "String",
                "children": [],
                "isGroup": false,
                "isForm": false
            }, {
                "uuid": "501934fc-f578-4d6b-842a-cff137c2efb7",
                "elName": "qk-button",
                "animations": [],
                "commonStyle": {
                    "position": "absolute",
                    "width": 140,
                    "height": 40,
                    "top": 30,
                    "left": 1464,
                    "rotate": 0,
                    "paddingTop": 10,
                    "paddingLeft": 0,
                    "paddingRight": 0,
                    "paddingBottom": 10,
                    "marginTop": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "marginBottom": 0,
                    "borderWidth": 1,
                    "borderColor": "#F9F8F8",
                    "borderStyle": "solid",
                    "borderRadius": 4,
                    "boxShadow": "",
                    "fontSize": 16,
                    "fontWeight": 500,
                    "lineHeight": 1.4,
                    "letterSpacing": 0,
                    "textAlign": "center",
                    "color": "#FBF9F9",
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "backgroundSize": "cover",
                    "backgroundRepeat": "no-repeat",
                    "opacity": 1,
                    "zIndex": 4
                },
                "events": [{
                    "type": "link",
                    "url": ""
                }],
                "propsValue": {
                    "text": "登录"
                },
                "valueType": "String",
                "children": [],
                "isGroup": false,
                "isForm": false
            }, {
                "uuid": "c8f860fd-dc18-4f5e-aa2f-027d64b762ce",
                "elName": "qk-search-input",
                "animations": [],
                "commonStyle": {
                    "position": "absolute",
                    "width": 478,
                    "height": 45,
                    "top": 27,
                    "left": 754,
                    "rotate": 0,
                    "paddingTop": 0,
                    "paddingLeft": 0,
                    "paddingRight": 0,
                    "paddingBottom": 0,
                    "marginTop": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "marginBottom": 0,
                    "borderWidth": 0,
                    "borderColor": "",
                    "borderStyle": "solid",
                    "borderRadius": 200,
                    "boxShadow": "",
                    "fontSize": 16,
                    "fontWeight": 500,
                    "lineHeight": 1.4,
                    "letterSpacing": 0,
                    "textAlign": "center",
                    "color": "#000000",
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "backgroundSize": "cover",
                    "backgroundRepeat": "no-repeat",
                    "opacity": 1,
                    "zIndex": 3
                },
                "events": [],
                "propsValue": {
                    "placeholder": "请输入",
                    "url": ""
                },
                "valueType": "String",
                "children": [],
                "isGroup": false,
                "isForm": false
            }, {
                "uuid": "6e405662-f498-47d3-a337-514373549eac",
                "elName": "qk-image",
                "animations": [],
                "commonStyle": {
                    "position": "absolute",
                    "width": 191,
                    "height": 60,
                    "top": 20,
                    "left": 243,
                    "rotate": 0,
                    "paddingTop": 0,
                    "paddingLeft": 0,
                    "paddingRight": 0,
                    "paddingBottom": 0,
                    "marginTop": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "marginBottom": 0,
                    "borderWidth": 0,
                    "borderColor": "",
                    "borderStyle": "solid",
                    "borderRadius": 0,
                    "boxShadow": "",
                    "fontSize": 16,
                    "fontWeight": 500,
                    "lineHeight": 1.4,
                    "letterSpacing": 0,
                    "textAlign": "center",
                    "color": "#000000",
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "backgroundSize": "cover",
                    "backgroundRepeat": "no-repeat",
                    "opacity": 1,
                    "zIndex": 2
                },
                "events": [],
                "propsValue": {
                    "imageSrc": "http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg"
                },
                "valueType": "String",
                "children": [],
                "isGroup": false,
                "isForm": false
            }, {
                "uuid": "c9a0b497-c015-4fee-a843-5379f7d2c93e",
                "elName": "qk-rectangle-border",
                "animations": [],
                "commonStyle": {
                    "position": "absolute",
                    "width": 1960,
                    "height": 100,
                    "top": -1,
                    "left": 1,
                    "rotate": 0,
                    "paddingTop": 0,
                    "paddingLeft": 0,
                    "paddingRight": 0,
                    "paddingBottom": 0,
                    "marginTop": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "marginBottom": 0,
                    "borderWidth": 2,
                    "borderColor": "#999999",
                    "borderStyle": "solid",
                    "borderRadius": 0,
                    "boxShadow": "",
                    "fontSize": 16,
                    "fontWeight": 500,
                    "lineHeight": 1.4,
                    "letterSpacing": 0,
                    "textAlign": "center",
                    "color": "#000000",
                    "backgroundColor": "rgba(51, 119, 255, 1)",
                    "backgroundImage": "",
                    "backgroundSize": "cover",
                    "backgroundRepeat": "no-repeat",
                    "opacity": 1,
                    "zIndex": 1
                },
                "events": [],
                "propsValue": {},
                "valueType": "String",
                "children": [],
                "isGroup": false,
                "isForm": false
            }],
            "theme": "iview",
            "commonStyle": {
                "backgroundColor": "rgba(245, 245, 245, 1)",
                "backgroundImage": "",
                "backgroundSize": "cover"
            },
            "config": {}
        }]
    }
  ],
  // 当前编辑器编辑工程项目数据
  projectData: {},
  // 当前正在编辑的页面uuid
  activePageUUID: '',
  // 画板中选中的元素uuid
  activeElementUUID: '',
  // 历史操作数据用于undo redo
  historyCache: [],
  // redo undo 指针
  currentHistoryIndex: -1,
  activeAttrEditCollapse: ['1'],
}
function getElementByid(list, id) {
  var data = null
  list.forEach((ele) => {
    if (ele.uuid == id) {
      data = ele
    } else if (ele.children) {
      data = data ? data : getElementByid(ele.children, id)
    }
  })
  return data
}
function getParentById(list, id) {
  var data = null
  list.forEach((ele) => {
    if (ele.uuid == id) {
      data = list
    } else if (ele.children) {
      data = data ? data : getParentById(ele.children, id)
    }
  })
  return data
}
const actions = {
  /**
   * 根据id查询缓存数据
   * @param state
   * @param data
   */
  setPrjectDataByid({ commit, state, dispatch }, id) {
    commit('setPrjectDataById', id)
    // 判断如果有页面择选中第一个没有则新建一个页面再选中第一个
    if (!state.projectData.pages || !state.projectData.pages.length) {
      dispatch('addPage')
    }
    dispatch('setActivePageUUID', state.projectData.pages[0].uuid)
  },
  /**
   * 初始化编辑项目数据
   * @param state
   * @param data
   */
  setPrjectData({ commit, state, dispatch }, data) {
    let projectData = data
    if (!projectData) {
      projectData = editorProjectConfig.getProjectConfig()
    }
    commit('setPrjectData', projectData)
    // 判断如果有页面择选中第一个没有则新建一个页面再选中第一个
    if (!state.projectData.pages || !state.projectData.pages.length) {
      dispatch('addPage')
    }
    dispatch('setActivePageUUID', state.projectData.pages[0].uuid)
  },
  /**
   * 设置当前选中页面uuid
   * @param state
   * @param data
   */
  setActivePageUUID({ commit }, uuid) {
    commit('setActivePageUUID', uuid)
    // 当前选中页面切换后清空元素选中的uuid
    commit('setActiveElementUUID', '')
  },
  /**
   * 设置当前选中激活元素uuid
   * @param state
   * @param data
   */
  setActiveElementUUID({ commit }, uuid) {
    commit('setActiveElementUUID', uuid)
  },
  // ========================项目操作=========================
  /**
   *
   * @param commit
   * @param url
   */
  updateCoverImage({ commit }, url) {
    commit('updateCoverImage', url)
  },

  // =====================页面操作============================
  /**
   * 添加页面
   * @param commit
   */
  addPage({ commit }, uuid) {
    let data = editorProjectConfig.getPageConfig()
    let index = -1
    if (uuid) {
      index = state.projectData.pages.findIndex((v) => {
        return v.uuid === uuid
      })
    } else {
      index = state.projectData.pages.length - 1
    }
    commit('insertPage', data, index)
    commit('addHistoryCache')
  },
  /**
   * 删除页
   * @param commit
   * @param dispatch
   * @param uuid
   */
  deletePage({ state, commit, dispatch }, uuid) {
    // 如果删除最后一页
    if (state.projectData.pages.length === 1 && state.activePageUUID === uuid) {
      dispatch('addPage')
      commit('setActivePageUUID', state.projectData.pages[1].uuid)
      commit('deletePage', index)
      commit('addHistoryCache')
      return
    }
    // 删除页是第一页且选中也是第一页时 先将选中uuid置为下一页再删除当前页
    if (state.projectData.pages[0] === uuid && state.activePageUUID === uuid) {
      commit('setActivePageUUID', state.projectData.pages[1].uuid)
    }
    let index = state.projectData.pages.findIndex((v) => {
      return v.uuid === uuid
    })
    commit('deletePage', index)
    commit('addHistoryCache')
  },
  /**
   * 复制页面
   * @param commit
   * @param uuid
   */
  copyPage({ commit }, uuid) {
    let pageData = state.projectData.pages.find((v) => {
      return v.uuid === uuid
    })
    let data = editorProjectConfig.copyPage(pageData)
    data.name = data.name ? data.name + '(copy)' : ''
    commit('insertPage', data)
    commit('addHistoryCache')
  },

  // =============================元素相关========================================

  /**
   * 添加元素
   * @param commit
   * @param data
   */
  addElement({ commit }, elData) {
    let activePage = getters.activePage(state)
    let data = editorProjectConfig.getElementConfig(
      elData,
      { zIndex: activePage.elements.length + 1 },
      state.projectData.scale
    )
    commit('addElement', { elData: data, uuid: null })
    commit('setActiveElementUUID', data.uuid)
    commit('addHistoryCache')
  },
  /**
   * 拖拽修改元素
   * @param commit
   * @param data
   */
  setElement({ commit }, data) {
    commit('setElement', data)
  },
  /**
   * 元素指令， 用于结束针对元素修改相关指令，再由此方法派发actions做具体修改
   * @param dispatch
   * @param type
   * @param data
   */
  elementCommand({ commit, dispatch, state }, command) {
    let elData = getters.activeElement(state)
    switch (command) {
      case 'copy':
        dispatch('copyElement', elData)
        break
      case 'delete':
        dispatch('deleteElement', elData.uuid)
        break
      case 'fontA+':
        dispatch('resetElementCommonStyle', {
          fontSize: elData.commonStyle.fontSize + 1,
        })
        break
      case 'fontA-':
        dispatch('resetElementCommonStyle', {
          fontSize: elData.commonStyle.fontSize - 1,
        })
        break
      case 'fontB':
        dispatch('resetElementCommonStyle', {
          fontWeight:
            elData.commonStyle.fontWeight === 'bold' ? 'normal' : 'bold',
        })
        break
      case 'layerUp':
        commit('resetElementZIndex', { uuid: elData.uuid, type: 'layerUp' })
        commit('addHistoryCache')
        break
      case 'layerDown':
        commit('resetElementZIndex', { uuid: elData.uuid, type: 'layerDown' })
        commit('addHistoryCache')
        break
      case 'layerTop':
        commit('resetElementZIndex', { uuid: elData.uuid, type: 'layerTop' })
        commit('addHistoryCache')
        break
      case 'layerBottom':
        commit('resetElementZIndex', { uuid: elData.uuid, type: 'layerBottom' })
        commit('addHistoryCache')
        break
      default:
        break
    }
  },
  copyElement({ state, commit }, elData) {
    let copyOrignData = elData ? elData : getters.activeElement(state)

    let data = editorProjectConfig.copyElement(copyOrignData, {
      zIndex: Number(copyOrignData.commonStyle.zIndex) + 1,
    })
    commit('addElement', { elData: data, uuid: copyOrignData.uuid })
    commit('setActiveElementUUID', data.uuid)
    commit('addHistoryCache')
  },
  deleteElement({ state, commit }, uuid) {
    // 如果删除选中元素则取消元素选中
    if (uuid === state.activeElementUUID) {
      commit('setActiveElementUUID', '')
    }
    // 先将页面元素zIndex 重置下再删除元素
    commit('resetElementZIndex', { uuid: uuid, type: 'set0' })

    commit('deleteElement', uuid)
    commit('addHistoryCache')
  },
  resetElementCommonStyle({ commit }, style) {
    commit('resetElementCommonStyle', style)
    commit('addHistoryCache')
  },
  /**
   * 添加动画到元素上
   * @param commit
   * @param animationName
   */
  addElementAnimate({ commit }, animationName) {
    // 初始化数据
    let animateDefaultData = {
      type: animationName,
      duration: 1,
      infinite: '',
      interationCount: 1,
      delay: 0,
    }
    commit('addElementAnimate', animateDefaultData)
    commit('addHistoryCache')
  },
  /**
   * 删除动画
   * @param commit
   * @param index
   */
  deleteElementAnimate({ commit }, index) {
    commit('deleteElementAnimate', index)
    commit('addHistoryCache')
  },

  /**
   * 添加事件
   * @param commit
   * @param type
   */
  addElementEvent({ commit }, type) {
    // 初始化数据
    let eventDefaultData = {
      type: type,
      url: '',
    }
    commit('addElementEvent', eventDefaultData)
    commit('addHistoryCache')
  },
  /**
   * 删除事件
   * @param commit
   * @param index
   */
  deleteElementEvent({ commit }, index) {
    commit('deleteElementEvent', index)
    commit('addHistoryCache')
  },

  // =====================历史纪录=======================
  /**
   * 记入历史纪录
   * @param commit
   * @param index 插入到index后
   */
  addHistoryCache({ commit }) {
    commit('addHistoryCache')
  },
  editorUndo({ commit, state }) {
    if (!getters.canUndo(state)) {
      return
    }
    const prevState = state.historyCache[state.currentHistoryIndex - 1]
    commit('relapceEditorState', cloneDeep(prevState))
    commit('editorUndo')
  },
  editorRedo({ commit }) {
    if (!getters.canRedo(state)) {
      return
    }
    const prevState = state.historyCache[state.currentHistoryIndex + 1]
    commit('relapceEditorState', cloneDeep(prevState))
    commit('editorRedo')
  },
}
const mutations = {
  setPrjectDataById(state, id) {
    state.projectData = state.projectList[id]
  },
  setPrjectData(state, data) {
    state.projectData = data
  },
  setActivePageUUID(state, data) {
    state.activePageUUID = data
  },
  setActiveElementUUID(state, data) {
    state.activeElementUUID = data
  },
  /**
   * 更新项目主图
   * @param commit
   * @param url
   */
  updateCoverImage(state, url) {
    state.projectData.coverImage = url
  },
  /**
   * 新增页面
   */
  insertPage(state, data, index) {
    if (index) {
      state.projectData.pages.splice(index, 0, data)
    } else {
      state.projectData.pages.push(data)
    }
  },
  /**
   * 删除页面
   */
  deletePage(state, index) {
    state.projectData.pages.splice(index, 1)
  },

  // =============================元素相关========================================

  /**
   * 往画板添加元素
   * @param state
   * @param elData
   */
  addElement(state, { elData, uuid }) {
    let index = state.projectData.pages.findIndex((v) => {
      return v.uuid === state.activePageUUID
    })
    let list = uuid
      ? getParentById(state.projectData.pages[index].elements, uuid)
      : state.projectData.pages[index].elements
    list.push(elData)
    list.sort((a, b) => {
      return b.commonStyle.zIndex - a.commonStyle.zIndex
    })
  },
  /**
   * 拖拽更改位置
   * @param state
   * @param elData
   */
  setElement(state, elements) {
    let index = state.projectData.pages.findIndex((v) => {
      return v.uuid === state.activePageUUID
    })
    state.projectData.pages[index].elements = [...elements]
  },
  /**
   * 往画板添加元素
   * @param state
   * @param elData  activeElementIndex
   */
  deleteElement(state, uuid) {
    let activePage = getters.activePage(state)
    let parentElement = getParentById(activePage.elements, uuid)

    let elementIndex = parentElement.findIndex((v) => {
      return v.uuid === uuid
    })
    parentElement.splice(elementIndex, 1)
  },
  /**
   * 重置元素样式，
   * @param commit
   * @param uuid
   * @param styleObject
   */
  resetElementCommonStyle(state, style) {
    let activeElement = getters.activeElement(state)
    activeElement.commonStyle = merge(activeElement.commonStyle, style)
  },

  /**
   * 添加动画到元素上
   * @param state
   * @param data
   */
  addElementAnimate(state, data) {
    let activeElement = getters.activeElement(state)
    activeElement.animations.push(data)
  },
  /**
   * 删除动画到元素上
   * @param state
   * @param index
   */
  deleteElementAnimate(state, index) {
    let activeElement = getters.activeElement(state)
    activeElement.animations.splice(index, 1)
  },
  /**
   * 添加事件
   * @param state
   * @param data
   */
  addElementEvent(state, data) {
    let activeElement = getters.activeElement(state)
    activeElement.events.push(data)
  },
  /**
   * 删除事件
   * @param state
   * @param index
   */
  deleteElementEvent(state, index) {
    let activeElement = getters.activeElement(state)
    activeElement.events.splice(index, 1)
  },
  /**
   * 改变元素zIndex
   * @param state
   * @param uuid
   * @param type layerUp上一层，layerDown下一层，layerTop置顶， layerBottom置底
   */
  resetElementZIndex(state, { uuid, type }) {
    uuid = uuid || state.activeElementUUID
    let activePage = getters.activePage(state)
    let currentElement = getElementByid(activePage.elements, uuid)
    let parentElement = getParentById(activePage.elements, uuid)

    let itemZIndex = parentElement.findIndex((ele) => {
      return ele.uuid == uuid
    })

    if (type === 'layerUp' && itemZIndex > 0) {
      parentElement.splice(
        itemZIndex - 1,
        2,
        currentElement,
        parentElement[itemZIndex - 1]
      )
    }

    if (type === 'layerDown' && itemZIndex < parentElement.length - 1) {
      parentElement.splice(
        itemZIndex,
        2,
        parentElement[itemZIndex + 1],
        currentElement
      )
    }

    if (type === 'layerTop' && itemZIndex != 0) {
      parentElement.splice(itemZIndex, 1)
      parentElement.unshift(currentElement)
    }

    if (type === 'layerBottom' && itemZIndex != parentElement.length - 1) {
      parentElement.splice(itemZIndex, 1)
      parentElement.push(currentElement)
    }
    // 根据z-index进行排序
    parentElement.forEach((ele, index) => {
      ele.commonStyle.zIndex = parentElement.length - index
    })
  },

  // ================================历史纪录========================================
  /**
   * 新增一条历史纪录
   * @param state
   */
  addHistoryCache(state) {
    if (state.currentHistoryIndex + 1 < state.historyCache.length) {
      state.historyCache.splice(state.currentHistoryIndex + 1)
    }
    state.historyCache.push({
      projectData: cloneDeep(state.projectData),
      activePageUUID: state.activePageUUID,
      activeElementUUID: state.activeElementUUID,
    })
    // 限制undo 纪录步数，最多支持100步操作undo
    state.historyCache.splice(100)
    state.currentHistoryIndex++
  },
  /**
   *
   * @param state
   */
  // 撤销
  editorUndo(state) {
    state.currentHistoryIndex--
  },
  /**
   *
   * @param state
   */
  editorRedo(state) {
    state.currentHistoryIndex++
  },
  /**
   * 更新编辑器项目数据，从history中拿数据替换
   * @param state
   * @param data
   */
  relapceEditorState(state, data) {
    state.projectData = cloneDeep(data.projectData)
    state.activePageUUID = data.activePageUUID
    state.activeElementUUID = data.activeElementUUID
  },
  /**
   * 设置编辑属性折叠面板展开收起状态
   * @param state
   * @param data
   */
  updateActiveAttrEditCollapse(state, data) {
    state.activeAttrEditCollapse = [...data]
  },
}
const getters = {
  /**
   * 当前选中的页面index
   * @param state
   * @returns {*}
   */
  currentPageIndex(state) {
    // 如果不存在页面返回-1
    if (!state.projectData.pages) {
      return -1
    }
    return state.projectData.pages.findIndex((v) => {
      return v.uuid === state.activePageUUID
    })
  },
  /**
   * 当前选中的页面index
   * @param state
   * @returns {*}
   */
  activeElementIndex(state) {
    // 如果不存在页面返回-1
    if (!state.projectData.pages) {
      return -1
    }
    let currentPageIndex = state.projectData.pages.findIndex((v) => {
      return v.uuid === state.activePageUUID
    })
    if (currentPageIndex === -1) {
      return -1
    }
    return state.projectData.pages[currentPageIndex].elements.findIndex((v) => {
      return v.uuid === state.activeElementUUID
    })
  },
  /**
   * 当前选中的页面
   */
  activePage() {
    // 如果不存在页面返回-1
    if (!state.projectData.pages || !state.activePageUUID) {
      return { commonStyle: {}, config: {} }
    }
    return state.projectData.pages.find((v) => {
      return v.uuid === state.activePageUUID
    })
  },
  /**
   * 当前选中元素
   */
  activeElement() {
    // 如果不存在页面返回-1
    if (!state.projectData.pages) {
      return { commonStyle: {}, propsValue: {} }
    }
    let index = state.projectData.pages.findIndex((v) => {
      return v.uuid === state.activePageUUID
    })
    return getElementByid(
      state.projectData.pages[index].elements,
      state.activeElementUUID
    )
  },
  canUndo(state) {
    return state.currentHistoryIndex > 0
  },
  canRedo(state) {
    return state.historyCache.length > state.currentHistoryIndex + 1
  },
  pageMode(state) {
    return state.projectData.pageMode
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
