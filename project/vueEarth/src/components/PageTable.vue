<template>
 <div id="wrapper">
 <Navbar></Navbar>
     <div id="page-wrapper" >
          <div class="row" >
               <div class="col-lg-12" style="padding:25px;margin-left:20px;font:15px Times,serif;">
                    <input id ="file" type="file" accept=".json"   @change="importJson()"  multiple="multiple" />
               </div>
                  
          </div>
           <FormFram v-bind:inputTextboxs = "inputTextboxs" v-bind:inputOptionals = "inputOptionals"  
           v-bind:inputRadios = "inputRadios" v-bind:inputCheckBoxs="inputCheckBoxs" 
           v-bind:inputTextAreas="inputTextAreas"></FormFram>     
     </div>  
  



 </div>
</template>

<script>
import '../js/jquery.min.js'
import '../js/bootstrap3.3.7.min.js'
import FileSaver from 'file-saver'

import Navbar from './Navbar.vue'
import FormFram from './FormFram.vue'

export default {
  name: 'PageTable',
  components: {Navbar, FormFram},
  data() {
      return {
        inputTextboxs: [],
        inputOptionals:[],
        inputRadios:[],
        inputCheckBoxs:[],
        inputTextAreas:[]
      }
  },
/*   created () {
          fetch(file)
          .then(response => response.json())
          .then(json =>{
                this.sites = json.parameters
    }
)
}, */
   methods:{
           importJson() {
              var file = document.getElementById('file').files[0];
              var reader = new FileReader();
              reader.readAsText(file);
              const _this = this;
              reader.onload = function () {
                 _this.importJson = JSON.parse(this.result);
                _this.inputTextboxs=_this.importJson.Textboxs;
                _this.inputOptionals=_this.importJson.Optionals;
                _this.inputRadios=_this.importJson.Radios;
                _this.inputCheckBoxs=_this.importJson.Checkboxs;
                _this.inputTextAreas=_this.importJson.Textareas;
              }
           }
   }
}
</script>

