<template>
  <div class="flex flex-col justify-center items-start px-4 py-10  md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Face Cream Products & Prices</h2>

    <div class="mb-8 relative w-full max-w-md">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search for a product..." 
        class="w-full p-3 pl-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B87F61] mb-4"
      />
      <!-- Search Button with Icon -->
      <button 
        @click="triggerSearch"
        class="absolute left-1 top-1/3 transform -translate-y-1/2 text-[#B87F61] cursor-pointer hover:text-[#B87F61]  focus:outline-none focus:ring-2 focus:ring-[#B87F61]">
        <i class="ri-search-line font-bold text-2xl"></i>
      </button>
    </div>


    <!-- Product Grid -->
    <div class="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="(product, index) in filterProducts"
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
          <!-- WhatsApp Link -->
          <a 
            :href="product.whatsappLink" 
            target="_blank" 
            class="text-md font-medium text-gray-800 cursor-pointer hover:underline"
          >
            ₦ {{ product.price }}
          </a>
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
      searchQuery:'',
      products: [
        { name: 'Lotion', price: '2,000', image: 'https://via.placeholder.com/200?text=Lotion', whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
      },
        { name: 'Shampoo', price: '1,500', image: 'https://via.placeholder.com/200?text=Shampoo', whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Face Cream', price: '3,000', image: 'https://via.placeholder.com/200?text=Face+Cream'  ,whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Sunscreen', price: '2,500', image: 'https://via.placeholder.com/200?text=Sunscreen',whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Hand Soap', price: '1,200', image: 'https://via.placeholder.com/200?text=Hand+Soap',whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Body Oil', price: '4,000', image: 'https://via.placeholder.com/200?text=Body+Oil', whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Shaving Gel', price: '1,800', image: 'https://via.placeholder.com/200?text=Shaving+Gel'  ,whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Deodorant', price: '1,000', image: 'https://via.placeholder.com/200?text=Deodorant', whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Lip Balm', price: '600', image: 'https://via.placeholder.com/200?text=Lip+Balm', whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Face Wash', price: '2,200', image: 'https://via.placeholder.com/200?text=Face+Wash', whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Exfoliator', price: '2,500', image: 'https://via.placeholder.com/200?text=Exfoliator'  ,whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Nail Polish', price: '700', image: 'https://via.placeholder.com/200?text=Nail+Polish'  ,whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Shampoo Bar', price: '1,000', image: 'https://via.placeholder.com/200?text=Shampoo+Bar'  ,whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Hand Cream', price: '1,500', image: 'https://via.placeholder.com/200?text=Hand+Cream'  ,whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Foot Cream', price: '1,700', image: 'https://via.placeholder.com/200?text=Foot+Cream'  ,whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Aftershave', price: '2,800', image: 'https://via.placeholder.com/200?text=Aftershave'  ,whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Body Scrub', price: '2,600', image: 'https://via.placeholder.com/200?text=Body+Scrub'  ,whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Facial Mask', price: '2,000', image: 'https://via.placeholder.com/200?text=Facial+Mask'  ,whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Hair Mask', price: '3,200', image: 'https://via.placeholder.com/200?text=Hair+Mask'  ,whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'},
        { name: 'Shampoo and Conditioner Set', price: '4,500', image: 'https://via.placeholder.com/200?text=Shampoo+and+Conditioner+Set', whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.' }
      ],
    };
  },
  computed:{
    filterProducts(){
      return this.products.filter(product =>{
        return product.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      })
    }
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
