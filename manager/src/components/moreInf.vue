<template>
  <div id="moreInf">
    <div id="theActInf">
      <h2 id="actName">{{actName}}</h2>
      <p id="actTime">时间：{{actTime}}</p>
    </div>
      <h5>人员名单如下:</h5>
      <Table :columns="columns8" :data="data7" size="large" ref="table"></Table>
      <br>
      <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
    <!--  <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>-->
    <!--  <Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> Export custom data</Button>-->
  </div>
</template>
<script>
    export default {
        data () {
            return {
                actName : "",
                actTime : "",
                columns8: [
                    {
                        "title": "报名同学名字",
                        "key": "name",
                        "width": 300,
                        "sortable": true
                    },
                    {
                        "title": "报名时间",
                        "key": "time",
                        "width": 150,
                        "sortable": true
                    }
                ],
                data7: [
                    {
                        "name": "Name1",
                        "time": "2019.11.12"
                    },
                    {
                        "name": "Name1",
                        "time": "2019.11.13"
                    },
                    {
                        "name": "Name1",
                        "time": "2019.11.14"
                    },
                    {
                        "name": "Name1",
                        "time": "2019.11.15"
                    },
                    {
                        "name": "Name1",
                        "time": "2019.11.16"
                    },
                    {
                        "name": "Name1",
                        "time": "2019.11.17"
                    },
                    {
                        "name": "Name1",
                        "time": "2019.11.18"
                    },
                    {
                        "name": "Name1",
                        "time": "2019.11.19"
                    },
                    {
                        "name": "Name1",
                        "time": "2019.11.12"
                    },
                    {
                        "name": "Name1",
                        "time": "2019.11.12"
                    }
                ]
            }
        },
        methods: {
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: 'Custom data',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            }
        },
        created() {
            console.log(this.$route.params);//这个是router传递过来的值
            this.actName = this.$route.params.actName;
            this.actTime = this.$route.params.actTime;
        }
    }
</script>
<style scoped>
  #theActInf{
    margin-top: 1% ;
    margin-left: 12%;
  }

  h5{

    margin-bottom: 20px;
  }

</style>
