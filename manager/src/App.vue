<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default ({
      el:'#app',
      data(){
          return {

          }
      },
      created(){
          // debugger
          if (sessionStorage.getItem("InfState")){
              this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("InfState"))));//用本地session寸全局变量信息
          }
          window.addEventListener("beforeunload", () => {
              sessionStorage.setItem("InfState", JSON.stringify(this.$store.state))//刷新之前的相应事件
          })
      }

  })

</script>

<style >
  *{
    margin: 0;
    padding: 0;

  }

  .active{
    background-color: #0043EF;
  }

</style>
