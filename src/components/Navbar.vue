<template>
  <nav class="bg-[#FFEFD8] fixed w-full z-50 shadow-md px-4 md:px-16 py-3 flex justify-between items-center">
    <!-- Logo -->
    <div class="text-lg font-bold text-gray-800">
      <img src="https://res.cloudinary.com/def9quyti/image/upload/v1732029320/torologo_bg_color_FFEFD8_ajdheo.png" alt="logo" class="h-12">
    </div>

    <!-- Mobile Menu Button -->
    <button 
      @click="toggleSidebar" 
      id="menu-btn" 
      class="block md:hidden text-gray-800 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>

    <!-- Desktop Navigation Links -->
    <div id="menu" class="hidden md:flex md:items-center space-x-6">
      <a href="'/'" class="text-[#000000] hover:text-[#B87F61]">Home</a>
      <a @click.prevent="scrollTo('products')" class="text-[#000000] hover:text-[#B87F61]">Products</a>
      <a @click.prevent="scrollTo('about')" class="text-[#000000] hover:text-[#B87F61]">About</a>
      <a href="https://wa.me/2349092627921" target="_blank" class="w-full bg-[#B87F61] text-white rounded-lg py-1 px-2 text-center shadow-md
      hover:bg-[#FFEFD8] hover:border hover:border-[#B87F61] hover:text-[#B87F61] transition">Contact</a>
    </div>

    <!-- Mobile Sidebar -->
    <div 
      :class="`fixed inset-0 z-40 ${isSidebarOpen ? 'block' : 'hidden'}`"
      @click="closeSidebar"
      class="bg-black bg-opacity-50">
      
      <!-- Sidebar Content -->
      <div 
        :class="`bg-[#FFEFD8] absolute top-0 right-0 h-full w-2/3 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`" 
        @click.stop>
        
        <!-- Sidebar Header -->
        <div class="flex justify-between items-center p-4 border-b border-[#B87F61]">
          <span class="text-2xl font-bold text-[#B87F61]">Menu</span>
          <button 
            @click="toggleSidebar" 
            class="text-[#B87F61] focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Sidebar Links -->
        <div class="flex flex-col space-y-4 p-4 text-lg">
          <a @click.prevent="scrollTo('home')" class="text-[#000000] font-bold hover:text-[#B87F61]">Home</a>
          <a @click.prevent="scrollTo('products')" class="text-[#000000] font-bold hover:text-[#B87F61]">Products</a>
          <a @click.prevent="scrollTo('about')" class="text-[#000000] font-bold hover:text-[#B87F61]">About</a>
          <a @click.prevent="scrollTo('contact')" class="w-full bg-[#B87F61] font-bold text-white rounded-lg py-1 px-2 text-center shadow-md
          hover:bg-[#FFEFD8] hover:border hover:border-[#B87F61] hover:text-[#B87F61] transition">Contact</a>
        </div>
      </div>
    </div>
  </nav>
</template>


  
<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    scrollTo(target) {
      this.$scrollTo(`#${target}`, 500); // 500ms duration
    },
  },
};
</script>


<style scoped>
/* Sidebar animation for left sliding */
.transform {
  transition: transform 0.3s ease-in-out;
}

/* Sidebar background effect */
.bg-opacity-50 {
  backdrop-filter: blur(2px); /* Optional: Adds blur to the background */
}
</style>


  