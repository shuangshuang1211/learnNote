<template>
 <div id="wrapper">
 <Navbar></Navbar>
 <SourceData></SourceData>
 </div>
</template>

<script>
import '../js/jquery.min.js'
import '../js/bootstrap3.3.7.min.js'

import Navbar from './Navbar.vue'
import SourceData from './SourceData.vue'

export default {
  name: 'EarthTide',
  components: {Navbar, SourceData},
  methods: {}
}
</script>