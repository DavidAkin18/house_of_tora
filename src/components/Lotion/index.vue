<template>
  <div class="">
    <Navbar />
    <div class="flex space-x-4 px-4 py-10 pt-28  md:px-16">
      <!-- Button to show LotionDetails, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('lotion')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'lotion',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'lotion'
        }" 
        class="w-1/2 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Lotion 
      </button>
      
      <!-- Button to show TubeCream, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('cream')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'cream',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'cream'
        }" 
        class="w-1/2 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Tube Cream
      </button>
    </div>

    <!-- Conditionally render LotionDetails or TubeCream based on activeComponent -->
    <LotionDetails v-if="activeComponent === 'lotion'" />
    <TubeCream v-if="activeComponent === 'cream'" />
    
    <CustomerReview />
    <Footer />
  </div>
</template>





<script>
import Footer from '../Footer.vue'
import Navbar from '../Navbar.vue'
import LotionDetails from './LotionDetails.vue'
import TubeCream from './TubeCream.vue'
import CustomerReview from '../Home/CustomerReview.vue'

export default {
  components: {
    Footer,
    Navbar,
    LotionDetails,
    TubeCream,
    CustomerReview
  },
  data() {
    return {
      activeComponent: 'lotion' // default to showing LotionDetails initially
    };
  },
  mounted() {
    const savedComponent = localStorage.getItem('activeComponent');
    this.activeComponent = savedComponent || 'lotion';
  },
  methods: {
    toggleComponent(component) {
      this.activeComponent = component;
      localStorage.setItem('activeComponent', component);
    }
  },
}
</script>


<style scoped>

</style>
