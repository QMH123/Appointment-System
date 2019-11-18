<template>
  <div class="box">
    <form action="" class="form">
      <ul class="col-sm-12">
        <li class="input-group">活动主题<input type="text" v-model="activity.actTitle" class="form-control"></li>
        <li class="input-group">活动时间<input type="text" v-model="activity.actTime" class="form-control"></li>
        <li class="input-group">活动地点<input type="text" v-model="activity.actPlace" class="form-control"></li>
        <li >活动简介</li>
      </ul>
      <div class="input-group">
        <textarea name="info" id="info" v-model="activity.actIntro" class="form-control" rows="8" ></textarea>
      </div>
      <div class="check-box-group">
        <div class="check1"><input type="checkbox"  v-model="activity.isUrgent">紧急事件</div>
        <div class="check2"> <input type="checkbox"  v-model="activity.isTop">是否置顶</div>

      </div>

    </form>
    <div class="btn-group">
      <button @click="pub" class="btn  btn-primary">确认修改</button>
    </div>

  </div>
</template>

<script>
    export default {
        name: "pubchange",
        data(){
            return{
                activity:
                    {
                        actid:'',
                        actTitle:'',
                        actTime:'',
                        actPlace:'',
                        actIntro:'',
                        teaName:'',
                        isUrgent:0,
                        isTop:0,
                    }

            }
        },
        created() {
            //console.log(this.$route.params);//这个是router传递过来的值
            this.activity.teaName = this.$store.state.teaName;
            this.activity.actTitle = this.$route.params.actTitle;
            this.activity.actTime = this.$route.params.actTime;
            this.activity.actPlace = this.$route.params.actPlace;
            this.activity.actIntro = this.$route.params.actIntro;
            this.activity.actid = this.$route.params.actid;
            this.activity.isUrgent = this.$route.params.isUrgent;
            this.activity.isTop = this.$route.params.isTop;
        },
        methods:{
            pub: function () {
                var that = this;
                 console.log(that.activity);
                this.$request
                    .post('/updateAct',
                        {
                            params: {
                                activity:that.activity
                            }
                        })
                    .then(res=>{
                        console.log(res.data)

                    })
                this.$router.push('/changeInf')
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

  .check-box-group{
    position: relative;
    top: 30px;
  }



  .btn-group{
    position: relative;
    left: 60%;
    top: 77%;
  }
</style>
