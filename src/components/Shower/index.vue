<template>
  <div>
    <Navbar />

    <div class="flex space-x-4 px-4 py-10 pt-28  md:px-16">
      <!-- Button to show ShowerBath, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('showerBath')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'showerBath',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'showerBath'
        }" 
        class="w-1/2 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Shower Bath
      </button>

      <!-- Button to show TabletSoaps, active button gets bg and text color change -->
      <button 
        @click="toggleComponent('tabletSoaps')" 
        :class="{
          'bg-[#B87F61] text-white': activeComponent === 'tabletSoaps',
          'border border-[#B87F61] text-[#B87F61]': activeComponent !== 'tabletSoaps'
        }" 
        class="w-1/2 py-2 px-4 font-semibold rounded-lg hover:bg-[#B87F61] hover:text-white focus:outline-none">
        Tablet Soaps
      </button>
    </div>

    <!-- Conditionally render the active component based on activeComponent -->
    <ShowerBath v-if="activeComponent === 'showerBath'" />
    <TabletSoaps v-if="activeComponent === 'tabletSoaps'" />
    
    <Footer />
  </div>
</template>

  
<script>
import Footer from '../Footer.vue'
import Navbar from '../Navbar.vue'
import ShowerBath from './ShowerBath.vue'
import TabletSoaps from './TabletSoaps.vue'

export default {
  components: {
    Footer,
    Navbar,
    ShowerBath,
    TabletSoaps
  },
  data() {
    return {
      activeComponent: 'showerBath' // Default component to show ShowerBath
    };
  },
  methods: {
    toggleComponent(component) {
      this.activeComponent = component;
    }
  }
}
</script>
