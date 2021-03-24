<template>
                <li>
                    <a @click='go()'><i class="fa fa-dashboard fa-fw"></i> 导入参数</a>
                </li>

</template>

<script>
import '../js/jquery.min.js'
import '../js/bootstrap3.3.7.min.js'
export default {
  name: 'NavbarLeftImportPara',
  methods:{
        go() {
              this.$router.push('/test')
        }
        }

}
</script>