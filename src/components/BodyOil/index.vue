<template>
    <div>
      <Navbar />
      <BodyOilDetails />
      <FaceSerum />
      <FaceCream />
      <Footer/>
    </div>
  </template>
  
  <script>
  import Footer from '../Footer.vue'
  import Navbar from '../Navbar.vue'
  import FaceSerum from './FaceSerum.vue'
  import FaceCream from './FaceCream.vue'
  import BodyOilDetails from './BodyOilDetails.vue'
  export default {
      components:{Footer, Navbar, BodyOilDetails, FaceSerum, FaceCream }
  }
  </script>
  
  <style>
  
  </style>