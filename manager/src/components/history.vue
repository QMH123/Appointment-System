
// table.vue
<template>
    <div id="history" class="container">
      <Input search enter-button="Search" v-model="search" @on-search="Search" placeholder="Enter something..." />
      <table class="table table-hover">
        <thead>
          <tr>
              <th>活动名称</th>
              <th>活动时间</th>
              <th>活动地点</th>
              <th>发布人</th>
              <th>详细信息</th>
          </tr>
        </thead>
          <tbody>
            <tr v-for="data in historyData">
              <td>{{data.actTitle}}</td>
              <td>{{data.actTime}}</td>
              <td>{{data.actPlace}}</td>
              <td>{{data.teaName}}</td>
              <td><router-link :to="{name : 'moreInfLink' ,params: {actName : data.actTitle , actTime : data.actTime, actInf: data.actIntro}}">详细信息</router-link></td>
            </tr>
          </tbody>
      </table>
        <Page :total="pageNum" show-elevator  @on-change="changePage" />
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                searchData:[],
                search:"",
                data9: [
                    {
                        actName: '张三',
                        actTime: "2019.11.11",
                        actPlace: 'New York No. 1 Lake Park',
                        actInf:"今天是个好日子",
                        teaName : "白龙飞"

                    },
                    {
                        actName: '秦墨涵🐂🍺9',
                        actTime: "2019.11.11",
                        actPlace: 'London No. 1 Lake Park',
                        actInf:"今天是个好日子",
                        teaName : "白龙飞"

                    },
                    {
                        actName: '秦墨涵🐂🍺7',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        actInf:"今天是个好日子",
                        teaName : "白龙飞"

                    },
                    {
                        actName: '秦墨涵🐂🍺',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        actInf:"今天是个好日子",
                        teaName : "白龙飞"

                    },
                    {
                        actName: '秦墨涵🐂🍺1',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        actInf:"今天是个好日子",
                        teaName : "白龙飞"

                    },
                    {
                        actName: '秦墨涵🐂🍺2',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        actInf:"今天是个好日子",
                        teaName : "白龙飞"

                    },
                    {
                        actName: '秦墨涵🐂🍺3',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        actInf:"今天是个好日子",
                        teaName : "白龙飞"

                    },
                    {
                        actName: 'Joe Black',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        actInf:"今天是个好日子",
                        teaName : "白龙飞"

                    }
                ],
                pageSize : 5,//每页的信息条数
                ajaxHistoryData:[],//初始化信息条数
                dataCount:0,
                historyData:[],
                pageNum:0 // 页数
            }
        },
        methods:{
            //获取历史记录消息
            handleListApproveHistory(){
                this.ajaxHistoryData = this.data9;
                // this.dataCount = 10;
                if (this.ajaxHistoryData.length < this.pageSize)
                {
                    this.historyData = this.ajaxHistoryData; // historyData是每页展示
                    this.pageNum = (Math.trunc(this.ajaxHistoryData.length / this.pageSize) + 1 ) * 10;
                }
                else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                    this.pageNum = (Math.trunc(this.ajaxHistoryData.length / this.pageSize) + 1 ) * 10;

                }
            },

            changePage(index){
                console.log(index);
                let _start = (index - 1) * this.pageSize;
                  let _end = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);
            },
            Search() {
                // search 是 v-model="search" 的 search
                let search = this.search;
                if (search) {
                    this.searchData = this.data9.filter(function(product) {
                        // 每一项数据
                        //console.log(product)
                        return Object.keys(product).some(function(key) {
                            // 每一项数据的参数名
                            // console.log(key)
                            return (
                                String(product[key])
                                // toLowerCase() 方法用于把字符串转换为小写。
                                    .toLowerCase()
                                    // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
                                    .indexOf(search) > -1
                            );
                        });
                    });
                    this.ajaxHistoryData = this.searchData;
                    this.searchPageNum(this.searchData.length);//处理搜索后页面问题
                    this.historyData = this.ajaxHistoryData.slice(0,5);
                }
                else{
                    this.handleListApproveHistory();
                }
            },

            searchPageNum(length){
                if(length > this.pageSize)
                {
                    this.pageNum = (Math.trunc(this.ajaxHistoryData.length / this.pageSize) + 1 ) * 10;
                }
                else if(length < this.pageSize && length > 0)
                {
                    this.pageNum = (Math.trunc(this.ajaxHistoryData.length / this.pageSize) + 1 ) * 10;
                }
                else
                {
                    setTimeout(() => {
                        alert("nmsl");
                    },10)
                    this.pageNum = 0;
                }
            }


        },
        created(){
            this.$request.get('/browse')
                .then(res => {
                    console.log(res);
                    this.data9 = res.data;
                    this.handleListApproveHistory();
                    console.log(this.pageNum);
                })


        },
        computed:{

        }
    }
</script>
