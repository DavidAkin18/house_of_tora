<template>
  <Navbar/>
  <FaceWashDetails />
  <Cleansers/>
  <Footer/>
</template>

<script>
import Footer from '../Footer.vue'
import Navbar from '../Navbar.vue'
import Cleansers from './Cleansers.vue'
import FaceWashDetails from './FaceWashDetails.vue'

export default {
    components:{FaceWashDetails,Cleansers, Navbar, Footer}
}
</script>

<style>

</style>