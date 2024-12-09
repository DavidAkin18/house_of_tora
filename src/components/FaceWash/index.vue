<template>
  <div>
    <Navbar />
    <div class="flex space-x-4 px-4 py-10 pt-28  md:px-16">
      <!-- Button to show FaceWashDetails, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('faceWash')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'faceWash',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'faceWash'
        }" 
        class="w-1/2 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Face Wash 
      </button>

      <!-- Button to show Cleansers, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('cleansers')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'cleansers',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'cleansers'
        }" 
        class="w-1/2 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Cleansers
      </button>
      <button 
        @click="toggleComponent('toner')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'toner',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'toner'
        }" 
        class="w-1/3 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Toner
      </button>
    </div>
   

    <!-- Conditionally render the active component based on activeComponent -->
    <FaceWashDetails v-if="activeComponent === 'faceWash'" />
    <Cleansers v-if="activeComponent === 'cleansers'" />
    <Toner v-if="activeComponent === 'toner'"/>
    
    <Footer />
  </div>
</template>


<script>
import Footer from '../Footer.vue'
import Navbar from '../Navbar.vue'
import Cleansers from './Cleansers.vue'
import FaceWashDetails from './FaceWashDetails.vue'
import Toner from './Toner.vue'

export default {
  components: {
    Footer,
    Navbar,
    Cleansers,
    FaceWashDetails,
    Toner
  },
  data() {
    return {
      activeComponent: 'faceWash' // Default component to show FaceWashDetails
    };
  },
  mounted() {
    const savedComponent = localStorage.getItem('activeComponent');
    if (savedComponent) {
      this.activeComponent = savedComponent;
    }
  },
  methods: {
    toggleComponent(component) {
      this.activeComponent = component;
      localStorage.setItem('activeComponent', component);
    }
  },
}
</script>


<style>

</style>