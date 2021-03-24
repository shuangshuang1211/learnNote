<template>
    <div id="page-wrapper">
            <div class="row">
              <div class="col-lg-12">
                <h3 class="page-header">地磁参考线MagMod</h3>
                
              </div>
            </div>
              
              
          <ul id="myTab" class="nav nav-tabs">
            <li class="active">
              <a href="#home" data-toggle="tab">
                数据源
              </a>
            </li>
            <li>
              <a href="#ios" data-toggle="tab">
                参数
              </a>
            </li>
            <li class="dropdown">
              <a href="#jmeter" data-toggle="tab">
                参数补充
              </a>
            </li>
          </ul>
          <div id="myTabContent" class="tab-content">
            <div class="tab-pane fade in active" id="home">
              <div class="tabcon" style="margin-top:10px;">
                <div class="subbox">
                  <div class="sublist subone">
                    <form method="post" action="">
                      <ul>
                        <li>
                          <span style="padding:5px;">
                            数据源:
                          </span>
                          <input name="datasource" type="text" />
                        </li>
                        <li>
                          <span style="padding:5px;">
                            经度:
                          </span>
                          <input name="longitude" type="text" id="longitude" onchange="checkLongitudeData()"
                          />
                          <span style="padding:5px;">
                            度
                          </span>
                        </li>
                        <li>
                          <span style="padding:5px;">
                            纬度:
                          </span>
                          <input name="latitude" type="text" id="latitude" onchange="checkLatitudeData()"
                          />
                          <span style="padding:5px;">
                            度
                          </span>
                        </li>
                        <li>
                          <span style="padding:5px;">
                            高度:
                          </span>
                          <input name="tideheight" type="text" id="height" onchange="checkHeightData()"
                          />
                          <span style="padding:5px;">
                            m
                          </span>
                        </li>
                        <li>
                          <span style="padding:5px;">
                            时间:
                          </span>
                          <input name="tidetime" type="text" />
                        </li>
                      </ul>
                      <span>
                        <button type="button" class="btn btn-info">
                          帮助
                        </button>
                        <button type="button" class="btn btn-info">
                          运行
                        </button>
                      </span>
                      <span style="padding-left:50px;">
                        <button type="submit" class="btn btn-info">
                          应用
                        </button>
                        <button type="button" class="btn btn-info">
                          确定
                        </button>
                      </span>
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
                      <ul>
                        <li>
                          <span style="padding:5px">
                            潮汐值:
                          </span>
                          <select class="form-control">
                            <option>
                              日潮
                            </option>
                            <option>
                              月潮
                            </option>
                            <option>
                              合成潮
                            </option>
                          </select>
                        </li>
                        <li>
                          <span style="padding:5px">
                            单&nbsp;&nbsp;位:
                          </span>
                          <select class="form-control">
                            <option>
                              毫伽
                            </option>
                            <option>
                              微伽
                            </option>
                          </select>
                        </li>
                        <li>
                          <span style="padding:5px;">
                            重力值:
                          </span>
                          <input type="text" />
                        </li>
                        <li>
                          <span style="padding:5px;">
                            新建列:
                          </span>
                          <label class="radio-inline">
                            <span style="padding:5px;">
                              <input type="radio" name="options" id="optonsRadios1" value="option1"
                              checked>
                              选项1
                            </span>
                          </label>
                          <label class="radio-inline">
                            <span style="padding:5px;">
                              <input type="radio" name="options" id="optonsRadios2" value="option12">
                              选项2
                            </span>
                          </label>
                        </li>
                      </ul>
                      <span>
                        <button type="button" class="btn btn-info">
                          帮助
                        </button>
                        <button type="button" class="btn btn-info">
                          运行
                        </button>
                      </span>
                      <span style="padding-left:50px;">
                        <button type="button" class="btn btn-info">
                          应用
                        </button>
                        <button type="button" class="btn btn-info">
                          确定
                        </button>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="jmeter">
              <p>
                运行模式
              </p>
            </div>
          </div>
              

          </div>
</template>


<script>
import '../style/earthquake/lanrenzhijia.css'

export default {
  name: 'SourceDataMag',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

