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
      searchQuery: '',
      showDropdown:false,
      products: [
        {
          name: 'Wins Town Weight Gainer',
          price: '25,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152160/WinsTownWeightGainer_siygn4.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Wins Town Weight Gainer.'
        },
        {
          name: 'white Filter Skin Beauty',
          price: '40,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152145/whiteFilterSkinBeauty_wsrn4m.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the white Filter Skin Beauty.'
        },
        {
          name: 'White Doll',
          price: '45,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152135/WhiteDoll_vuecvl.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the White Doll.'
        },
        {
          name: 'White Babe Whitening And Energy Booster',
          price: '45,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152118/WhiteBabeWhiteningAndEnergyBooster_prmpao.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the White Babe Whitening And Energy Booster.'
        },
        {
          name: 'Evening primrose oil 500-mg 90 soft gel',
          price: '18,000',
          image: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/02/0988253/1.jpg?8764',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Evening primrose oil 500-mg 90 soft gel.'
        },
        {
          name: 'Vitamin C For Kids Gummies',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152085/VitamincForKidsGummies_jkkkf5.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Vitamin C For Kids Gummies.'
        },
        {
          name: 'vita-source natural b carotene capsule',
          price: '25,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152075/vita_source-natural-b-carotene-capsules_m2pnps.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the vita-source natural b carotene capsule.'
        },
        {
          name: 'Vitamin C 1000',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152068/vit-c-1000_imx20s.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the vit-c-1000.'
        },
        {
          name: 'Super Curry Weight Gain',
          price: '25,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152060/superCurrryWeightGain_htul5k.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Super Curry Weight Gain.'
        },
        {
          name: 'SOQ gluta and collagen',
          price: '18,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152051/SOQ-gluta-and-collagen_k4tq0b.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the SOQ gluta and collagen.'
        },
        {
          name: 'skin whitening vitamins gummies',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152027/skin-whitening-vitamins-gummies_bvrssy.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the skin whitening vitamins gummies.'
        },
        {
          name: 'skandal White Blinks',
          price: '40,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152014/skandalWhiteBlinks_ehafbu.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the skandal White Blinks.'
        },
        {
          name: 'Skandal Miracle Pure White Glutathione',
          price: '40,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152004/Skandal-Miracle-Pure-White-Glutathione-300x300-1_vdaymg.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Skandal Miracle Pure White Glutathione.'
        },
        {
          name: 'satin skin white blanc',
          price: '40,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151994/satinskinzwhiteblanc_s8fndq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the satin skin white blanc.'
        },
        {
          name: 'pro collagen fruit pectin gummies',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151985/pro-collagen-fruit-pectin-gummies_kmvzdn.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the pro collagen fruit pectin gummies.'
        },
        {
          name: 'PMS Relief Gummies',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151974/PMS-Relief-Gummies_fcbr1l.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the PMS Relief Gummies.'
        },
        {
          name: 'pearl white pinky plus',
          price: '40,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151964/pinkyplus_lorxtv.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the pearl white pinky plus.'
        },
        {
          name: 'Phyto Collagen King Of Whitening',
          price: '40,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151952/Phyto-Collagen-King-Of-Whitening-Supplement-1000ml_lwxc1m.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Phyto Collagen King Of Whitening.'
        },
        {
          name: 'ONNY Collagen Capsules',
          price: '15,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151943/ONNY-Collagen-Capsules_rrslup.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the ONNY Collagen Capsules.'
        },
        {
          name: 'Natures cure Anti-aging Renew',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151933/natures-cure-anti-aging-renew_uoivue.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the natures cure anti-aging renew.'
        },
        {
          name: 'nature cure anti aging gummies',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151924/naturecure-anti-aging-gummies_lis5gt.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the nature cure anti aging gummies.'
        },
        {
          name: 'nature cure whitening gummies strawberry flavour',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151913/nature-cure-whitening-gummies-strawberry-flavour_g9u46r.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the nature cure whitening gummies strawberry flavour.'
        },
        {
          name: 'ladies Shine',
          price: '10,000',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyXgqI-LZqINFXtoAvej7fZ6kX1YE6qXQmpQ&s',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Ladies Shine.'
        },

        {
          name: 'ladies Collagen',
          price: '25,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151889/ladiesCollagen_vnjxyb.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the ladies Collagen.'
        },
        {
          name: 'Kumiko Collagen Salmon',
          price: '25,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151877/KumikoCollagenSalmon_pppz5t.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Kumiko Collagen Salmon.'
        },
        {
          name: 'juliet Eve',
          price: '25,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151868/julietAva_tzrbhe.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the juliet Ava.'
        },
        {
          name: 'joju Collagen',
          price: '18,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151860/jojuCollagen_ydq7uo.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the joju Collagen.'
        },
        {
          name: 'herbal Hip Or Butt Enlargement',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151853/herbalHipOrButtEnlargement_a9hdaz.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the herbal Hip Or Butt Enlargement.'
        },
        {
          name: 'Gluta White Sparkle',
          price: '40,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151846/GlutaWhiteSparkle_hbzlpl.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Gluta White Sparkle.'
        },
        {
          name: 'glutathione collagen glow',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151832/glutathione-collagen-glow_ven0pg.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the glutathione collagen glow.'
        },
        {
          name: 'Froza Tomato Collagen',
          price: '10,000',
          image: 'https://mycarekits.com/cdn/shop/products/image_93f3d710-d03d-474c-baee-240a2834802c_1200x1200.png?v=1660375324',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Froza Tomato Collagen.'
        },
        {
          name: 'Frozen Detox Collagen',
          price: '10,000',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUIeWmSB4oCwupLTgbRAyF3WcrMJy1oNpXYQ&s',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Frozen Detox Collagen.'
        },
        {
          name: 'Froza Vitamin C+ Collagen',
          price: '10,000',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdJnN2kGMVA4PtpggE571qickTQ2WTeuTMJw&s',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Froza Vitamin C+ Collagen.'
        },
        {
          name: 'Gluta Primme V2M',
          price: '10,000',
          image: 'https://pictures-nigeria.jijistatic.net/121618172_NjIwLTgyNy0wNTkzOWJhM2VlLTM.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Gluta Primme V2M.'
        },
        {
          name: 'Frozen Collagen 2 in 1',
          price: '10,000',
          image: 'https://www-konga-com-res.cloudinary.com/f_auto,fl_lossy,dpr_3.0,q_auto/media/catalog/product/B/E/182332_1614552057.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Frozen Collagen 2 in 1.'
        },
        {
          name: '100% Aguaje Gummy ',
          price: '15,000',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBClVycRhfM52txS3D4NzGO1Kpfq2-PmhrfA&s',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the 100% Aguaje Gummy.'
        },
        {
          name: 'WinsTown Maca Plus',
          price: '12,000',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnq2WSjn9Gba5O1pl6ho0wgpZunGSuLZPcFw&s',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the WinsTown Maca Plus.'
        },
        {
          name: 'WinsTown Hip Butt Enhancing Gummies',
          price: '10,000',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq-xqDqGvZjlEfjNiAjm3im_tEaqN46LnK4A&s',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the WinsTown Maca Plus.'
        },
        {
          name: 'fevert hb hair skin nails Big size',
          price: '25,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151796/fevert-hb_hair-skin-nails-Big_fzat06.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the fevert hb hair skin nails Big size.'
        },
        {
          name: 'fevert hb hair skin nails small size',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151787/fevert-hb_hair-skin-nails_small_uofoxe.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the fevert hb hair skin nails small size.'
        },
        {
          name: 'dynewell',
          price: '6,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151774/dynewell_evuesp.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the dynewell.'
        },
        {
          name: 'ultra potency vitamin C gummies',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151765/daynrr-vitamin-c-gummies_kgawax.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the ultra potency vitamin C gummies.'
        },
        {
          name: 'Acorbic c-1000',
          price: '13,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151752/c-1000_ffkvzt.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Acorbic c-1000.'
        },
        {
          name: 'bluta Berry',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151744/blutaBerry_fjmclk.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the bluta Berry.'
        },
        {
          name: 'BBL Gummies',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151736/BBL-Gummies_ynypop.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the BBL Gummies.'
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
