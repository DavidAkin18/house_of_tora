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
      showDropdown: false,
      products: [
      {
        name: 'White Extra Whitening Face Cream with Collagen',
        price: '8,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343819/Xx-White_Extra_Whitening_Face_Cream_with_Collagen_wxcqud.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying White Extra Whitening Face Cream with Collagen.'
      },
      {
        name: 'White Light Baby Face Whitening Cream',
        price: '4,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343813/WhiteLightBabyFaceWhiteningCrem_yia7xg.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying White Light Baby Face Whitening Cream.'
      },
      {
        name: 'white spot removing anti spot cream',
        price: '6,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343804/white_spot_removing_anti_spot_cream_gno0vr.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying white spot removing anti spot cream.'
      },
      {
        name: "Ultimate Aliya",
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343795/Ultimate_Aliya_gnoj9k.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Ultimate Aliya.'
      },
      {
        name: 'selfie face cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343788/selfie-face-cream_1_kglz2d.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying selfie face cream.'
      },
      {
        name: 'Skin Balance Facial Whitening And Spot Removing Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343740/Skin_Balance_Facial_Whitening_And_Spot_Removing_Cream_odsefr.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Skin Balance Facial Whitening And Spot Removing Cream.'
      },
      {
        name: 'Raffine White Rejuvenating Face Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343725/Raffine_White_Rejuvenating_Face_Cream_lzgojh.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Raffine White Rejuvenating Face Cream.'
      },
      {
        name: 'Pure Carrot Face Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343712/PureCarrotFaceCream_y1u4xq.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pure Carrot Face Cream.'
      },
      {
        name: 'Pure Haven Face Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343702/Pure_Haven_Face_Cream_1600x_nuzwzy.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pure Haven Face Cream.'
      },
      {
        name: 'Pure Nomarks Xtra Beauty Gold Facial Cream 30g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343692/Pure_Nomarks_Xtra_Beauty_Gold_Facial_Cream_30g_do1hhd.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pure Nomarks Xtra Beauty Gold Facial Cream 30g.'
      },
      {
        name: 'Nomarks Super Whitening Facial Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343685/Nomarks_Super_Whitening_Facial_Cream_ykt31x.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nomarks Super Whitening Facial Cream.'
      },
      {
        name: 'No Stress Restorative Cream 35ml',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343668/No_Stress_Restorative_Cream_35ml_dpz5ia.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying No Stress Restorative Cream 35ml.'
      },
      {
        name: 'nano whitening cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343659/nano-whitening-cream_rrgjsa.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying nano whitening cream.'
      },
      {
        name: 'Madam WHITE EXCLUSIVE WHITENING FACE CREAM',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343652/Madam_WHITE_EXCLUSIVE_WHITENING_FACE_CREAM_r4ubhs.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Madam WHITE EXCLUSIVE WHITENING FACE CREAM.'
      },
      {
        name: 'Lait Snapchat Facial Cream Blue Diamond Glutathione Vitamin C 50g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343644/Lait_Snapchat_Facial_Cream_Blue_Diamond_Glutathione_Vitamin_C_50g_kgyhus.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Lait Snapchat Facial Cream Blue Diamond Glutathione Vitamin C 50g.'
      },
      {
        name: 'K Whitening Hydrating Face Cream with Vitamin E SPF',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343630/K_Whitening_Hydrating_Face_Cream_with_Vitamin_E_SPF_wnwtou.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying K Whitening Hydrating Face Cream with Vitamin E SPF.'
      },
      {
        name: 'Golden face cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343625/golden_f6fvrz.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Golden face cream.'
      },
      {
        name: 'Florida Sunblock Face Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343616/Florida-Sunblock_nje9h8.png',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Florida Sunblock Face Cream.'
      },
      {
        name: 'flawless Face Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343606/flawlessFaceCream_dzcmdj.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying flawless Face Cream.'
      },
      {
        name: 'face facts wonder cream Instant Glow Revive',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343598/facefactswondercreamfragrancefree2_z0vjwj.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying face facts wonder cream Instant Glow Revive.'
      },
      {
        name: 'EVER WHITE SUPER WHITENING FACE CREAM',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343592/EVER-WHITE-SUPER-WHITENING-FACE-CREAM_xpnjeu.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying EVER WHITE SUPER WHITENING FACE CREAM.'
      },
      {
        name: 'DR.Rashel Skin Whitening Day Cream 50g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343586/Dr._Rashel_Skin_Whitening_Day_Cream_50g_vlxe9e.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying DR.Rashel Skin Whitening Day Cream 50g.'
      },
      {
        name: 'Dr.Rashel Vitamin C Brightening and Anti Aging face cream 50g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343580/Dr_Rashel_Vitamin_C_Brightening_and_Anti_Aging_face_cream_50g_fbmozd.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dr.Rashel Vitamin C Brightening and Anti Aging face cream 50g.'
      },
      {
        name: 'DIAMOND COMPLEXION GLUTATHIONE SUPER LIGHTENING COMPRESSED CREAM',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343573/DIAMOND_COMPLEXION_GLUTATHIONE_SUPER_LIGHTENING_COMPRESSED_CREAM_pki2zh.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying DIAMOND COMPLEXION GLUTATHIONE SUPER LIGHTENING COMPRESSED CREAM.'
      },
      {
        name: 'Clear face to face baby facial cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343568/Clear_face_to_face_baby_facial_cream_uh2l2u.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Clear face to face baby facial cream.'
      },
      {
        name: 'Ailke Boost Luster 24K Gold Collagen Revitalizing Whitening  Face Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343563/Ailke_Boost_Luster_24K_Gold_Collagen_Revitalizing_Whitening_2_in_1_Face_Cream_Set_rmd1iz.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Ailke Boost Luster 24K Gold Collagen Revitalizing Whitening Face Cream.'
      },
      {
        name: 'SADOER RETINOL Snake Venom Peptide Facial Mask',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481249/SADOERrETINOLSnakeVenomPeptideFacialMask_nxdjk0.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying SADOER RETINOL Snake Venom Peptide Facial Mask.'
      },
      {
        name: 'Pure Indian White Whitening Facial Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481238/PureIndianWhiteWhiteningFacialCream_mcrfn6.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pure Indian White Whitening Facial Cream.'
      },
      {
        name: 'Pure Carrot Gold Whitening Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481230/PureCarrotGoldWhiteningCream_faf5nq.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pure Carrot Gold Whitening Cream.'
      },
      {
        name: 'Parley Beauty Purple Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481175/ParleyBeautyPurpleCream_bodadx.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Parley Beauty Purple Cream.'
      },
      {
        name: 'Neutrogena Hydro Boost Hyaluronic Acid Gel Cream Moisturizer for Extra Dry Skin',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481169/Neutrogena_Hydro_Boost_Hyaluronic_Acid_Gel-Cream_Moisturizer_for_Extra-Dry_Skin_nba7if.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Neutrogena Hydro Boost Hyaluronic Acid Gel Cream Moisturizer for Extra Dry Skin.'
      },
      {
        name: 'Kojie San Skin Lightening Face Cream 30g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481153/Kojie_San_Skin_Lightening_Face_Cream_30g_lzzbtd.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Kojie San Skin Lightening Face Cream 30g.'
      },
      {
        name: 'Injection Strong Whitening Face Cream 30g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481145/Injection_Strong_Whitening_Face_Cream_-_30g_mveny6.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Injection Strong Whitening Face Cream 30g.'
      },
      {
        name: 'Glutathione injection Gluta kojic white illuminateur whitening facial cream ',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481138/Glutathione_injection_Gluta_kojic_white_illuminateur_whitening_facial_cream_d7wswt.png',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Glutathione injection Gluta kojic white illuminateur whitening facial cream.'
      },
      {
        name: 'GLUTATHIONE INJECTION Extreme Face Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481131/GLUTATHIONE_INJECTION_Extreme_Face_Cream_jaf7qp.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying GLUTATHIONE INJECTION Extreme Face Cream.'
      },
      {
        name: 'glutathion injection gluta kojic white organic half cast whitening facial cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481125/glutathion_injection_gluta_kojic_white_organic_half_cast_whitening_facial_cream_jfjeso.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying glutathion injection gluta kojic white organic half cast whitening facial cream.'
      },
      {
        name: 'glutath one injection strong whitening facial cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481118/glutath_one_injection_strong_whitening_facial_cream_il9lrd.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying glutath one injection strong whitening facial cream.'
      },
      {
        name: 'FaceFact Wonder Cream Instant Glow Reviver',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481091/facefactWonderCreamInstantGlowReviver_v2ahc4.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying FaceFact Wonder Cream Instant Glow Reviver.'
      },
      {
        name: 'Face Cream Anti-Acne Dark Spot Pimples Wrinkles',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481077/Face_Cream_Anti-Acne_Dark_Spot_Pimples_Wrinkles_dfd1b1.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Face Cream Anti-Acne Dark Spot Pimples Wrinkles.'
      },
      {
        name: 'Cosrx Advanced Snail 96 Mucin Power Essence Advance Snail 92 All In One Cream 100ml',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481071/Cosrx_Advanced_Snail_96_Mucin_Power_Essence_Advance_Snail_92_All_In_One_Cream_-_100ml_Each_fdhgq8.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Cosrx Advanced Snail 96 Mucin Power Essence Advance Snail 92 All In One Cream 100ml.'
      },
      {
        name: 'Carrot Magic Exclusive Whitening Face Cream',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481065/Carrot_Magic_Exclusive_Whitening_Face_Cream_levn02.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Carrot Magic Exclusive Whitening Face Cream.'
      },
      {
        name: 'Ailke Superior Whitening Smoothen Whitening',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732481055/AilkeSuperiorWhiteningSmoothenWhitening_j8xenp.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Ailke Superior Whitening Smoothen Whitening.'
      },
      {
        name: 'Pacci Pristine Slime Luxe Essence Hydrator',
        price: '2,500',
        image: 'https://salescabal.s3.eu-west-3.amazonaws.com/stores/5998/products/68b9937e58a7e9fde6bd44e5045654c63a0a78c2.jpeg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pacci Pristine Slime Luxe Essence Hydrator'
      },
      {
        name: 'Pacci Pristine Slime Luxe Moisturizer',
        price: '2,500',
        image: 'https://salescabal.s3.eu-west-3.amazonaws.com/stores/5998/products/42b9b1e3a740f557e39b327c6309689d052bc810.jpeg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pacci Pristine Slime Luxe Moisturizer'
      },
      {
        name: 'Berg White Miracle Anti-mark Cream',
        price: '2,500',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPRhSfjgKzUtIqpRBplYh_W999YDm2GIl0zg&s',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Berg White Miracle Anti-mark Cream'
      },
      {
        name: 'Face Fact Vitamin C Face Cream',
        price: '2,500',
        image: 'https://www.24eleven.ng/pub/media/catalog/product/cache/1/image/700x700/e9c3970ab036de70892d86c6d221abfe/f/a/facefacts-vitc-cream.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Face Fact Vitamin C Face Cream'
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
