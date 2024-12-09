<template>
  <div class="flex flex-col justify-center items-start px-4 py-10 md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Scrubs Products & Prices</h2>

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
      searchQuery: '',
      showDropdown:false,
      products: [
        {
          name: 'Fruit of Wokali Natural Sherbet Scrub Aloe Vera For Face And Body Scrub',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282273/Wokali_Natural_Sherbet_Scrub_Aloe_Vera_For_Face_And_Body_eqmsic.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Wokali Natural Sherbet Scrub Aloe Vera For Face And Body Scrub.'
        },
        {
          name: 'VEET GOLD Face And Body Coffee And Coconut Whiten Scrub',
          price: '6,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282262/VEET_GOLD_Veetgold_Face_And_Body_Coffee_And_Coconut_Whiten_Scrub_mrscyq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying VEET GOLD Face And Body Coffee And Coconut Whiten Scrub.'
        },
        {
          name: 'VEET GOLD Whitening Sugar Scrub-450g',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282235/VEETGOLD_Whitening_Sugar_Scrub_-_450g_ebflcl.webp',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying VEET GOLD Whitening Sugar Scrub-450g.'
        },
        {
          name: 'VEET GOLD TURMERIC Salt Scrub Body Shower Cream',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282213/VEET_GOLD_TURMERIC_Salt_Scrub_Body_Shower_Cream_fpuayn.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying VEET GOLD TURMERIC Salt Scrub Body Shower Cream.'
        },
        {
          name: 'Veet Gold Clear Dark Spot Whitening Scrub',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282205/Veet_Gold_Clear_Dark_Spot_Whitening_Scrub_wewanf.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Clear Dark Spot Whitening Scrub.'
        },
        {
          name: 'Veet Gold Active Whitening Alpha Arbutin Scrub 600g',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282193/Veet_Gold_Active_Whitening_Alpha_Arbutin_Scrub_-_600g_ztj7y1.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Active Whitening Alpha Arbutin Scrub 600g.'
        },
        {
          name: 'Tree Hut Watermelon Shea Sugar Scrub 510g 18oz',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282187/Tree_Hut_Watermelon_Shea_Sugar_Scrub_510g_18oz_bkze9c.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Tree Hut Watermelon Shea Sugar Scrub 510g 18oz.'
        },
        {
          name: 'Skin Care-Carebeau Spa Lightening Salt Scrub',
          price: '6,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282162/Skin_Care-_Carebeau_Spa_Lightening_Salt_Scrub_nx7fii.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Skin Care-Carebeau Spa Lightening Salt Scrub.'
        },
        {
          name: 'Queen Of Scrub Turmeric And Glutathione Shower Scrub 750ml',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282153/Queen_Of_Scrub_Turmeric_And_Glutathione_Shower_Scrub_750ml_s4tf82.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Queen Of Scrub Turmeric And Glutathione Shower Scrub 750ml.'
        },
        {
          name: 'Natural Scrub-Sherbet Respberry',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282149/Natural_Scrub-Sherbet_tbxrag.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Natural Scrub-Sherbet Respberry.'
        },
        {
          name: 'Fruit of Wokali Pink Dream Natural Sherbet Scrub-600g',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282131/FruitofWokaliPinkDreamNaturalSherbetScrub600g_754x_f4vtof.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fruit of Wokali Pink Dream Natural Sherbet Scrub-600g.'
        },
        {
          name: 'Fruit Of The Wokali Coconut Exfoliating Scrub',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282120/Fruit_Of_The_Wokali_Coconut_Exfoliating_Scrub_wakud7.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fruit Of The Wokali Coconut Exfoliating Scrub.'
        },
        {
          name: 'Fruit Of The Wokali Apricot Face And Body Scrub',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282109/Fruit_Of_The_Wokali_Apricot_Face_And_Body_Scrub_ngz1ga.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fruit Of The Wokali Apricot Face And Body Scrub.'
        },
        {
          name: 'E45 Face Body Scrub With Avocado Wheat Peach Seed Powder to moisturize soften and even tone complexion',
          price: '6,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282102/E45_Face_Body_Scrub_With_Avocado_Wheat_Peach_Seed_Powder_to_moisturize_soften_and_even_tone_complexion_nrjc0s.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying E45 Face Body Scrub With Avocado Wheat Peach Seed Powder.'
        },
        {
          name: 'Dr.Meinaier Vitamin C Sugar Scrub 510g',
          price: '6,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282095/Dr._Meinaier_Vitamin_C_Sugar_Scrub_510g_bfqvka.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr.Meinaier Vitamin C Sugar Scrub 510g.'
        },
        {
          name: 'Dr.Meinaier Kojic Acid Sugar Scrub',
          price: '6,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282083/Dr._Meinaier_Kojic_Acid_Sugar_Scrub_jkffle.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr.Meinaier Kojic Acid Sugar Scrub.'
        },
        {
          name: "Dr Teal's Shea Sugar Body Scrub Daytime Nighttime with Vitamin C and Sleep Blend",
          price: '12,000',
          image: 'data:image/jpeg;base64,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',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr Teal\'s Shea Sugar Body Scrub Daytime Nighttime with Vitamin C and Sleep Blend.'
        },
        {
          name: 'DR MEINAIER Shea Sugar Scrub',
          price: '6,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282054/DR_MEINAIER_Shea_Sugar_Scrub_dwi9uq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying DR MEINAIER Shea Sugar Scrub.'
        },
        {
          name: 'Dr Meinaier Avocado Shea Argan Oil Scrub. Firms Clear Wrinkle',
          price: '6,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282046/Dr_Meinaier_Avocado_Shea_Argan_Oil_Scrub._Firms_Clear_Wrinkle_rcnhp2.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr Meinaier Avocado Shea Argan Oil Scrub.'
        },
        {
          name: 'Dr Meinaier Alpha Arbutin Sugar Scrub',
          price: '6,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282037/Dr_Meinaier_Alpha_Arbutin_Sugar_Scrub_ypl71g.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr Meinaier Alpha Arbutin Sugar Scrub.'
        },
        {
          name: 'Dove Exfoliating Body Polish',
          price: '12,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282030/Dove_Exfoliating_Body_Polish_begzmt.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dove Exfoliating Body Polish.'
        },
        {
          name: 'Exfoliating Body Scrub Pomegranate Seeds and Shea Butter Scent-225ml',
          price: '12,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282023/DOVE_-Exfoliating_Body_Scrub_Pomegranate_Seeds_and_shea_butter_scent_225ml_vzq13i.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying Exfoliating Body Scrub Pomegranate Seeds and Shea Butter Scent.'
        },
        {
          name: 'ASANTEE Salt Spa Soap 700ml. Body Scrub Milk Honey Collagen Bright Smooth Skin',
          price: '5,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282017/ASANTEE_Salt_Spa_Soap_700ml._Body_Scrub_Milk_Honey_Collagen_Bright_Smooth_Skin_oum6mn.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying ASANTEE Salt Spa Soap 700ml.'
        },
        {
          name: 'Advanced Clinicals Brightening Vitamin C Exfoliating',
          price: '21,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282010/Advanced_Clinicals_Brightening_Vitamin_C_Exfoliating_i6twpd.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Advanced Clinicals Brightening Vitamin C Exfoliating.'
        },
        {
          name: 'Veet Gold 24k Gold Whitening Sugar Scrub Face And Body Scrub',
          price: '8,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282002/Product_image_thumbnail.Product_image_thumbnail.Product_image_thumbnail._Veet_Gold_24k_Gold_Whitening_Sugar_Scrub_Face_And_Body_Scrub_-_450g_jncxqp.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold 24k Gold Whitening Sugar Scrub Face And Body Scrub.'
        },
        {
          name: 'Body Scrub Orange Papaya 700g',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732281996/Body_Scrub_Orange_Papaya_700g_fotbok.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Body Scrub Orange Papaya 700g.'
        }


      ],
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
