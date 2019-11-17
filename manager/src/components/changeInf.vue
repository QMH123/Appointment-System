<template>
  <div class="safetyInfo">
    <Input search enter-button placeholder="输入活动名称搜索" v-model="search" @on-search="btn"/>
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
      <tr v-for="item in searchData">
        <td>{{item.name}}</td>
        <td>{{item.date}}</td>
        <td>{{item.depart}}</td>
        <td><router-link to="/history">详细信息</router-link></td>
        <router-view></router-view>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
    export default {
        name: 'changeInf',
        data () {
            return {
                search:'',
                searchData: '',
                products:[
                    //假数据
                    {name:"数据1",date:'2018-01-04',depart:'泸化工1'},
                    {name:"数据2",date:'2018-01-25',depart:'泸化工2'},
                    {name:"数据3",date:'2018-02-10',depart:'泸化工3'},
                    {name:"数据4",date:'2018-03-04',depart:'泸化工4'},
                    {name:"数据5",date:'2018-05-24',depart:'泸化工5'},
                    {name:"数据6",date:'2018-10-29',depart:'泸化工6'}
                ]
            }
        },
        methods:{
            btn:function(){

                var search = this.search;
                if (search) {
                    this.searchData =  this.products.filter(function(product) {
                        console.log(product)
                        return Object.keys(product).some(function(key) {
                            console.log(key)
                            return String(product[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>
