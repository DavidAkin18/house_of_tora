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
          name: 'white therapy gel douche maxi-blanchissert gommant',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297319/whitetherapy1_wdohta.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying white therapy gel douche maxi-blanchissert gommant.'
        },
        {
          name: 'white therapy gel douche extra eclaircissant',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297310/whitetherapy_atiaut.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying white therapy gel douche extra eclaircissant.'
        },
        {
          name: 'White Care Shower Cream 500x500',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297300/White_Care_Shower_Cream-500x500_ik5ofn.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying White Care Shower Cream 500x500.'
        },
        {
          name: 'White Care Whitening Moisture Spa Shower Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297283/White_Care_WhiteningMoistureSpaShowerCream_sxaxwu.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying White Care Whitening Moisture Spa Shower Cream.'
        },
        {
          name: 'Veet gold Gluta white 10 whitening shower gel',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297260/Veetgold_Gluta_white_10_whitening_shower_gel_xzn50q.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet gold Gluta white 10 whitening shower gel.'
        },
        {
          name: 'veet gold lemon facial cleanser toner 500x500',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297247/veet-gold-lemon-facial-cleanser-toner-500x500_sfbb3s.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying veet gold lemon facial cleanser toner 500x500.'
        },
        {
          name: 'Ultimate Aliya',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297105/UltimateAliya_eybchc.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying Ultimate Aliya.'
        },
        {
          name: 'Veet Gold Body Wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297236/Veet_Gold_Veetgold_Body_Wash_tryfdj.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Body Wash.'
        },
        {
          name: 'Veet Gold Tomato Lycopene Extra Whitening Shower Bath White Glow SPF 30 1000ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297222/Veet_Gold_Tomato_Lycopene_Extra_Whitening_Shower_Bath_White_Glow_SPF_30_1000ml_vtnasq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Tomato Lycopene Extra Whitening Shower Bath White Glow SPF 30 1000ml.'
        },
        {
          name: 'Sugar And Milk Body Magic Super Whitening',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297096/SugaAndMilkBodyMagicSuperWhitening_ks5gnp.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Sugar And Milk Body Magic Super Whitening.'
        },
        {
          name: 'veet gold teen multivitamin',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297208/veet_gold_teen_multivitamin_ctrqyr.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying veet gold teen multivitamin.'
        },
        {
          name: 'strawberry And Peach Extra Whitening',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297089/strawberryAndPeachExtraWhitening_d3tkur.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying strawberry And Peach Extra Whitening.'
        },
        {
          name: "st'Ives Bath",
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297083/St._Ives_Bath_j1g8sh.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying st\'Ives Bath.'
        },
        {
          name: 'Skin by Zaron Vitamin C Body Wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297062/Skin_by_Zaron_Vitamin_C_Body_Wash_ppq2dq.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Skin by Zaron Vitamin C Body Wash.'
        },
        {
          name: 'sepi White Body Corrector Body Glowing',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297051/sepiWhiteBodyCorrectorBodyGlowing_el8jtt.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying sepi White Body Corrector Body Glowing.'
        },
        {
          name: 'Pr.Francoise Bedon Paris Carrot Caviar Whitening Shower Gel',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297041/Pr._FrancoiseBedonCarrot_CaviarWhiteningShowerGel_cqqynj.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pr.Francoise Bedon Paris Carrot Caviar Whitening Shower Gel.'
        },
        {
          name: 'Olay Vitamin C Body Wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297025/Olay_Vitamin_C_Body_Wash_b60zqq.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Olay Vitamin C Body Wash.'
        },
        {
          name: 'Nivea Love Adventure Aloe Fresh Scented Shower Gel 500ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297015/Nivea-Love-Adventure-Aloe-Fresh-Scented-Shower-Gel-ml_g1plyh.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nivea Love Adventure Aloe Fresh Scented Shower Gel 500ml.'
        },
        {
          name: 'Nivea Fresh Shower Gel Wild Berry Scent 500ml',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297008/Nivea_Fresh_Shower_Gel_Wild_Berry_Scent_500ml_ev4tsl.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nivea Fresh Shower Gel Wild Berry Scent 500ml.'
        } ,
        {
          name: 'Nivea Energizing Shower Gel with Vitamin C 500ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296987/Nivea_Energizing_Shower_Gel_with_Vitamin_C_500ml_juvw5u.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nivea Energizing Shower Gel with Vitamin C 500ml.'
        },
        {
          name: 'Nivea Aloe Vera Shower Gel 500ml',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296976/Nivea_Aloe_Vera_Shower_Gel_500ml_mzg9ry.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nivea Aloe Vera Shower Gel 500ml.'
        },
        {
          name: 'Dove Purely Pampering Nourishing Body Wash with Shea Butter and Warm Vanilla',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296962/Dove_Purely_Pampering_Nourishing_Body_Wash_with_Shea_Butter_and_Warm_Vanilla_qjc0k5.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dove Purely Pampering Nourishing Body Wash with Shea Butter and Warm Vanilla.'
        },
        {
          name: 'Dove Go Fresh Body Wash Cool Moisture with Cucumber & Green Tea',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296955/Dove_Go_Fresh_Body_Wash_Cool_Moisture_with_Cucumber_Green_Tea_vwkhvo.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dove Go Fresh Body Wash Cool Moisture with Cucumber & Green Tea.'
        },
        {
          name: 'Palmolive Luminous Oils Shower Gel 500ml',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296941/Palmolive_Luminous_Oils_Shower_Gel_500ml_pbyedl.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Palmolive Luminous Oils Shower Gel 500ml.'
        },
        {
          name: 'Palmolive Aroma Shower Gel 500ml',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296934/Palmolive_Aroma_Shower_Gel_500ml_t5eqgf.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Palmolive Aroma Shower Gel 500ml.'
        },
        {
          name: 'Luxe Body Wash 500ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296923/Luxe_Body_Wash_500ml_xkeu2l.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Luxe Body Wash 500ml.'
        },
        {
          name: 'Dove Deeply Nourishing Body Wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296911/Dove_Deeply_Nourishing_Body_Wash_h1hrim.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dove Deeply Nourishing Body Wash.'
        },
        {
          name: 'Nivea Cream Care Shower Gel 500ml',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296894/Nivea_Cream_Care_Shower_Gel_500ml_pok9jy.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nivea Cream Care Shower Gel 500ml.'
        },
        {
          name: 'Dove Men+Care Clean Comfort Body Wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296881/Dove_Men_Care_Clean_Comfort_Body_Wash_t1kmaq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dove Men+Care Clean Comfort Body Wash.'
        },
        {
          name: 'Borghese Fango Active Mud for Face and Body',
          price: '5,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296871/Borghese_Fango_Active_Mud_for_Face_and_Body_yqbycs.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Borghese Fango Active Mud for Face and Body.'
        },
        {
          name: 'Scented Body Wash 500ml',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296859/Scented_Body_Wash_500ml_xbcryp.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Scented Body Wash 500ml.'
        },
        {
          name: 'Cleansing Body Scrub Shower Gel 500ml',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296847/Cleansing_Body_Scrub_Shower_Gel_500ml_svduwz.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Cleansing Body Scrub Shower Gel 500ml.'
        },
        {
          name: 'Neutrogena Rainbath Shower Gel',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296835/Neutrogena_Rainbath_Shower_Gel_d1gkqg.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Neutrogena Rainbath Shower Gel.'
        },
        {
          name: 'Luxe Body Wash with Argan Oil',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296822/Luxe_Body_Wash_with_Argan_Oil_e7o3yg.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Luxe Body Wash with Argan Oil.'
        },
        {
          name: 'Himalaya Refreshing Body Wash 500ml',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296811/Himalaya_Refreshing_Body_Wash_500ml_n2vb4e.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Himalaya Refreshing Body Wash 500ml.'
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
