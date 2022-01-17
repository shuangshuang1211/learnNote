<template>
<div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav navbar-collapse">
      <ul class="nav" id="side-menu"> 
                <NavbarLeftSearch></NavbarLeftSearch>
                <NavbarLeftUserset></NavbarLeftUserset>
                <NavbarLeftAppModule></NavbarLeftAppModule>
                <NavbarLeftGmiModule></NavbarLeftGmiModule>
                <NavbarLeftGmi></NavbarLeftGmi>
                <NavbarLeftCaseshow></NavbarLeftCaseshow>
                <NavbarLeftLogout></NavbarLeftLogout>
                <NavbarLeftImportPara></NavbarLeftImportPara>
    </ul>
    </div>
</div>
       

</template>

<script>
import '../js/jquery.min.js'
import '../js/bootstrap3.3.7.min.js'
import '../js/metisMenu.min.js'
import '../js/raphael.min.js'
import '../js/sb-admin-2.js'
import NavbarLeftSearch from './NavbarLeftSearch.vue'
import NavbarLeftUserset from './NavbarLeftUserset.vue'
import NavbarLeftAppModule from './NavbarLeftAppModule.vue'
import NavbarLeftGmiModule from './NavbarLeftGmiModule.vue'
import NavbarLeftGmi from './NavbarLeftGmi.vue'
import NavbarLeftCaseshow from './NavbarLeftCaseshow.vue'
import NavbarLeftLogout from './NavbarLeftLogout.vue'
import NavbarLeftImportPara from './NavbarLeftImportPara.vue'

export default {
  name: 'NavbarLeft',
  components: {
               NavbarLeftSearch, 
               NavbarLeftUserset, 
               NavbarLeftAppModule,
               NavbarLeftGmiModule,
               NavbarLeftGmi,
               NavbarLeftCaseshow,
               NavbarLeftLogout,
               NavbarLeftImportPara
               }

}
</script>