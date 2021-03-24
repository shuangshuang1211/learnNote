<template>
    <div class="second-module module-cont"> 
        <h3 class="txts-cont">
            {{secondlist}}
            <p class="info-p" >! {{ msgOfP }}</p>
        </h3>
        <div class="new-lists">
            <ul class="lists">
                <li v-for="item in newlists">
                    <a href="javascript:;" title="item.title">
                        <p>{{item.title}}</p>
                        <span>{{item.time}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div>
            <p class="error">如果你想尝试更改父组件传过来的引用值，那么其他子组件中引用的值也会报错哦！</p>
            <button class="sec-btn" v-on:click="changeArray">点击我,左边的列表组件也会减少就是一个例子</button>
            <button class="sec-btn" v-on:click="changeString">点击我,更改父组件App中title的值</button>
        </div>
        <three-module v-bind:msgOfP = "msgOfP" v-on:titleChanged = "zidingyi($event)"></three-module>
    </div>
</template>
<script>
    import Threemodule from './Threemodule'
    export default {
        name: "Secondmodule",
        components: {
            "three-module": Threemodule
        },
        props: {
            newlists: {
                type: Array,
                required: true
            },
            secondlist: {
                type: String,
                required: true
            }
        },//获取父组件数据的第二种方式：prop验证.注意写法。定义接受值的类型，并且用对象的形式设置。
        data () {
            return {
                msgOfP : "我在second-module子组件中，我是three-module的父组件，一会儿three-module要修改我。"
            }
        },
        methods: {
            changeArray: function() {
                this.newlists.pop();
            },
            changeString: function(){
                this.secondlist = "改了";
            },
            zidingyi(msg){
                this.msgOfP = msg;
            }
        }
    }
</script>
<style>
    .error{
        color: #f6f;
        font-weight: bold;
    }
    .second-module{
        margin-left: 27%;
        background: #f5f5f5;
    }
    ul{
        background: white;
    }
    .module-cont{
        border: 2px solid Lightgreen;
        border-radius: 5px;
    }
    .txts-cont{
        margin: 0;
        padding: 10px 0;
        border-bottom: 3px solid Lightgreen;
        background: #fff;
    }
    button:hover{
        cursor: pointer;
    }
    button:focus{
        outline: none;
    }
</style>
<style scoped>
    button{
        padding: 10px;
        margin: 10px;
        color: #fff;
        border-radius: 5px;
        border: 1px solid #4488ff;
        background: #4488ff;
    }
    button:hover{
        background: #3a76de;
    }
    .info-p{
        padding-top: 10px;
        font-size: 14px;
        color: red;
        border-top: 2px solid #dedede;
    }
</style>