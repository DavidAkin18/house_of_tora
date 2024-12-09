<template>
  <div class="flex flex-col justify-center items-start px-4 py-10 md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Body Oil Products & Prices</h2>

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
      // Array of 20 demo products
      searchQuery:'',
      showDropdown:false,
      products: [
      {
        name: 'Veet Gold Turmeric Oil 1000ml',
        price: '16,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338979/VeetGoldTurmericOil1000ml_w0mhkc.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Turmeric Oil 1000ml.'
      },
      {
        name: 'Veet Gold  Castro Oil 1000ml',
        price: '15,000',
        image: 'https://urchidamaschemorganic.com/cdn/shop/files/IMG-20240320_184747_717_1080x1080.jpg?v=1711125852',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Castro Oil 1000ml.'
      },
      {
        name: 'Veet Gold Retinol Body Corrector  oil 1000ml',
        price: '15,000',
        image: 'https://i.ebayimg.com/images/g/EnEAAOSw0OFl~3YD/s-l1600.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Retinol Body Corrector  oil 1000ml'
      },
      {
        name: 'Veet Gold Alphax3 Arbutin Oil 1000ml',
        price: '15,000',
        image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/23/5024563/1.jpg?6024',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Alphax3 Arbutin  Oil 1000ml.'
      },
      {
        name: 'Veet Gold Half Cast Oil 1000ml',
        price: '2,500',
        image: 'https://www-konga-com-res.cloudinary.com/f_auto,fl_lossy,dpr_3.0,q_auto/media/catalog/product/B/O/186885_1684444659.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Half Cast  Oil 1000ml.'
      },
      {
        name: 'Veet Gold Vitamin c Oil 1000ml',
        price: '16,000',
        image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/84/9278953/1.jpg?5154',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Vitamin c Oil 1000ml.'
      },
      {
        name: 'VEETGOLD SKIN REPAIR 3 IN 1 BODY TREATMENT OIL 150ML',
        price: '9,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338971/VEETGOLD_SKIN_REPAIR_3_IN_1_BODY_TREATMENT_OIL_150ML_kngzjf.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying VEETGOLD SKIN REPAIR 3 IN 1 BODY TREATMENT OIL 150ML.'
      },
      {
        name: 'Vaseline Vitamin B3 Body Oil 200ml',
        price: '12,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338960/Vaseline_Vitamin_B3_Body_Oil_200ml_br1c5c.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Vaseline Vitamin B3 Body Oil 200ml.'
      },
      {
        name: "Tara vet Brightening glow oil",
        price: '9,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338932/Tara_vet_Brightening_glow_oil_ob0pol.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Tara vet Brightening glow oil.'
      },
      {
        name: 'Sof 7 Super Whitening And Glowing Oil With Turmeric And Honey',
        price: '9,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338911/Soft_7_Super_Whitening_And_Glowing_Oil_With_Turmeric_And_Honey_ftzvv9.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Sof 7 Super Whitening And Glowing Oil With Turmeric And Honey.'
      },
      {
        name: 'Neutrogena Body Oil Light Sesame Formula For Dry Skin',
        price: '21,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338871/Neutrogena_Body_Oil_Light_Sesame_Formula_For_Dry_Skin_uwaoyt.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Neutrogena Body Oil Light Sesame Formula For Dry Skin.'
      },
      {
        name: 'Morrocan Argan Essential Oils 24k Gold Primer Skin Oil',
        price: '9,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338865/Morrocan_Argan_Essential_Oils_6_In_1_24k_Gold_Primer_Skin_Oil_Spf_45_300ml_ymdqdz.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Morrocan Argan Essential Oils 24k Gold Primer Skin Oil.'
      },
      {
        name: 'Moroccan Argan Essential',
        price: '9,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338857/MoroccanArganEssential_klwhpq.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Moroccan Argan Essential.'
      },
      {
        name: 'Moroccan Argan Oil-Vitamin C Glowing Oil',
        price: '9,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338844/Moroccan_Argan_Oil_-_Vitamin_C_Glowing_Oil_pxwk8a.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Moroccan Argan Oil-Vitamin C Glowing Oil.'
      },
      {
        name: 'Disaar Natural Vitamin C Whitening And Moisturizing Oil',
        price: '3,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338836/DisaarNaturalVitaminCWhiteningAndMoisturizingOil_gzy0g1.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Disaar Natural Vitamin C Whitening And Moisturizing Oil.'
      },
      {
        name: 'Beauty IQ Beauty Carrot Oil 200ml',
        price: '6,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338829/Beauty_IQ_Beauty_Carrot_Oil_200ml_uytpdf.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Beauty IQ Beauty Carrot Oil 200ml.'
      },
      {
        name: 'Aveeno Daily Moisturizing Oil Mist',
        price: '21,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338820/Aveeno_Daily_Moisturizing_Oil_Mist_m2umce.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Aveeno Daily Moisturizing Oil Mist.'
      },
      {
        name: 'Veet Gold Extra Whitening Corrector Glowing Dark Spot Treatment Oil for Face Body',
        price: '7,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338814/Veet_Gold_Extra_Whitening_Corrector_Glowing_Dark_Spot_Treatment_Oil_for_Face_Body_y7smtw.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Extra Whitening Corrector Glowing Dark Spot Treatment Oil for Face Body.'
      },
      {
        name: 'x-white halfcast oil new improved days fast action with vitamin b3 extreme',
        price: '6,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482971/x-white-halfcast-oil0a0anew-improved0a0a7-days-fast-action0a0awith0a0avitamin-b3-extreme_mqa8tw.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying x-white halfcast oil new improved days fast action with vitamin b3 extreme.'
      },
      {
        name: 'Tera Vet Stretch Marks Treatment Oil 150ml',
        price: '9,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482962/Tera_Vet_Stretch_Marks_Treatment_Oil_150ml_hziqj1.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Tera Vet Stretch Marks Treatment Oil 150ml.'
      },
      {
        name: 'Skin Balance',
        price: '6,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482953/SkinBalance_g0ithv.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Skin Balance.'
      },
      // {
      //   name: 'Pure Indian White Whitening Oil',
      //   price: '6,000',
      //   image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482947/Pure_Indian_White_Whitening_Oil_nmuxml.webp',
      //   whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pure Indian White Whitening Oil.'
      // },
      {
        name: 'Pure Carrot bio Balance Serum -60ml',
        price: '4,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482939/Pure_Carrot_bio_Balance_Serum_-_60ml_kkrpc7.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pure Carrot bio Balance Serum -60ml.'
      },
      {
        name: 'Palmers Cocoa Butter Skin Therapy Oil 150ml',
        price: '13,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482925/Palmers_20Cocoa_20Butter_20Skin_20Therapy_20Oil_20150ml_gbo2qf.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Palmers Cocoa Butter Skin Therapy Oil 150ml.'
      },
      {
        name: 'Glow HalfCast Pro Lightening Anti Aging oil',
        price: '12,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482907/Glow_Half_Cast_Pro_Lightening_Anti_Aging_oil_upqckr.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Glow HalfCast Pro Lightening Anti Aging oil.'
      },
      {
        name: 'Beauty Series Skin Oil 150ml',
        price: '6,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482889/Beauty_Series_Skin_Oil_150ml_swabnk.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Beauty Series Skin Oil 150ml.'
      },
      {
        name: 'Advanced Clinicals Vitamin C Brightening Body Oil 112ml',
        price: '6,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482875/Advanced_Clinicals_Vitamin_C_Brightening_Body_Oil_112ml_vzwzsu.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Advanced Clinicals Vitamin C Brightening Body Oil 112ml.'
      },
      {
        name: 'Active Caviar Drip Gluta-C Injection Super Bleaching Oil -100ml',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482869/Active-Caviar-Drip-Gluta-C-Injection-Super-Bleaching-Oil-100ml_nmomxj.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Active Caviar Drip Gluta-C Injection Super Bleaching Oil -100ml.'
      },
      {
        name: 'Active Caviar Drip Arbutin Licorice Strong Whitening Oil',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482856/Active_Caviar_Drip_Arbutin_Licorice_Strong_Whitening_Oil_x6x8vd.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Active Caviar Drip Arbutin Licorice Strong Whitening Oil.'
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
