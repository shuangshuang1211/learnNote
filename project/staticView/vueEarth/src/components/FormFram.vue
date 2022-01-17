<template>


        <div id="workspace" class="col-lg-12">

          <div class="col-sm-6">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                  填写输入参数
                </h3>
              </div>
              <div class="panel-body">

                <ul id="myTab" class="nav nav-tabs">
                  <li class="active">
                    <a href="#home" data-toggle="tab">
                      数据源
                    </a>
                  </li>
                  <li>
                    <a href="#ios" data-toggle="tab">参数</a>
                  </li>
                  
                </ul>
                <div id="myTabContent" class="tab-content">
                  <div class="tab-pane fade in active" id="home">           
                    <div class="tabcon" style="margin-top:10px;">
                      <div class="subbox">
                        <div class="sublist subone">
                          <form method="post"  class="form-inline">
                          <ul  v-for="inputTextbox in inputTextboxs">
                            <li>
                               <span style="padding:5px;">
                                  {{inputTextbox.parameterName}}
                               </span>
                                  <input v-bind:name="inputTextbox.attributeName" type="text" v-bind:value="inputTextbox.value"/>
                            </li>

                          </ul>

                          <ul v-for="inputOptional in inputOptionals">
                            <li>
                            <span style="padding:5px">{{inputOptional.parameterName}}</span>
                            <select v-bind:name="inputOptional.attributeName" class="form-control" style="margin-left:20px;" >
                              <option v-for="i in inputOptional.value.length" v-bind:value="inputOptional.value">
                              {{inputOptional.value[i-1]}}
                              </option> 
                            </select>
                            </li>
                          </ul>

                          <ul v-for="inputRadio in inputRadios">
                            <li>
                            <span style="padding:5px;">{{inputRadio.parameterName}}</span>
                            <label class="radio-inline"  v-for="i in inputRadio.value.length">
                              <span style="padding:5px;">
                                <input type="radio" v-bind:name="inputRadio.attributeName" v-bind:value="inputRadio.value" >
                                {{inputRadio.value[i-1]}}
                              </span>
                            </label>
                            </li>
                          </ul>


                          </form>
                         

                        </div>
                      </div>
                    </div>
                  </div>

                <div class="tab-pane fade" id="ios">
                    <div class="tabcon" style="margin-top:10px;">
                      <div class="subbox">
                        <div class="sublist subone">
                          <form class="form-inline" method="post">
                            
                            <ul v-for="inputCheckBox in inputCheckBoxs">
                            <li >
                            <span style="padding:5px;">{{inputCheckBox.parameterName}}</span>
                            <label class="radio-inline" v-for="i in inputCheckBox.value.length" >
                              <span style="margin-left:-15px;">
                                <input type="checkbox"  v-bind:name="inputCheckBox.attributeName" v-bind:value="inputCheckBox.value" style="margin-right:15px;">
                                {{inputCheckBox.value[i-1]}}
                              </span>
                            </label>
                            </li>
                          </ul>
                          
                            <label class="radio-inline" v-for="inputTextArea in inputTextAreas" style="margin-right:10px;padding-left:5px;">
                                {{inputTextArea.parameterName}}
                                <textarea row="2" cols="10" style="margin-left:40px;"></textarea>

                            </label>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div>
                  <form method="post"  action=" ">
                            <span>
                            <button type="button" class="btn btn-info"  >帮助</button>
                            <button type="button" class="btn btn-info"  >运行</button>

                          </span>
                          <span style="padding-left:50px;">
                            <button type="button" class="btn btn-info">应用</button>
                            <button type="button" class="btn btn-info">确定</button>
                          </span>
                          </form> 
                </div>

            
              </div>
            </div>
          </div>

        </div>

          


</template>

<script>

import '../style/bootstrap3.3.7.css'
import '../style/index/metisMenu.min.css'

	export default {
        name: 'FormFram',
        props: {
              inputTextboxs: {
                       type: Array,
                        required: true
                    },
              inputOptionals:{
                        type: Array,
                        required: true
                      },
              inputRadios:{
                        type: Array,
                        required: true
                      },
              inputCheckBoxs:{
                        type: Array,
                        required: true
                      },
              inputTextAreas:{
                        type: Array,
                        required: true
                      }        
              }
    }

</script>