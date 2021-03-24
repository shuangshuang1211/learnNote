<template>
<div>
	 <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6" v-for="mod in mods">
	     <div class="chart">
		    <a  class="chart-link" @click='go(mod)'>

		        <h4 class="chart-title" >{{mod.name}}</h4>
		        <img class="chart-area" v-bind:src="mod.imgPath">

		    </a>
	    </div>
    </div>
    </div>
</template>	

<script>
import '../style/bootstrap3.3.7.css'
import '../style/index/metisMenu.min.css'
	export default {
        name: 'PageMod',
        props: {
             mods: {
                   type: Array,
                   required: true
             }
        },
        methods:{
        go(mod) {
              this.$router.push('/'+mod.name)
        }
        }
    }

</script>