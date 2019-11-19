<template>
    <div class="box">
      <form action="" class="form">
        <ul class="col-sm-12">
          <li class="input-group">活动主题<input type="text" v-model="theme" class="form-control"></li>
          <li class="input-group">活动时间<input type="text" v-model="time" class="form-control"></li>
          <li class="input-group">活动地点<input type="text" v-model="address" class="form-control"></li>
          <li >活动简介</li>
        </ul>
        <div class="input-group">
          <textarea name="info" id="info" v-model="introduction" class="form-control" rows="8" ></textarea>
        </div>
        <div class="checkbox" id="checkbox">
          <label>
            <input type="checkbox" v-model="isSerious">紧急事件
          </label>
          <label>
            <input type="checkbox" v-model="isTop">是否置顶
          </label>
        </div>


      </form>
      <div class="btn-group" id="btn">
        <button   @click="publish" class="btn  btn-primary">发布活动</button>
      </div>

  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "pubact",
        data(){
            return{
                isTop:false,
                theme:'',
                time:'',
                address:'',
                introduction:'',
                isSerious: false
            }
        },
        methods:{
            publish() {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let publish_time = year + '-' + month + '-' + day;
                //判断
                if (this.theme === "")
                {
                    alert("主题不能为空，请更改信息.");
                    return ;
                }
                else if (this.address === "")
                {
                    alert("地址不能为空，请更改信息.");
                    return ;
                }
                else if (this.time === "")
                {
                    alert("时间不能为空，请更改信息.")
                    return;
                }
                let data = {"actTitle":this.theme,"actTime":this.time,
                            "actPlace":this.address,"actIntro":this.introduction,
                            "teaName": this.$store.state.teaName, "isUrgent" : this.isSerious,
                            "isTop": this.isTop
                              };
                console.log(data);
                this.$request
                    .post('/upAct',data)
                    .then(res=>{
                        confirm("添加成功");
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
    background-color: white;
    box-shadow: #494b47 3px 3px 10px;
    border-radius: 20px;
  }

  .box form{
    position: absolute;
    top: 5%;
    left: 20%;
    width: 60%;
    height: 95%;
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
    background-color: white;

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
    height: 60px;
    width: 150px;
  }


  .input-group > textarea{
    resize:none;
    height: 250px;
  }

  #checkbox{
    margin-top: 20px;
  }

  #btn{
    margin-top: 60%;
    margin-left: 10%;
  }


</style>
