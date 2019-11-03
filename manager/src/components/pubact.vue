<template>
  <div>
    <button @click="request">发布活动</button>
    <div v-for="item in users">
      <div>{{item.body}}</div>
      <div>{{item.id}}</div>
      <div>{{item.title}}</div>
      <div>{{item.userId}}</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "pubact",
        data(){
            return{
                users:[]
            }
        },
        methods:{

            request:function () {
                var that = this;
                this.$request
                    .get('/posts')
                    .then(function (response) {
                        console.log(response);
                        that.users = response.data;
                        console.log(that.users)
                        return

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }

        }
    }
</script>

<style scoped>

</style>
