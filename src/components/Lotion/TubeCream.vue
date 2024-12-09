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
      searchQuery:'',
      showDropdown:false,
      products: [
        { 
          name: 'AMOSCLEAR SPOT GEL CREAM', 
          price: '4,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142523/amosclear-spot-gel-cream_knqrve.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the AMOSCLEAR SPOT GEL CREAM product.' 
        },
        { 
          name: 'ANIVAT DARK CORRECTOR CREAM', 
          price: '4,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142543/anivat-dark-corrector-cream_lcxt8u.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the ANIVAT DARK CORRECTOR CREAM product.' 
        },
        { 
          name: 'APPLEVET LIGHTENING CREAM', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142549/applevet-lightening-cream_vvpeb9.jpg', 
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the APPLEVET LIGHTENING CREAM product.' 
        },
        { 
          name: 'CLIN-CAP GEL ACNE & PIMPLES', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142568/CLIN-CAP-Gel-Acne-_-Pimples_bgqf3x.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the CLIN-CAP GEL ACNE & PIMPLES product.' 
        },
        { 
          name: 'COLLAGEN SNAIL EYE CREAM', 
          price: '3,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142578/collagen-snail-eye-cream_yebwk3.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the COLLAGEN SNAIL EYE CREAM product.' 
        },
        { 
          name: 'EPIDERM CREAM', 
          price: '1,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142584/Epiderm-cream_fq7x3d.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the EPIDERM CREAM product.' 
        },
        { 
          name: 'FEAH WHITENING BEAUTY', 
          price: '3,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142589/feah-whitening-beauty_pvsyz2.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the FEAH WHITENING BEAUTY product.' 
        },
        { 
          name: 'GLOBATIN CREAM', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142596/Globatin-Cream-30G_u2hria.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the GLOBATIN CREAM product.' 
        },
        { 
          name: 'KETINEAL CREAM', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142604/ketineal-cream_rzdxbp.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the KETINEAL CREAM product.' 
        },
        { 
          name: 'KOJIC CLEAR FAST ACTION CREAM', 
          price: '4,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142613/Kojic-Clear-Fast-Action-Cream-50g_900x_e7462790-6692-4a00-899f-e57cecfb61d7_c7rbcz.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the KOJIC CLEAR FAST ACTION CREAM product.' 
        },
        { 
          name: 'KOJIC CLEAR CREAM', 
          price: '4,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142624/kojic-clear_klalm8.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the KOJIC CLEAR CREAM product.' 
        },
        
        { 
          name: 'KPATA-KPATA CREAM', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142641/kpata-kpata-cream_wbx2yp.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the KPATA-KPATA CREAM product.' 
        },
        { 
          name: 'MENOTONE CREAM', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142646/menotone_cream_urkbpd.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the MENOTONE CREAM product.' 
        },
        { 
          name: 'MIRACLE DERM CREAM', 
          price: '2,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142656/miracle-derm_cream_md8tuq.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the MIRACLE DERM CREAM product.' 
        },
        { 
          name: 'NEOPROSONE-GEL FORTE', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142667/neoprosone-gel_forte_omrsat.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the NEOPROSONE-GEL FORTE product.' 
        },
        { 
          name: 'OLAYBACT CREAM', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142676/olaybact_cream_c59h4a.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the OLAYBACT CREAM product.' 
        },
        { 
          name: 'SKIGUD CREAM', 
          price: '2,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142686/skigud_cream_kh9g9h.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the SKIGUD CREAM product.' 
        },
        { 
          name: 'TYDINEAL CREAM', 
          price: '2,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142705/tydineal-cream_wqzdxh.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the TYDINEAL CREAM product.' 
        },
        { 
          name: 'VISTA PLUS CREAM', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142712/vista-plus_ey5xdo.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the VISTA PLUS CREAM product.' 
        },
        { 
          name: 'YTACAN CLOTRIMAZOLE CREAM', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732142719/Ytacan-clotrimazole-cream_ippidl.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the YTACAN CLOTRIMAZOLE CREAM product.' 
        },
        { 
          name: 'CERAMIDE SKIN BARRIER COMPLEX', 
          price: '4,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732194813/FaceFactsCeramideEyeCream_zl8bkp.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the CERAMIDE SKIN BARRIER COMPLEX' 
        },


        { 
          name: 'Ezanic Azelaic Acid Gel 15g', 
          price: '10,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480287/EzanicAzelaicAcidGel20_15g_njtb1n.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Ezanic Azelaic Acid Gel 15g.'
        },
        { 
          name: 'Cindella Vitamin C Injection Tube Cream', 
          price: '5,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480280/CindellaVitaminCInjectionTubeCream_dmwynz.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Cindella Vitamin C Injection Tube Cream.'
        },
        { 
          name: 'Abebi White Gluta Black Treatment Action Rapid tube cream', 
          price: '5,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480273/AbebiWhiteGlutaBlackTraitementsActionRapid_tube_cream_lp5eps.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Abebi White Gluta Black Treatment Action Rapid tube cream.'
        },
        { 
          name: 'Generic Gbobonise For Skin Tube Cream', 
          price: '1,700', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480309/GenericGboboniseForSkinTubeCream_bgbsxt.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Generic Gbobonise For Skin Tube Cream.'
        },
        { 
          name: 'Kojivit Ultra', 
          price: '16,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480341/KojivitUltra_kcmmj5.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Kojivit Ultra.'
        },
        { 
          name: 'Melalite Forte Hydroquinone Cream', 
          price: '10,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480349/Melalite_Forte_Hydroquinone_Cream_pnnkzi.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Melalite Forte Hydroquinone Cream.'
        },
        { 
          name: 'Melanofree Cream', 
          price: '10,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480358/melanofree-cream_brpcyk.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Melanofree Cream.'
        },
        { 
          name: 'Menarini A Ret Tretinoin Gel', 
          price: '10,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480368/Menarini_A-Ret_Tretinoin_Gel_0.05_Retin_A_20G_lk22jp.png', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Menarini A Ret Tretinoin Gel.'
        },
        { 
          name: 'OXY 10', 
          price: '6,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480376/OXY10_rwps7a.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying OXY 10.'
        },
        { 
          name: 'revuele SOS anti-inflamation Spot Treatment Salicylic Acid Gel', 
          price: '6,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480385/revueleSOSanti-inflamationSpotTreatmentSalicylicAcidGel_w8v18s.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying revuele SOS anti-inflamation Spot Treatment Salicylic Acid Gel.'
        },
        { 
          name: 'Tretinion Gel USP', 
          price: '10,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480394/TretinionGelUSP_tdz2tn.webp', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Tretinion Gel USP.'
        },
        { 
          name: 'White Gluta Berry white tube cream', 
          price: '5,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480410/White_Gluta_Berry_white_tube_cream_avsznq.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying White Gluta Berry white tube cream.'
        },
        { 
          name: 'Zapzyt', 
          price: '17,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732480420/Zapzyt_a1docy.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Zapzyt.'
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
