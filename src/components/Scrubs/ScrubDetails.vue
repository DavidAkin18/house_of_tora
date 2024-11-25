<template>
  <div class="flex flex-col justify-center items-start px-4 py-10 md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Shower Bath Products & Prices</h2>

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
          name: 'Wokali Natural Sherbet Scrub Aloe Vera For Face And Body Scrub',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282273/Wokali_Natural_Sherbet_Scrub_Aloe_Vera_For_Face_And_Body_eqmsic.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Wokali Natural Sherbet Scrub Aloe Vera For Face And Body Scrub.'
        },
        {
          name: 'VEET GOLD Face And Body Coffee And Coconut Whiten Scrub',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282262/VEET_GOLD_Veetgold_Face_And_Body_Coffee_And_Coconut_Whiten_Scrub_mrscyq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying VEET GOLD Face And Body Coffee And Coconut Whiten Scrub.'
        },
        {
          name: 'VEET GOLD Whitening Sugar Scrub-450g',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282235/VEETGOLD_Whitening_Sugar_Scrub_-_450g_ebflcl.webp',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying VEET GOLD Whitening Sugar Scrub-450g.'
        },
        {
          name: 'VEET GOLD TURMERIC Salt Scrub Body Shower Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282213/VEET_GOLD_TURMERIC_Salt_Scrub_Body_Shower_Cream_fpuayn.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying VEET GOLD TURMERIC Salt Scrub Body Shower Cream.'
        },
        {
          name: 'Veet Gold Clear Dark Spot Whitening Scrub',
          price: '1,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282205/Veet_Gold_Clear_Dark_Spot_Whitening_Scrub_wewanf.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Clear Dark Spot Whitening Scrub.'
        },
        {
          name: 'Veet Gold Active Whitening Alpha Arbutin Scrub 600g',
          price: '4,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282193/Veet_Gold_Active_Whitening_Alpha_Arbutin_Scrub_-_600g_ztj7y1.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Active Whitening Alpha Arbutin Scrub 600g.'
        },
        {
          name: 'Tree Hut Watermelon Shea Sugar Scrub 510g 18oz',
          price: '1,800',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282187/Tree_Hut_Watermelon_Shea_Sugar_Scrub_510g_18oz_bkze9c.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Tree Hut Watermelon Shea Sugar Scrub 510g 18oz.'
        },
        {
          name: 'Skin Care-Carebeau Spa Lightening Salt Scrub',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282162/Skin_Care-_Carebeau_Spa_Lightening_Salt_Scrub_nx7fii.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Skin Care-Carebeau Spa Lightening Salt Scrub.'
        },
        {
          name: 'Queen Of Scrub Turmeric And Glutathione Shower Scrub 750ml',
          price: '600',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282153/Queen_Of_Scrub_Turmeric_And_Glutathione_Shower_Scrub_750ml_s4tf82.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Queen Of Scrub Turmeric And Glutathione Shower Scrub 750ml.'
        },
        {
          name: 'Natural Scrub-Sherbet Respberry',
          price: '2,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282149/Natural_Scrub-Sherbet_tbxrag.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Natural Scrub-Sherbet Respberry.'
        },
        {
          name: 'Globalstar Face Body Sugar Scrub With Pomegranate-600Gm',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282141/Globalstar_Face_Body_Sugar_Scrub_With_Pomegranate_-_600Gm_l924lj.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Globalstar Face Body Sugar Scrub With Pomegranate-600Gm.'
        },
        {
          name: 'Fruit of Wokali Pink Dream Natural Sherbet Scrub-600g',
          price: '700',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282131/FruitofWokaliPinkDreamNaturalSherbetScrub600g_754x_f4vtof.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fruit of Wokali Pink Dream Natural Sherbet Scrub-600g.'
        },
        {
          name: 'Fruit Of The Wokali Coconut Exfoliating Scrub',
          price: '1,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282120/Fruit_Of_The_Wokali_Coconut_Exfoliating_Scrub_wakud7.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fruit Of The Wokali Coconut Exfoliating Scrub.'
        },
        {
          name: 'Fruit Of The Wokali Apricot Face And Body Scrub',
          price: '1,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282109/Fruit_Of_The_Wokali_Apricot_Face_And_Body_Scrub_ngz1ga.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fruit Of The Wokali Apricot Face And Body Scrub.'
        },
        {
          name: 'E45 Face Body Scrub With Avocado Wheat Peach Seed Powder to moisturize soften and even tone complexion',
          price: '1,700',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282102/E45_Face_Body_Scrub_With_Avocado_Wheat_Peach_Seed_Powder_to_moisturize_soften_and_even_tone_complexion_nrjc0s.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying E45 Face Body Scrub With Avocado Wheat Peach Seed Powder.'
        },
        {
          name: 'Dr.Meinaier Vitamin C Sugar Scrub 510g',
          price: '2,800',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282095/Dr._Meinaier_Vitamin_C_Sugar_Scrub_510g_bfqvka.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr.Meinaier Vitamin C Sugar Scrub 510g.'
        },
        {
          name: 'Dr.Meinaier Kojic Acid Sugar Scrub',
          price: '2,600',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282083/Dr._Meinaier_Kojic_Acid_Sugar_Scrub_jkffle.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr.Meinaier Kojic Acid Sugar Scrub.'
        },
        {
          name: "Dr Teal's Shea Sugar Body Scrub Daytime Nighttime with Vitamin C and Sleep Blend",
          price: '40,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282074/Dr_Teal_s_Shea_Sugar_Body_Scrub_Daytime_Nighttime_with_Vitamin_C_and_Sleep_Blend_jeexg0.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr Teal\'s Shea Sugar Body Scrub Daytime Nighttime with Vitamin C and Sleep Blend.'
        },
        {
          name: 'DR MEINAIER Shea Sugar Scrub',
          price: '3,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282054/DR_MEINAIER_Shea_Sugar_Scrub_dwi9uq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying DR MEINAIER Shea Sugar Scrub.'
        },
        {
          name: 'Dr Meinaier Avocado Shea Argan Oil Scrub. Firms Clear Wrinkle',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282046/Dr_Meinaier_Avocado_Shea_Argan_Oil_Scrub._Firms_Clear_Wrinkle_rcnhp2.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr Meinaier Avocado Shea Argan Oil Scrub.'
        },
        {
          name: 'Dr Meinaier Alpha Arbutin Sugar Scrub',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282037/Dr_Meinaier_Alpha_Arbutin_Sugar_Scrub_ypl71g.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr Meinaier Alpha Arbutin Sugar Scrub.'
        },
        {
          name: 'Dove Exfoliating Body Polish',
          price: '1,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282030/Dove_Exfoliating_Body_Polish_begzmt.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dove Exfoliating Body Polish.'
        },
        {
          name: 'Exfoliating Body Scrub Pomegranate Seeds and Shea Butter Scent-225ml',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282023/DOVE_-Exfoliating_Body_Scrub_Pomegranate_Seeds_and_shea_butter_scent_225ml_vzq13i.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying Exfoliating Body Scrub Pomegranate Seeds and Shea Butter Scent.'
        },
        {
          name: 'ASANTEE Salt Spa Soap 700ml. Body Scrub Milk Honey Collagen Bright Smooth Skin',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282017/ASANTEE_Salt_Spa_Soap_700ml._Body_Scrub_Milk_Honey_Collagen_Bright_Smooth_Skin_oum6mn.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying ASANTEE Salt Spa Soap 700ml.'
        },
        {
          name: 'Advanced Clinicals Brightening Vitamin C Exfoliating',
          price: '1,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282010/Advanced_Clinicals_Brightening_Vitamin_C_Exfoliating_i6twpd.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Advanced Clinicals Brightening Vitamin C Exfoliating.'
        },
        {
          name: 'Veet Gold 24k Gold Whitening Sugar Scrub Face And Body Scrub',
          price: '4,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282002/Product_image_thumbnail.Product_image_thumbnail.Product_image_thumbnail._Veet_Gold_24k_Gold_Whitening_Sugar_Scrub_Face_And_Body_Scrub_-_450g_jncxqp.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold 24k Gold Whitening Sugar Scrub Face And Body Scrub.'
        },
        {
          name: 'Body Scrub Orange Papaya 700g',
          price: '1,800',
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
