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
      // Array of 20 demo products
      searchQuery:'',
      showDropdown:false,
      products: [
        {
          name: 'X-White Kojic with Vitamin C Whitening Serum -50ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485243/X-White_Kojic_with_Vitamin_C_Whitening_Serum_50ml_tykwsf.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying X-White Kojic with Vitamin C Whitening Serum -50ml.'
        },
        {
          name: 'Beauty Moisture serum VITAMIN C Acid',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485237/VITAMIN_C_TONIC_cfotoa.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Beauty Moisture serum VITAMIN C Acid.'
        },
        {
          name: 'Vadesity GL Concentre Selfie 24H extra white serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485224/Vadesity_GL_Concentre_Selfie_24H_extra_white_serum_wm6mkr.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Vadesity GL Concentre Selfie 24H extra white serum.'
        },
        {
          name: 'Turmeric Anti-Oxidation Serum Turmeric Dark Spot Corrector Serum Turmeric Serum for Dark Spots',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485212/Turmeric_Anti-Oxidation_Serum_Turmeric_Dark_Spot_Corrector_Serum_Turmeric_Serum_for_Dark_Spots_3PCS_kuj67g.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Turmeric Anti-Oxidation Serum Turmeric Dark Spot Corrector Serum Turmeric Serum for Dark Spots.'
        },
        {
          name: 'The Ordinary Multi-Peptide HA Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485203/TheOrdinaryMulti-Peptide_HASerum2_800x_kbocaq.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying The Ordinary Multi-Peptide HA Serum.'
        },
        {
          name: "Tera Irene's Lait Injection Plus Super Whitening Serum",
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485195/Tera_Irene_s_Lait_Injection_Plus_Super_Whitening_Serum_gqqk43.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Tera Irene\'s Lait Injection Plus Super Whitening Serum.'
        },
        {
          name: "Tera Irene's Lait Injection Plus 7 Days Snow Whitening Serum",
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485181/Tera_Irene_s_Lait_Injection_Plus_7_Days_Snow_Whitening_Serum_blgdvv.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Tera Irene\'s Lait Injection Plus 7 Days Snow Whitening Serum.'
        },
        {
          name: 'Snapchat Lightening Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485172/snapchatLighteningSerum-side-view_irdmyn.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Snapchat Lightening Serum.'
        },
        {
          name: 'skin tag remover',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485155/skin-tag-remover_n2bm9a.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying skin tag remover.'
        },
        {
          name: 'Roushun Vitamin C Serum -30ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485144/Roushun_Vitamin_C_Serum_-_30ml_dyo7p0.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Roushun Vitamin C Serum -30ml.'
        },
        {
          name: 'Pei Mei Vitamin C serum -30ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485123/Pei_Mei_Vitamin_C_serum_-30ml_kzrkig.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pei Mei Vitamin C serum -30ml.'
        },
        {
          name: 'Nineless Creams Moisturizers',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485110/Nineless_Creams_Moisturizers_hw4jqt.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nineless Creams Moisturizers.'
        },
        {
          name: 'Nature White Whitening Skin Beauty Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485097/Nature_White_Whitening_Skin_Beauty_Serum_t6z7hf.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nature White Whitening Skin Beauty Serum.'
        },
        {
          name: 'Kojic San Dream White Egg York',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485083/KojicSanDreamWhiteEggYork_cgydi8.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Kojic San Dream White Egg York.'
        },
        {
          name: 'HalfCast Privilege Skin Whitening Serum Age-defying',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482917/HalfCast_Privilege_Skin_Whitening_Serum_Age-defying_uyk41r.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying HalfCast Privilege Skin Whitening Serum Age-defying.'
        },
        {
          name: 'halfcast extra fairness',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485054/halfcast_extra_fairenss_kjm8xv.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying halfcast extra fairness.'
        },
        {
          name: 'HalfCast Flawless Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485046/Half-Cast-Flawless-Serum_gbd18u.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying HalfCast Flawless Serum.'
        },
        {
          name: 'Goji Berry',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485039/goqiBerry_xzphch.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Goji Berry.'
        },
        {
          name: 'Good Molecules Discoloration Face Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485031/GoodMoleculesDiscoloration_FaceSerum_ntaie3.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Good Molecules Discoloration Face Serum.'
        },
        {
          name: 'FaceFacts Vitamin C Facial Serum BOX and BOTTLE',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485021/FaceFactsVitaminCFacialSerumBOXandBOTTLE_s6kuop.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying FaceFacts Vitamin C Facial Serum BOX and BOTTLE.'
        },
        {
          name: 'FaceFacts Soothe Glow Vitamin C Facial Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732485006/Face_Facts_Face_Fact_Soothe_Glow_Vitamin_C_Facial_Serum_c09p0v.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying FaceFacts Soothe Glow Vitamin C Facial Serum.'
        },
        {
          name: 'FaceFacts Collagen Facial Serum With Q10 30ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484983/Face_Facts_Collagen_Facial_Serum_With_Q10_30ml_el4juo.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying FaceFacts Collagen Facial Serum With Q10 30ml.'
        },
        {
          name: 'ESTELIN Face Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484959/ESTELIN_Face_Serum_mhqn22.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying ESTELIN Face Serum.'
        },
        {
          name: 'Elastalift 4X Brightening Vitamin C Serum For Age Spots Wrinkles Fine Lines',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484947/elastalift_4X_Brightening_Vitamin_C_Serum_For_Age_Spots_Wrinkles_Fine_Lines-1.75oz_zorafj.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Elastalift 4X Brightening Vitamin C Serum For Age Spots Wrinkles Fine Lines.'
        },
        {
          name: 'Egyptian Magic Whitening Milk Serum 50ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484938/Egyptian_Magic_Whitening_Milk_Serum_50ml_s7s2sf.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Egyptian Magic Whitening Milk Serum 50ml.'
        },
        {
          name: 'Dr.Rashel  Arbutin Niacinamide Skin Whitening Fade Spots Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484924/Dr._Rashel_Arbutin_Niacinamide_Skin_Whitening_Fade_Spots_Serum_pruqwj.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr.Rashel Arbutin Niacinamide Skin Whitening Fade Spots Serum.'
        },
        {
          name: 'DoTera Sun Face Sunscreen ',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484915/Do_Tera_Sun_Face_Sunscreen_crn37w.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying DoTera Sun Face Sunscreen.'
        },
        {
          name: 'Disaar Vitamin C Whitening Face Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484904/Disaar_Vitamin_C_Whitening_Face_Serum_a5wple.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Disaar Vitamin C Whitening Face Serum.'
        },
        {
          name: 'Cosrx Advanced Snail 96 Mucin Power Essence',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484888/Cosrx_Advanced_Snail_96_Mucin_Power_Essence_Advance_Snail_92_All_In_One_Cream_-_100ml_Each_ou5jwu.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Cosrx Advanced Snail 96 Mucin Power Essence.'
        },
        {
          name: 'Beauty Formulas Illuminating Niacinamide Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484878/Beauty-Formulas-Illuminating-Niacinamide-Serum_vepr09.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Beauty Formulas Illuminating Niacinamide Serum.'
        },
        {
          name: 'Beauty Of Joseon Serums',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484869/Beauty_Of_Joseon_Serums_ivjloo.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Beauty Of Joseon Serums.'
        },
        {
          name: 'Balance Face Serum ',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484865/Balance_Face_Serum_nnusi9.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Balance Face Serum.'
        },
        {
          name: 'Anua NIACINAMIDE 10 TXA 4 SERUM',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484855/Anua_NIACINAMIDE_10_TXA_4_SERUM_etuqou.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Anua NIACINAMIDE 10 TXA 4 SERUM.'
        },
        {
          name: 'Amos White Complexion Clarifying Lightening Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484847/Amos_White_Complexion_Clarifying_Ligtening_Serum_mwjvyt.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Amos White Complexion Clarifying Lightening Serum.'
        },
        {
          name: 'Aliya Carrot Serum ',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484827/AliyaCarrorInttenSerum_izfzjp.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Aliya Carrot Serum.'
        },
        {
          name: 'Advanced Clinicals Vitamin C Advanced Brightening Cream Anti-Ageing Serum',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484816/advanced-clinicals-vitamin-c-advanced-brightening-cream-anti-ageing-serum_fp71oh.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Advanced Clinicals Vitamin C Advanced Brightening Cream Anti-Ageing Serum.'
        },
        {
          name: 'Disaar Vitamin Whitening Small C Serum -30ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732484810/30-ml-disaar-vitamin-whiteningSmall-c-serum-500x500_q5int0.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Disaar Vitamin Whitening Small C Serum -30ml.'
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
