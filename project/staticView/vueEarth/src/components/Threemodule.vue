<template>
    <div class="three-module">
        <h2>我是第三个组件，我要实现“子向父传值”</h2>
        <button v-on:click = "changeTitle">点击我修改上边父组件的值</button>
        <p>{{msgOfP}}</p>
    </div>   
</template>
<script>
    export default {
        name: "Threemodule",
        props: ["msgOfP"],
        data () {
            return {
 
            }
        },
        methods: {
            changeTitle: function(){
                this.$emit("titleChanged","改掉了，这是three-module子组件传过来的数据")
            }
        }
    }
</script>
<style scoped>
    .three-module{
        margin: 10px 0;
    }
    h2{
        color: #f0f;
        padding: 20px 0;
        background: #222;
    }
</style>