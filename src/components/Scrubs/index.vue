<template>
  <Navbar />
  <ScrubDetails/>
  <Supplement />
  <Footer />
</template>

<script>
import Footer from '../Footer.vue'
import Navbar from '../Navbar.vue'
import ScrubDetails from './ScrubDetails.vue'
import Supplement from './Supplement.vue'

export default {
    components:{Supplement,ScrubDetails, Footer, Navbar}
}
</script>

<style>

</style>