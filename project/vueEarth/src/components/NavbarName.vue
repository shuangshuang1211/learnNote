<template>
    <div class="navbar-header" id="navbarname">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">导航</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="./index.html">{{ msg }}</a>
    </div>
</template>


<script>

export default {
  name: 'NavbarName',
  data () {
    return {
      msg: '综合地球物理反演与解释一体化平台'
    }
  }
}
</script>

