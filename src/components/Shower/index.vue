<template>
    <div>
      <Navbar />
      <ShowerBath />
      <TabletSoaps />
      <Footer/>
    </div>
  </template>
  
  <script>
  import Footer from '../Footer.vue'
  import Navbar from '../Navbar.vue'
  import ShowerBath from './ShowerBath.vue'
  import TabletSoaps from './TabletSoaps.vue'

  export default {
      components:{Footer, Navbar,TabletSoaps,ShowerBath}
  }
  </script>
  
  <style>
  
  </style>