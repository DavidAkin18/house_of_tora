<template>
    <div class="px-4 md:px-16 py-14 lg:py-28 bg-[#FFCEB4]">
      <!-- Section Title -->
        <div class="flex justify-start items-center ">
            <h2 class="text-3xl font-bold text-[#ffffff]">House of Toro's Products</h2>
            <!-- <hr class="text-[#B87F61] text-xl font-bold mt-4"> -->
        </div>
        <hr class="border-[#ffffff] text-xl font-bold mb-8">
      
  
      <!-- Products Grid -->
      <div class="overflow-x-auto">
        <div class="grid grid-flow-col auto-cols-[200px] gap-4">
            <!-- Card Component -->
            <div
            v-for="(product, index) in products"
            :key="index"
            class="border border-[#ffffff] rounded-lg shadow-sm hover:shadow-lg transition relative flex flex-col h-full"
            >
            <!-- Product Image -->
            <img 
                :src="product.image" 
                :alt="product.name" 
                class="w-full h-32 object-cover rounded-t-lg mb-4" 
            />
            
            <!-- Product Name -->
            <h3 class="text-[#ffffff] font-semibold mb-2 px-2">
                {{ product.name }}
            </h3>
            
            <!-- Spacer to push the button to the bottom -->
            <div class="flex-grow"></div>
            
            <!-- Contact Us Button -->
            <button
                class="flex items-center justify-center w-full text-base font-medium p-2 py-1 bg-[#B87F61] text-white rounded-b-lg hover:bg-opacity-90 transition"
            >
                <a 
                  :href="product.whatsappLink" 
                  target="_blank" 
                  class="text-md font-medium  cursor-pointer mr-2"
                > <i class="ri-whatsapp-line text-lg text-green-400 "></i>
                  click to check out
                </a>
            </button>
            </div>
        </div>
        </div>

    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          {
            name: "Lotion",
            image: "https://res.cloudinary.com/def9quyti/image/upload/v1733739330/toroLotion_ilv7xp.jpg",
          
            whatsappLink: "https://wa.me/9092627921?text=Hello, I am interested in buying Toro's Face Cream"
          },
          {
            name: "Cleansers",
            image: "https://res.cloudinary.com/def9quyti/image/upload/v1733739298/toroFaceWash_lrf5du.jpg",
            
            whatsappLink: "https://wa.me/9092627921?text=Hello, I am interested in buying Toro's Face Cream"

          },
          {
            name: "Body oil",
            image: "https://res.cloudinary.com/def9quyti/image/upload/v1733739342/toroOil_mjwjzn.jpg",
        
            whatsappLink: "https://wa.me/9092627921?text=Hello, I am interested in buying Toro's Face Cream"

          },
          {
            name: "Face Cream",
            image: "https://res.cloudinary.com/def9quyti/image/upload/v1733739294/toroFaceCream_kwc9vo.jpg",
         
            whatsappLink: "https://wa.me/9092627921?text=Hello, I am interested in buying Toro's Face Cream"

          },
          // Repeat or add more products to test scrolling
          { 
            name: "Scrub", 
            image: "https://res.cloudinary.com/def9quyti/image/upload/v1733739345/toroScrub_cd903m.jpg", 
           
            whatsappLink: "https://wa.me/9092627921?text=Hello, I am interested in buying Toro's Face Cream"

          },
          { 
            name: "Tube Cream", 
            image: "https://res.cloudinary.com/def9quyti/image/upload/v1733739340/toroTube_a2qwwn.jpg", 
           
            whatsappLink: "https://wa.me/9092627921?text=Hello, I am interested in buying Toro's Face Cream"
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Optional Custom Styling */
  </style>
  