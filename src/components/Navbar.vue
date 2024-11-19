<template>
    <nav class="bg-[#FFEFD8] fixed w-full z-50 shadow-md px-4 md:px-16 py-3 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-lg font-bold text-gray-800">
        <img src="https://res.cloudinary.com/def9quyti/image/upload/v1731971283/torologo_hvtoiz.png" alt="logo" class="h-12">
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
        <router-link to="/" class="text-[#000000] hover:text-[#B87F61]">Home</router-link>
        <router-link to="/products" class="text-[#000000] hover:text-[#B87F61]">Products</router-link>
        <router-link to="/gallery" class="text-[#000000] hover:text-[#B87F61]">Gallery</router-link>
        <router-link to="/about" class="text-[#000000] hover:text-[#B87F61]">About</router-link>
        <router-link to="/contact" class="text-[#000000] hover:text-[#B87F61]">Contact</router-link>
      </div>
  
      <!-- Mobile Sidebar -->
      <div 
        :class="`fixed inset-0 bg-[#FFEFD8] z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`">
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
          <router-link to="/" class="text-[#000000] hover:text-[#B87F61]">Home</router-link>
          <router-link to="/products" class="text-[#000000] hover:text-[#B87F61]">Products</router-link>
          <router-link to="/gallery" class="text-[#000000] hover:text-[#B87F61]">Gallery</router-link>
          <router-link to="/about" class="text-[#000000] hover:text-[#B87F61]">About</router-link>
          <router-link to="/contact" class="text-[#000000] hover:text-[#B87F61]">Contact</router-link>
        </div>
  
        <!-- Call to Action -->
        <div class="p-4 mt-auto border-t border-[#B87F61]">
          <button class="w-full py-3 bg-[#B87F61] text-white rounded-lg text-center shadow-md hover:bg-orange-600 transition">
            Shop Now
          </button>
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
    },
  };
  </script>
  
  <style scoped>
  /* Custom scrollbar for sidebar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #ffa500; /* Orange scrollbar */
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-track {
    background-color: #ffeedd;
  }
  </style>
  