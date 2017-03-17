<template>
   <ul>
       <li v-for="book in bookList">
           {{book}}
       </li>
   </ul>

</template>

<script>
    export default {
        data: function () {
            return {
                bookList: [
                    '战争与和平', '神秘的西双版纳', '我与狗狗的十个约定'
                ]
            }
        }
    }
</script>

<style>
</style>