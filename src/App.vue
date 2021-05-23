<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Navbar
  }
}
</script>

<style>
.img{
  height: 100px;
  width: auto;
}

.header{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
