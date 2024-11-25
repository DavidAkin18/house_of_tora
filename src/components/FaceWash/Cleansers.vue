<template>
  <div class="flex flex-col justify-center items-start px-4 py-10 md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Cleansers Bath Products & Prices</h2>

    <!-- Search Input and Dropdown -->
    <div class="mb-8 relative w-full max-w-md">
      <div 
        v-if="showDropdown && searchQuery" 
        class="fixed inset-0 bg-black bg-opacity-50 z-10"
        @click="showDropdown = false"
      ></div>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search for a product..." 
        class="w-full p-3 pl-8 rounded-lg border px-8 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B87F61] mb-4"
        @focus="showDropdown = true" 
        @blur="hideDropdown"
        @input="handleInput"
      />
      <!-- Search Button with Icon -->
      <button 
        @click="triggerSearch"
        class="absolute left-1 top-1/3 transform -translate-y-1/2 
        text-[#B87F61] cursor-pointer hover:text-[#B87F61] focus:outline-none focus:ring-2 focus:ring-[#B87F61]"
        :class="{'shadow-lg': showDropdown}" 
      >
        <i class="ri-search-line font-bold text-2xl"></i>
      </button>

      <button 
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-2 top-1/3 transform -translate-y-1/2 text-gray-500 hover:text-[#B87F61] focus:outline-none"
      >
        <i class="ri-close-circle-line text-xl"></i>
      </button>

      <!-- Dropdown Suggestions -->
      <ul 
        v-show="showDropdown && filteredNames.length" 
        class="absolute bg-[#ffffff] w-full max-w-md mt-1 rounded-lg border border-gray-300 shadow-lg z-10">
        <li 
          v-for="(product, index) in filteredNames" 
          :key="index"
          @mousedown.prevent="selectProduct(product.name)"
          class="p-2 cursor-pointer hover:bg-[#B87F61]  text-sm hover:text-white rounded-lg"
        >
          {{ product.name }}
        </li>
      </ul>
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
          <button class="p-2 border  hover:bg-[#B87F61] hover:text-white rounded-lg">
            <a 
              :href="product.whatsappLink" 
              target="_blank" 
              class="text-md font-medium  cursor-pointer "
            > <i class="ri-whatsapp-line text-green-400"></i>
              ₦ {{ product.price }}
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
      searchQuery:'',
      showDropdown:false,
      // Array of 20 demo products
      products: [
        {
    name: 'Santarde whitening cleanser',
    price: '2,000',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282883/Santarde_whitening_cleanser_vetkic.jpg',
    whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Santarde whitening cleanser.'
  },
  {
    name: 'lotion Eclaircissante Plantes Naturelles',
    price: '35,000',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282866/lotionEclaircissantePlantesNaturelles_kg4g7m.jpg',
    whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the lotion Eclaircissante Plantes Naturelles.'
  },
  {
    name: 'lotion peau de lune',
    price: '3,000',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282859/lotion-peau-de-lune-cleanser-review_2x_oxhvtz.webp',
    whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the lotion peau de lune.'
  },
  {
    name: 'lotion eclaircissante plantes naturelles carrot oil',
    price: '2,500',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282853/lotion_eclaircissante_plantes_naturelles_carrot_oil_mvhsjf.jpg',
    whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the lotion eclaircissante plantes naturelles carrot oil.'
  },
  {
    name: 'Grace Beaute',
    price: '2,000',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732426410/grace_beaute_fxyiog.jpg',
    whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Grace Beaute.'
  },
  {
    name: 'Cerave Foaming Cleaser Gel Moussant',
    price: '35,000',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482007/CeraveFoamingCleaserGelMoussant._SL1000_wumwfy.webp',
    whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Cerave Foaming Cleaser Gel Moussant.'
  },
  {
    name: 'FaceFacts Ceramide Blemish Clarifying Foaming Cleanser -400ml',
    price: '3,000',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482011/Face_Facts_Ceramide_Blemish_Clarifying_Foaming_Cleanser_-_400ml_sdkdx4.jpg',
    whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the FaceFacts Ceramide Blemish Clarifying Foaming Cleanser -400ml.'
  },
  {
    name: 'FaceFacts Ceramide Hydrating Gentle Cleanser -400ml',
    price: '2,500',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482017/Face_Facts_Ceramide_Hydrating_Gentle_Cleanser_-_400ml_goiljf.jpg',
    whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the FaceFacts Ceramide Hydrating Gentle Cleanser -400ml.'
  },
  {
    name: 'FaceFacts Ceramide Skin Barrier Complex Hydrating Gentle Cleanser',
    price: '2,000',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482022/Face-Facts-Ceramide-Skin-Barrier-Complex-Hydrating-Gentle-Cleanser_jgfibm.jpg',
    whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the FaceFacts Ceramide Skin Barrier Complex Hydrating Gentle Cleanser.'
  },
  {
    name: 'Kojic San Dream White Egg York',
    price: '35,000',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482036/KojicSanDreamWhiteEggYork_r38prd.jpg',
    whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Kojic San Dream White Egg York.'
  },
  {
    name: 'FACEFACTS CERAMIDE MOISTURISING BODY LOTION 400ML ',
    price: '3,000',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482054/FACEFACTS_CERAMIDE_MOISTURISING_BODY_LOTION_400ML_tubyyp.webp',
    whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the FACEFACTS CERAMIDE MOISTURISING BODY LOTION 400ML.'
  },
  {
    name: 'Skin Tag Remover',
    price: '2,500',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482071/skin-tag-remover_vwdedo.jpg',
    whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Skin Tag Remover.'
  },
  {
    name: 'White Kojic with Vitamin C Whitening Serum 50ml',
    price: '2,500',
    image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482083/X-White_Kojic_with_Vitamin_C_Whitening_Serum_50ml_sxetkk.webp',
    whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the White Kojic with Vitamin C Whitening Serum 50ml.'
  }
      ]
    };
  },
  computed:{
      filterProducts(){
        return this.products.filter(product =>{
          return product.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
        } )
      },
      filteredNames() {
        if (!this.searchQuery) return [];
        return this.products.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods:{
      selectProduct(name) {
        this.searchQuery = name;
        this.showDropdown = false;
      },
      hideDropdown() {
        // Use a timeout to allow click event registration on dropdown items
        setTimeout(() => {
          this.showDropdown = false;
        }, 200);
      },
      handleClickOutside(event) {
        const dropdown = this.$el.querySelector('.dropdown-container'); 
        if (dropdown && !dropdown.contains(event.target)) {
          this.showDropdown = false;
        }
      },
      clearSearch() {
        this.searchQuery = '';
        this.showDropdown = false;
      },
      handleInput() {
        this.showDropdown = !!this.searchQuery; 
      },
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleClickOutside);
    },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
