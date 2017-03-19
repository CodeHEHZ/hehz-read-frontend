<template>
    <div :style="styleObj" @onload="console.log(111)">

    </div>
</template>


<script>
    export default{

        data: function() {
            return {
                styleObj: {
                    'background-image': 'url(\'' + this.url + '\')',
                    'background-size': 'cover',
                    width: '100px',
                    height: '150px'
                }
            }
        },
        props: ['url']

    }


</script>

