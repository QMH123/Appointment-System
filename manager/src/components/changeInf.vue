<template>
<div>
  <div>
    <Input search enter-button="Search" v-model="search" @on-search="Search" placeholder="输入关键字搜索..." />
  </div>

  <table class="table table-hover">
    <thead>
    <tr>
      <th>活动名称</th>
      <th>活动时间</th>
      <th>活动地点</th>
      <th>发布人</th>
      <th>修改信息</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="data in historyData">
      <td>{{data.actName}}</td>
      <td>{{data.actTime}}</td>
      <td>{{data.actPlace}}</td>
      <td>{{data.publisher}}</td>
      <td><router-link :to="{name : 'pubchangeLink' ,params: {actName : data.actName , actTime : data.actTime}}">修改信息</router-link></td>
    </tr>
    </tbody>
  </table>

  <Page :total="pageNum" show-elevator  @on-change="changePage" />
  </div>
</template>
<script>
    export default {
        data() {
            return {
                search: "",
                // 原本展示数据
                list: [
                    {
                        actName: '银杏节马拉松',
                        actTime: "2019.11.11",
                        actPlace: 'New York No. 1 Lake Park',
                        publisher:'白龙飞'
                    },
                    {
                        actName: '双十一剁手大会',
                        actTime: "2019.11.11",
                        actPlace: 'London No. 1 Lake Park',
                        publisher:'张诗涵'

                    },
                    {
                        actName: '班级聚餐吃火锅',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'白龙飞'
                    },
                    {
                        actName: '吃肯德基',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'白龙飞'
                    },
                    {
                        actName: '吃食堂',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'张诗涵'
                    },
                    {
                        actName: '搞黄色',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'肖文淼'
                    },
                    {
                        actName: '搞红色',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'张诗涵'
                    },
                    {
                        actName: '搞绿色',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'肖文淼'
                    },
                    {
                        actName: '搞蓝色',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'白龙飞'
                    },{
                        actName: '搞紫色',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'白龙飞'
                    },{
                        actName: '搞黄色',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'肖文淼'
                    },
                    {
                        actName: '搞红色',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'白龙飞'
                    },
                    {
                        actName: '搞绿色',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'张诗涵'
                    },
                    {
                        actName: '搞蓝色',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'白龙飞'
                    },{
                        actName: '搞紫色',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',
                        publisher:'肖文淼'
                    }
                ],
                // 搜索后的展示数据
                searchData: [],
                historyData:[],
                pageSize : 5,//每页的信息条数
                ajaxHistoryData:[],//初始化信息条数
                dataCount:0,
                pageNum:0 // 页数
            };
        },

        methods: {
            handleListApproveHistory(){
                this.ajaxHistoryData = this.list;
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

            searchPageNum(length){
                if (length % this.pageSize === 0 && length !== 0){
                    this.pageNum = length / this.pageSize;
                }
                else if(length > this.pageSize)
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
            },

            Search() {
                // search 是 v-model="search" 的 search
                var search = this.search;
                if (search) {
                    this.searchData = this.list.filter(function(product) {
                        // 每一项数据
                        // console.log(product)
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
                    this.historyData = this.searchData;
                    this.searchPageNum(this.searchData.length);
                }else{
                    this.handleListApproveHistory();
                }

            }

        },
        created(){
            this.handleListApproveHistory();

        }
    }
</script>

<style scoped>

</style>
