<template>
  <div>
    <Table stripe :columns="columns1" :data="data1"></Table>
  </div>

</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '活动名称',
                        key: 'Name'
                    },
                    {
                        title: '活动时间',
                        key: 'Time'
                    },
                    {
                        title: '活动地点',
                        key: 'address'
                    },
                    {
                        title: '发布人',
                        key: 'publisher'
                    },
                    {
                        title: '预约详情',
                        key: 'student'
                    }
                ],
                data1: [
                    {
                        Name: '一起Van♂游戏',
                        Time: 2019-11-16,
                        address: '沙河图书馆',
                        publisher: '白龙飞'
                    },
                    {
                        Name: '一起Van♂游戏',
                        Time: 2019-11-16,
                        address: '沙河图书馆',
                        publisher: '白龙飞'
                    }
                ]
            }
        }
    }
</script>



<style scoped>

</style>
