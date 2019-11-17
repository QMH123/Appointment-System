
// table.vue
<template>
    <div id="history" class="container">
      <table class="table table-hover">
        <thead>
          <tr>
              <th>活动名称</th>
              <th>活动时间</th>
              <th>活动地点</th>
              <th>详细信息</th>
          </tr>
        </thead>
          <tbody>
            <tr v-for="data in historyData">
              <td>{{data.actName}}</td>
              <td>{{data.actTime}}</td>
              <td>{{data.actPlace}}</td>
              <td><router-link :to="{name : 'moreInfLink' ,params: {actName : data.actName , actTime : data.actTime}}">详细信息</router-link></td>
            </tr>
          </tbody>
      </table>
        <Page :total="pageNum" show-elevator  @on-change="changePage" />
    </div>
</template>
<script>
    export default {
        data () {
            return {
                data9: [
                    {
                        actName: 'John Brown',
                        actTime: "2019.11.11",
                        actPlace: 'New York No. 1 Lake Park',

                    },
                    {
                        actName: 'Jim Green',
                        actTime: "2019.11.11",
                        actPlace: 'London No. 1 Lake Park',

                    },
                    {
                        actName: 'Joe Black',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',

                    },
                    {
                        actName: 'Joe Black',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',

                    },
                    {
                        actName: 'Joe Black',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',

                    },
                    {
                        actName: 'Joe Black',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',

                    },
                    {
                        actName: 'Joe Black',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',

                    },
                    {
                        actName: 'Joe Black',
                        actTime: "2019.11.11",
                        actPlace: 'Sydney No. 1 Lake Park',

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
                var _start = (index - 1) * this.pageSize;
                var _end = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);
            }
        },
        created(){
            this.handleListApproveHistory();
            console.log(this.pageNum);
        }
    }
</script>
