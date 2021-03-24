<template>
	 <div id="page-wrapper">
	   <MdiApp></MdiApp>
       <PageModFrame></PageModFrame>

	 </div>
</template>

<script>
import '../js/jquery.min.js'
import '../js/bootstrap3.3.7.min.js'
import MdiApp from './MdiApp.vue'
import PageModFrame from './PageModFrame.vue'

export default {
  name: 'PageMain',
  components: {MdiApp, PageModFrame},
  methods: {}
}
</script>