<template>
  <div id="app">
    <div class="header">
      <img src="../img/xr.png" id="xr">
      <div class="greet">
        {{greetMsg}}！ {{teacher}}老师
      </div>
      <div class="time">
        {{formatDateTime}}
      </div>
    </div>
    <div class="nav">
      <div id="tx">
        <img src="../img/logo.png" alt="头像">
      </div>

      <ul>
        <router-link  :to="{name : 'pubActLink'}">发布活动</router-link>
        <router-link  :to="{name : 'historyLink'}">查询历史活动</router-link>
        <router-link  :to="{name : 'changeInfLink'}">修改活动信息</router-link>
      </ul>
    </div>
    <div id="Inf">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default ({
        name:'index',
        data(){
            return {
                dialogVisible: false,
                date: new Date(),
                timer: null,
                teacher: '白龙飞'
            }
        },
        computed:{
            formatDateTime() {
                const year = this.date.getFullYear()
                const month = (this.date.getMonth() + 1) < 10 ? `0${this.date.getMonth() + 1}` : this.date.getMonth() + 1
                const day = this.date.getDate() < 10 ? `0${this.date.getDate()}` : this.date.getDate()
                const hour = this.date.getHours() < 10 ? `0${this.date.getHours()}` : this.date.getHours()
                const minute = this.date.getMinutes() < 10 ? `0${this.date.getMinutes()}` : this.date.getMinutes()
                const second = this.date.getSeconds() < 10 ? `0${this.date.getSeconds()}` : this.date.getSeconds()
                return `${year}年${month}月${day}日
                        ${hour}:${minute}:${second}`
            },
            greetMsg() {
                const hour = this.date.getHours();

                if (hour >= 0 && hour < 6)
                    return '凌晨时间，请注意休息哦'
                if (hour >= 6 && hour < 12)
                    return '早上好'
                if (hour >= 12 && hour < 13)
                    return '中午好'
                if (hour >= 13 && hour < 19)
                    return '下午好'
                if (hour >= 19 && hour < 20)
                    return '傍晚好'
                if (hour >= 20 && hour < 24)
                    return '晚上好'
                return ''
            }
        },
        created() {
            this.timer = setInterval(() => this.date = new Date(), 500);
        },
        methods:{
            gettime:function() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                return  year + '年' + month +'月' + day + '日' + hours + ':' + minutes + ':' + seconds;
            }
        },
        beforeDestroy() {
            if (this.timer)
                clearInterval(this.timer)
        }


    })

</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }

  #app{
    background-size: cover;
    width: 100%;
    height: 100%;
  }

  .header{
    position: absolute;
    top: 0;
    left: 0%;
    height: 15%;
    width: 100%;
    background-color: #18306e;
  }


  .nav{
    position: absolute;
    top: 15%;
    left: 0;
    width: 20%;
    height: 85%;
    background-color: #1f7ae1;
  }

  .nav ul{
    position: absolute;
    top: 45%;
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
  }

  .nav ul *{
    color: white;
    font-size: 27px;
    font-family: '微软雅黑';
    text-align: center;
    width: 80%;
    height: 30%;
    position: relative;
    left: 10%;
    list-style: none;
    text-decoration: none;
  }

  #Inf{
    position: absolute;
    top: 15%;
    left: 20%;
    width: 80%;
    height: 85%;
  }

  #tx{
    position: relative;
    top: 10%;
    left: 25%;
    width: 60%;
    height: 180px;

  }

  #xr{
    position: absolute;
    left: 0;
    top: 0;
    width: 35%;
    height: 100%;
  }

  #tx img{
    width: 180px;
    height: 180px;
    border-radius: 100%;
  }

  .time{
    width: 25%;
    position: absolute;
    top: 30%;
    left: 75%;
    color: white;
    font-size: 22px;
    text-align: center;
  }

  .greet{
    width: 25%;
    position: absolute;
    top: 60%;
    left: 75%;
    color: white;
    font-size: 22px;
    text-align: center;
  }
</style>
