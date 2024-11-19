<template>
    <div class="flex flex-col justify-center items-start px-4 py-10 pt-20 md:pt-28 md:px-16">
      <!-- Section Title -->
      <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Cleanser Products & Price</h2>
      
      <!-- Product Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(product, index) in products" 
          :key="index"
          class="flex flex-col items-center bg-white px-4 py-6 w-full max-w-sm rounded-lg shadow-lg"
        >
          <!-- Product Image -->
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="w-full h-48 object-cover rounded-t-lg mb-4"
          />
  
          <!-- Product Name and Price -->
          <div class="text-center">
            <h3 class="text-lg font-semibold text-[#B87F61] mb-2">{{ product.name }}</h3>
            <p class="text-md font-medium text-gray-800">₦ {{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Array of 20 demo products
        products: [
          { name: 'Lotion', price: '2,000', image: 'https://via.placeholder.com/200?text=Lotion' },
          { name: 'Shampoo', price: '1,500', image: 'https://via.placeholder.com/200?text=Shampoo' },
          { name: 'Face Cream', price: '3,000', image: 'https://via.placeholder.com/200?text=Face+Cream' },
          { name: 'Sunscreen', price: '2,500', image: 'https://via.placeholder.com/200?text=Sunscreen' },
          { name: 'Hand Soap', price: '1,200', image: 'https://via.placeholder.com/200?text=Hand+Soap' },
          { name: 'Body Oil', price: '4,000', image: 'https://via.placeholder.com/200?text=Body+Oil' },
          { name: 'Shaving Gel', price: '1,800', image: 'https://via.placeholder.com/200?text=Shaving+Gel' },
          { name: 'Deodorant', price: '1,000', image: 'https://via.placeholder.com/200?text=Deodorant' },
          { name: 'Lip Balm', price: '600', image: 'https://via.placeholder.com/200?text=Lip+Balm' },
          { name: 'Face Wash', price: '2,200', image: 'https://via.placeholder.com/200?text=Face+Wash' },
          { name: 'Exfoliator', price: '2,500', image: 'https://via.placeholder.com/200?text=Exfoliator' },
          { name: 'Nail Polish', price: '700', image: 'https://via.placeholder.com/200?text=Nail+Polish' },
          { name: 'Shampoo Bar', price: '1,000', image: 'https://via.placeholder.com/200?text=Shampoo+Bar' },
          { name: 'Hand Cream', price: '1,500', image: 'https://via.placeholder.com/200?text=Hand+Cream' },
          { name: 'Foot Cream', price: '1,700', image: 'https://via.placeholder.com/200?text=Foot+Cream' },
          { name: 'Aftershave', price: '2,800', image: 'https://via.placeholder.com/200?text=Aftershave' },
          { name: 'Body Scrub', price: '2,600', image: 'https://via.placeholder.com/200?text=Body+Scrub' },
          { name: 'Facial Mask', price: '2,000', image: 'https://via.placeholder.com/200?text=Facial+Mask' },
          { name: 'Hair Mask', price: '3,200', image: 'https://via.placeholder.com/200?text=Hair+Mask' },
          { name: 'Shampoo and Conditioner Set', price: '4,500', image: 'https://via.placeholder.com/200?text=Shampoo+and+Conditioner+Set' }
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Optional custom styles */
  </style>
  