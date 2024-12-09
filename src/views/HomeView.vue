<template>
  <div class="home">
    <Navbar/>
    <Hero id="home"/>
    <Spacing />
    <ToroProducts />
    <Product id="products"/>
    
    <About id="about" />
    <CustomerReview/>
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
import CustomerReview from '@/components/Home/CustomerReview.vue'
import ToroProducts from '@/components/Home/ToroProducts.vue'

export default {
  name: 'HomeView',
  components: {
    Navbar,Hero,About,Product,Footer,Spacing, CustomerReview,ToroProducts
  }
}
</script>
