<template>
  <div>
    <Navbar />
    <LotionDetails />
    <TubeCream />
    <CustomerReview/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '../Footer.vue'
import Navbar from '../Navbar.vue'
import LotionDetails from './LotionDetails.vue'
import TubeCream from './TubeCream.vue'
import CustomerReview from '../Home/CustomerReview.vue'
export default {
    components:{Footer, Navbar, LotionDetails, TubeCream, CustomerReview}
}
</script>

<style>

</style>