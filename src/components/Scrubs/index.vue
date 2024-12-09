<template>
  <div>
    <Navbar />
    
    <div class="flex space-x-4 px-4 py-10 pt-28  md:px-16">
      <!-- Button to show ScrubDetails, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('scrubDetails')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'scrubDetails',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'scrubDetails'
        }" 
        class="w-1/2 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Scrubs 
      </button>

      <!-- Button to show Supplement, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('supplement')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'supplement',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'supplement'
        }" 
        class="w-1/2 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Supplements
      </button>
    </div>

    <!-- Conditionally render the active component based on activeComponent -->
    <ScrubDetails v-if="activeComponent === 'scrubDetails'" />
    <Supplement v-if="activeComponent === 'supplement'" />
    
    <Footer />
  </div>
</template>


<script>
import Footer from '../Footer.vue'
import Navbar from '../Navbar.vue'
import ScrubDetails from './ScrubDetails.vue'
import Supplement from './Supplement.vue'

export default {
  components: {
    Footer,
    Navbar,
    ScrubDetails,
    Supplement
  },
  data() {
    return {
      activeComponent: 'scrubDetails' // Default component to show ScrubDetails
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
      // Update the active component and save it to localStorage
      this.activeComponent = component;
      localStorage.setItem('activeComponent', component);
    }
  },
}
</script>
