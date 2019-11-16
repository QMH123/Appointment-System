<template>
    <div id="history">
      <div v-for="inf in Inf" id="headBox">
        <div class="everyBlock">
          <div>发布时间: {{inf.actTime}}</div>
          <div>发布人:{{inf.whoDoAct}}</div>
          <div>题目: {{inf.actTheme}}</div>
          <div>地点: {{inf.actPlace}}</div>
          <div>内容介绍:{{inf.actInf}}</div>
        </div>
      </div>
      <div id="pageNav">
        <nav aria-label="Page navigation">
          <ul class="pagination">

            <li v-for="i in helpArray"  ><router-link to="/history" >{{i}}</router-link></li>

          </ul>
        </nav>
      </div>
    </div>
</template>

<script>
    export default {
        name: "history",
        props:[],//传给路由
        routs:"/history",
        data(){
            return {
                helpArray:[],//建立辅助数组
                currentPage:1,
                pageNum:0,

                Inf : [{
                    actTime:"2019.11.11",
                    actTheme:"成电讲坛",
                    actPlace:"三教401",
                    actInf:"我们遇到什么困难，也不要怕，微笑着面对他，消除恐惧的办法就是面对恐惧",
                    whoDoAct:"白龙飞"
                },
                    {
                        actTime:"2019.11.11",
                        actTheme:"成电讲坛",
                        actPlace:"三教401",
                        actInf:"我们遇到什么困难，也不要怕，微笑着面对他，消除恐惧的办法就是面对恐惧",
                        whoDoAct:"白龙飞"
                    },
                    {
                        actTime:"2019.11.11",
                        actTheme:"成电讲坛",
                        actPlace:"三教401",
                        actInf:"我们遇到什么困难，也不要怕，微笑着面对他，消除恐惧的办法就是面对恐惧",
                        whoDoAct:"白龙飞"
                    },
                    {
                        actTime:"2019.11.11",
                        actTheme:"成电讲坛",
                        actPlace:"三教401",
                        actInf:"我们遇到什么困难，也不要怕，微笑着面对他，消除恐惧的办法就是面对恐惧",
                        whoDoAct:"白龙飞"
                    },
                    {
                        actTime:"2019.11.11",
                        actTheme:"成电讲坛",
                        actPlace:"三教401",
                        actInf:"我们遇到什么困难，也不要怕，微笑着面对他，消除恐惧的办法就是面对恐惧",
                        whoDoAct:"白龙飞"
                    },
                    {
                        actTime:"2019.11.11",
                        actTheme:"成电讲坛",
                        actPlace:"三教401",
                        actInf:"我们遇到什么困难，也不要怕，微笑着面对他，消除恐惧的办法就是面对恐惧",
                        whoDoAct:"白龙飞"
                    },
                    {
                        actTime:"2019.11.11",
                        actTheme:"成电讲坛",
                        actPlace:"三教401",
                        actInf:"我们遇到什么困难，也不要怕，微笑着面对他，消除恐惧的办法就是面对恐惧",
                        whoDoAct:"白龙飞"
                    }]
            }
        },
        created() {
            // console.log(this.$route.params);
            const totalPage = this.Inf.length;
            this.pageNum =  Math.trunc(totalPage / 4) + 1; //为了保证页数足够，应该向上取整，so+1
            for (var i = 1 ; i <= this.pageNum ; i++){

                this.helpArray.push(i);//把页面id数推进去
            }
            // console.log(this.helpArray)
        }

    }
</script>

<style scoped>
  template{
    position: relative;
  }
  #history{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .everyBlock{
    width: 90%;
    height: 20em;
    background-color: #F9F9F9;
    margin: 0 auto;
  }

  #headBox{
    padding: 30px 0 30px;
    border: 1px #EDEDED solid;
    width: 90%;
    border-radius: 20px;
    margin: 5% auto;
    box-shadow: 10px 10px 5px 1px #EDEDED ;
  }
</style>
