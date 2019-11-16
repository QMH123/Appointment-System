<template>
  <div>
    <i-button @click="show">Click me!</i-button>
    <Modal v-model="visible" title="Welcome">Welcome to ViewUI</Modal>
  </div>
</template>


<script>

    export default {
        name: "changeInf",
        data: {
            visible: false
        },
        methods: {
            show: function () {
                this.visible = true;
            }
        }
    }
</script>

<style scoped>

</style>
