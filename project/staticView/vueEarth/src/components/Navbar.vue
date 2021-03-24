<template>
<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
    <NavbarName></NavbarName>
    <NavbarRight></NavbarRight>
    <NavbarLeft></NavbarLeft>
</nav>
</template>

<script>

import NavbarName from './NavbarName.vue'
import NavbarRight from './NavbarRight.vue'
import NavbarLeft from './NavbarLeft.vue'
export default {
  name: 'Navbar',
  components: {NavbarName, NavbarRight,NavbarLeft},
  methods: {}
}
</script>