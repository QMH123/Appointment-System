<template>
  <div class="body">
    <div class="header">
      <img src="../img/xr.png" id="logo">
      <p>活动预约系统后台管理系统</p>
    </div>
    <div class="from_box">
      <img src="../img/user2.png" id="user" alt="用户">
      <p id="title">用户登录</p>
      <form action="">
        <input type="text" class="ip"  placeholder="用户名" v-model="formMess.account">
        <input type="password" class="ip" placeholder="密码" v-model="formMess.act_pwd">
      </form>
      <button class="but" @click="onSubmit()">登录</button>
    </div>
  </div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: "login",
        data() {
            return {
                formMess: {
                    "account": "",
                    "act_pwd": ""
                }
            };
        },
        methods: {
            onSubmit() {
                console.log(this.formMess.account)
                console.log(this.formMess.act_pwd)
                this.$router.push('/index')
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
    left: 32%;
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
    position: absolute;
    top: 30%;
    right: 10%;
    height: 300px;
    width: 400px;
    background-color: white;
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
    background-color: #18306e;
    border-style: none;
    font-size: 15px;
    color: white;
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

