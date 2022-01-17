<template>
 <div id="wrapper">
 <Navbar></Navbar>
 <SourceDataMag></SourceDataMag>
 </div>
</template>

<script>
import '../js/jquery.min.js'
import '../js/bootstrap3.3.7.min.js'

import Navbar from './Navbar.vue'
import SourceDataMag from './SourceDataMag.vue'

export default {
  name: 'MagMod',
  components: {Navbar, SourceDataMag},
  methods: {}
}
</script>