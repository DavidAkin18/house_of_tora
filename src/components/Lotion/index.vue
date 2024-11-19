<template>
  <div>
    <Navbar />
    <LotionDetails />
    <TubeCream />
    <Footer/>
  </div>
</template>

<script>
import Footer from '../Footer.vue'
import Navbar from '../Navbar.vue'
import LotionDetails from './LotionDetails.vue'
import TubeCream from './TubeCream.vue'
export default {
    components:{Footer, Navbar, LotionDetails, TubeCream}
}
</script>

<style>

</style>