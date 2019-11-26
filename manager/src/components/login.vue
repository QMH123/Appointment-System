<template>
  <div class="body">
    <div class="header">
      <img src="../img/xr.png" id="logo">
      <p>活动预约系统后台管理系统</p>
    </div>
    <div class="from_box">
      <img src="../img/user2.png" id="user" alt="用户">
      <p id="title">用户登录</p>
      <form action="" class="form-group">
        <input type="text"   placeholder="用户名" v-model="teaNumber" class="form-control ip">
        <input type="password"  placeholder="密码" v-model="teaPass" class="form-control ip">
      </form>
      <div class="brn-group">
        <button class="but btn-primary" @click="onSubmit()" >登录</button>
      </div>
    </div>
  </div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: "login",
        data() {
            return {
                    "teaNumber": "",
                    "teaPass": "",
                     teaName : "" //这里设置是为了判定和缓存是否一样 如果不一样 则进行替换

            };
        },
        beforeRouteLeave(to,from,next)//如果要保持刷新不变 则利用session使用组件守卫，别用全局守卫，全局守卫不好控制
        {
            debugger
                // this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("InfState"))));
            sessionStorage.setItem("InfState",Object.assign({},JSON.stringify(this.$route.state)));//这里可以不用判断，如果不等赋值是正确的，如果相等，赋值不影响，所以可以不用if判断
            let localTeaName = this.$store.state.teaName;
            console.log(localTeaName);
            debugger
            if (localTeaName){
                alert(localTeaName + "老师，您好！");
                next();
            }
            else{
                alert("请先进行登录！");
                next("/login");
            }
        }
        ,
        methods: {
            onSubmit:function() {
                //console.log("wdnmd");
                var that = this;
                //             let data = {"teaNumber":that.teaNumber,"name":that.teaPass};
                // console.log(JSON.stringify(data));
                this.$request
                    .post('/login',{
                        params:{
                            "teaNumber":that.teaNumber,
                            "teaPass":that.teaPass
                        }
                    })
                    .then(res=>{
                        if(res.data == null){
                            alert('账号或密码错误')
                        }else{
                            console.log(res.data[0].teaName);
                            console.log(res.data[0].teaNumber);
                            this.teaName = res.data[0].teaName;//赋值
                            this.$store.commit('login',res.data)
                            console.log(this.$store.state.teaName)
                            console.log(this.$store.state.teaNumber)
                            this.$router.push('/index')
                        }

                    })


            }
        }
    }
</script>

<style scoped >
  *{
    margin: 0;
    padding: 0;
  }
  .body{
    position: fixed;
    background-image: url("../img/bg.png");
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .header{
    position: absolute;
    top: 0;
    left: 0;
    height: 10%;
    width: 100%;
    background-color: white;
  }

  .header p{
    position: absolute;
    top: 30%;
    right: 10%;
    font-size: 32px;

  }

  #logo{
    position: absolute;
    top: 0%;
    left: 5%;
    height: 100%;
    width: 400px;
  }

  .from_box{
    background-color: #EDEDED;
    position: absolute;
    top: 30%;
    right: 10%;
    height: 300px;
    width: 400px;
    opacity: 0.8;
    border: 1px gray solid;
    border-radius: 10px;
  }

  .from_box form{
    position: absolute;
    top: 30%;
    left: 20%;
    width: 60%;
    display: flex;
    flex-direction: column;
  }

  .ip{
    margin-top: 10px;
    width: 100%;
    height: 30px;
  }

  .but{
    position: absolute;
    bottom: 20%;
    width: 60%;
    left: 20%;
    height: 30px;
    font-size: 15px;
  }

  #title{
    position: absolute;
    top: 7%;
    left: 35%;
    font-size: 28px;
    font-weight: bolder;
    color: #18306e;
  }

  #user{
    position: absolute;
    top: 5%;
    left: 20%;
    height: 50px;
    width: 50px;
  }



</style>

