<template>
    <div class="box">
      <form action="">
        <ul>
          <li>活动主题<input type="text" v-model="theme"></li>
          <li>活动时间<input type="text" v-model="time"></li>
          <li>活动地点<input type="text" v-model="address"></li>
          <li>活动简介</li>
        </ul>
        <textarea name="info" id="info" v-model="introduction"></textarea>
          <button @click="publish">发布活动</button>
      </form>

  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "pubact",
        data(){
            return{
                theme:'',
                time:'',
                address:'',
                introduction:''
            }
        },
        methods:{
            publish() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var publish_time = year + '-' + month + '-' + day;
                let data = {"theme":this.theme,"time":this.time,
                            "address":this.address,"introduction":this.introduction
                            "publisher":,"publish_time":this.publish_time};
                console.log(this.teaNumber)
                console.log(this.teaPass)
                this.$request
                    .post('/login',data)
                    .then(res=>{

                        console.log(res);
                    })

            }

        }
    }
</script>

<style scoped>
  .box{
    position: absolute;
    top: 3%;
    left: 10%;
    height: 97%;
    width: 80%;
    background-color: #fffefa;
    box-shadow: #494b47 3px 3px 10px;
    border-radius: 20px;
  }

  .box form{
    position: absolute;
    top: 5%;
    left: 20%;
    width: 60%;
    height: 85%;
    font-size: 20px;
    font-family: ' DFKai-SB';
    font-weight: 400;
  }
  .box form ul {
    list-style: none;
  }

  .box form ul li{
    margin-top: 20px;
  }

  .box form ul li input{
    font-size: 20px;
    font-family: ' DFKai-SB';
    height: 25px;
    margin-left: 50px;
    border-style: none;
    border-bottom: 1px solid #18306e;
    outline: none;
    background-color: #fffefa;

  }

  #info{
    position: relative;
    top: 15px;
    width: 100%;
    height: 40%;
    outline: none;
  }

  button{
    position: relative;
    top: 60px;
    font-size: 20px;
    color: white;
    background-color: #18306e;
    height: 60px;
    width: 150px;
  }

</style>
