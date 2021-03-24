<template>
 <div id="wrapper">
 <Navbar></Navbar>
 <PageMain></PageMain>
 </div>
</template>

<script>
import '../js/jquery.min.js'
import '../js/bootstrap3.3.7.min.js'

import Navbar from './Navbar.vue'
import PageMain from './PageMain.vue'

export default {
  name: 'ModelIver',
  components: {Navbar, PageMain},
  methods: {}
}
</script>