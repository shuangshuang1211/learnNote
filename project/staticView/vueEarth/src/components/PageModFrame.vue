<template>
    <div class="row">
      <div id="page">
      <PageMod v-bind:mods = "mods"></PageMod>
      </div>
    </div>
</template>	

<script>

import '../style/bootstrap3.3.7.css'
import '../style/index/metisMenu.min.css'
import PageMod from './PageMod.vue'

var mods=[];
export default {
        name: 'PageModFrame',
        components: {PageMod},
        data() {
            return {
              mods:[],
            }
            
      },

       created () {
          fetch('http://127.0.0.1:8080/static/data.json')
          .then(response => response.json())
          .then(json =>{
                this.mods = json.moddata
          }
          )
       }

}
</script>
