<template>
  <div>
    <Navbar />
    <div class="flex space-x-4 px-4 py-10 pt-28  md:px-16">
      <!-- Button to show BodyOilDetails, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('bodyOil')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'bodyOil',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'bodyOil'
        }" 
        class="w-1/3 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Body Oil Details
      </button>

      <!-- Button to show FaceSerum, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('serum')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'serum',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'serum'
        }" 
        class="w-1/3 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Face Serum
      </button>

      <!-- Button to show FaceCream, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('cream')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'cream',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'cream'
        }" 
        class="w-1/3 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Face Cream
      </button>
    </div>

    <!-- Conditionally render the active component based on activeComponent -->
    <BodyOilDetails v-if="activeComponent === 'bodyOil'" />
    <FaceSerum v-if="activeComponent === 'serum'" />
    <FaceCream v-if="activeComponent === 'cream'" />
    
    <Footer />
  </div>
</template>

  
<script>
import Footer from '../Footer.vue'
import Navbar from '../Navbar.vue'
import BodyOilDetails from './BodyOilDetails.vue'
import FaceSerum from './FaceSerum.vue'
import FaceCream from './FaceCream.vue'

export default {
  components: {
    Footer,
    Navbar,
    BodyOilDetails,
    FaceSerum,
    FaceCream
  },
  data() {
    return {
      activeComponent: 'bodyOil' // Default component to show BodyOilDetails
    };
  },
  mounted() {
    const savedComponent = localStorage.getItem('activeComponent');
    this.activeComponent = savedComponent || 'bodyOil';
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