<template>
  <div class="home">
    <Navbar/>
    <Hero />
    <Product/>
    <About  />
    <Spacing />
    <Footer/>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Home/Hero.vue'
import About from '@/components/Home/About.vue'
import Product from '@/components/Home/Product.vue'
import Footer from '@/components/Footer.vue'
import Spacing from '@/components/Spacing.vue'

export default {
  name: 'HomeView',
  components: {
    Navbar,Hero,About,Product,Footer,Spacing
  }
}
</script>
