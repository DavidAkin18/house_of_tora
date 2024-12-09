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
          price: '12,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297319/whitetherapy1_wdohta.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying white therapy gel douche maxi-blanchissert gommant.'
        },
        {
          name: 'white therapy gel douche extra eclaircissant',
          price: '12,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297310/whitetherapy_atiaut.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying white therapy gel douche extra eclaircissant.'
        },
        {
          name: 'White Care Shower Cream 500x500',
          price: '12,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297300/White_Care_Shower_Cream-500x500_ik5ofn.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying White Care Shower Cream 500x500.'
        },
        {
          name: 'White Care Whitening Moisture Spa Shower Cream',
          price: '12,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297283/White_Care_WhiteningMoistureSpaShowerCream_sxaxwu.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying White Care Whitening Moisture Spa Shower Cream.'
        },
        {
          name: 'Veet gold Gluta white 10 whitening shower gel',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297260/Veetgold_Gluta_white_10_whitening_shower_gel_xzn50q.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet gold Gluta white 10 whitening shower gel.'
        },
       
        {
          name: 'Ultimate Aliya',
          price: '9,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297105/UltimateAliya_eybchc.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying Ultimate Aliya.'
        },
        {
          name: 'Veet Gold Body Wash',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297236/Veet_Gold_Veetgold_Body_Wash_tryfdj.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Body Wash.'
        },
        {
          name: 'Veet Gold Tomato Lycopene Extra Whitening Shower Bath White Glow SPF 30 1000ml',
          price: '10,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297222/Veet_Gold_Tomato_Lycopene_Extra_Whitening_Shower_Bath_White_Glow_SPF_30_1000ml_vtnasq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Veet Gold Tomato Lycopene Extra Whitening Shower Bath White Glow SPF 30 1000ml.'
        },
        {
          name: 'Sugar And Milk Body Magic Super Whitening',
          price: '9,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297096/SugaAndMilkBodyMagicSuperWhitening_ks5gnp.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Sugar And Milk Body Magic Super Whitening.'
        },
        {
          name: 'veet gold teen multivitamin',
          price: '7,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297208/veet_gold_teen_multivitamin_ctrqyr.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying veet gold teen multivitamin.'
        },
        {
          name: 'strawberry And Peach Extra Whitening',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297089/strawberryAndPeachExtraWhitening_d3tkur.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying strawberry And Peach Extra Whitening.'
        },
        {
          name: "st'Ives Bath",
          price: '12,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297083/St._Ives_Bath_j1g8sh.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying st\'Ives Bath.'
        },
        {
          name: 'Skin by Zaron Vitamin C Body Wash',
          price: '12,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297062/Skin_by_Zaron_Vitamin_C_Body_Wash_ppq2dq.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Skin by Zaron Vitamin C Body Wash.'
        },
        {
          name: 'sepi White Body Corrector Body Glowing',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297051/sepiWhiteBodyCorrectorBodyGlowing_el8jtt.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying sepi White Body Corrector Body Glowing.'
        },
        {
          name: 'Pr.Francoise Bedon Paris Carrot Caviar Whitening Shower Gel',
          price: '7,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297041/Pr._FrancoiseBedonCarrot_CaviarWhiteningShowerGel_cqqynj.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pr.Francoise Bedon Paris Carrot Caviar Whitening Shower Gel.'
        },
        {
          name: 'Olay Vitamin C Body Wash',
          price: '21,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297025/Olay_Vitamin_C_Body_Wash_b60zqq.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Olay Vitamin C Body Wash.'
        },
        {
          name: 'Nivea Fresh Shower Gel Wild Berry Scent 500ml',
          price: '8,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297008/Nivea_Fresh_Shower_Gel_Wild_Berry_Scent_500ml_ev4tsl.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nivea Fresh Shower Gel Wild Berry Scent 500ml.'
        } ,
        // {
        //   name: 'Nivea Energizing Shower Gel with Vitamin C 500ml',
        //   price: '7,500',
        //   image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297015/Nivea-Love-Adventure-Aloe-Fresh-Scented-Shower-Gel-ml_g1plyh.jpg',
        //   whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nivea Energizing Shower Gel with Vitamin C 500ml.'
        // },
        {
          name: 'Nivea Aloe Vera Shower Gel 500ml',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297015/Nivea-Love-Adventure-Aloe-Fresh-Scented-Shower-Gel-ml_g1plyh.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nivea Aloe Vera Shower Gel 500ml.'
        },
        {
          name: 'Dove Purely Pampering Nourishing Body Wash with Shea Butter and Warm Vanilla',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296814/DoveRevivingBodyWash450mlnigeria_vfgqtu.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Dove Purely Pampering Nourishing Body Wash with Shea Butter and Warm Vanilla.'
        },
        {
          name: 'Nano White Niacinamide',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296960/nanoWhite_Niacinamide_chh2uf.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nano White Niacinamide'
        },
        {
          name: 'Medix 5.5 Lactic Acid',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296950/medix-lactic-acid_xvb19i.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Medix 5.5 Lactic Acid'
        },
        {
          name: 'Lilies Kids Teens Milk Wash 1600x',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296941/Lilies_Kids_Teens_Milk_Wash_1600x_kvik9v.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Lilies Kids Teens Milk Wash 1600x'
        },
        {
          name: 'Idole ',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296927/idole_nzif9i.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Idole'
        },
        {
          name: 'Healthy Glow Pro Lightening Milk ',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296914/healthGlow_xajczq.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Healthy Glow Pro Lightening Milk '
        },
        {
          name: 'HalfCast Carotte Lightening Shower Gel',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296905/HalfCast_Carotte_Lightening_Shower_Gel_d0alqc.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying HalfCast Carotte Lightening Shower Gel'
        },
        {
          name: 'Half Cast Vitamin C Pro Lightening Bath Gel ',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296893/Half_Cast_Vitamin_C_Pro_Lightening_Bath_Gel_odndxy.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Half Cast Vitamin C Pro Lightening Bath Gel'
        },
        {
          name: 'Golden glow intensive whitening and exfoliating shower gel',
          price: '5,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296885/Golden_glow_intensive_whitening_and_exfoliating_shower_gel_and_Golden_Glow_Intensive_Half_Cast_Lightening_Shower_Bath_-_1000ml_lkslfa.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Golden glow intensive whitening and exfoliating shower gel'
        },
        {
          name: 'Gluthione Injection Shower Bath',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296879/gluthioneInjectionShowerBath_nx4quw.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Gluthione Injection Shower Bath'
        },
        {
          name: 'Fruiser Double Moisturizing Shower Goats Milk Bath And Pearl Powder ',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296866/Fruiser_Double_Moisturizing_Shower_Goat_s_Milk_Bath_And_Pearl_Powder_j62xze.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fruiser Double Moisturizing Shower Goats Milk Bath And Pearl Powder'
        },
        {
          name: 'Faster White Paris Snail Slime Exfoliating Luxury Shower Milk ',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296856/Faster_White_Paris_Snail_Slime_Exfoliating_Luxury_Shower_Milk_x8vmfe.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Faster White Paris Snail Slime Exfoliating Luxury Shower Milk '
        },
        {
          name: 'Fair Child Yellow Shower Gel',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296847/Fair-child-yellow-shower-gel_hpfzkg.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fair Child Yellow Shower Gel'
        },
        {
          name: 'Fair Child Natural Moisturizing Body Milk Wash',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296839/Fair-Child-Natural-Moisturizing-Body-Milk-Wash-300x300_hdo5z2.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fair Child Natural Moisturizing Body Milk Wash'
        },




        {
          name: 'Half Cast Extra Fairness ',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296829/extraFairness_u8kzd9.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Half Cast Extra Fairness'
        },
        {
          name: 'Easy Glow Shower Bath',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296823/easyGlow_lt8bpg.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Easy Glow Shower Bath'
        },
        {
          name: "Dr Teal's Foaming Bath Soap",
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296819/DrTeals_ioxmri.webp',
          whatsappLink: "https://wa.me/9092627921?text=Hello, I am interested in buying Dr Teal's Foaming Bath Soap"
        },
        {
          name: 'Boots Baby Head to toe wash',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296800/boots-head-to-toe_wash_mennkf.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in Boots Baby Head to toe wash'
        },
        {
          name: 'BELLA WHITE WHITENING BODY WASH VARIANCE',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296787/BELLA-WHITE-WHITENING-BODY-WASH-VARIANCE_i0btmz.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying BELLA WHITE WHITENING BODY WASH VARIANCE'
        },
        {
          name: 'Baby Secret Amino Acids Baby Shower Gel-Liquid Bath 1000ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296777/Baby_Secret_Amino_Acids_Baby_Shower_Gel_-_Liquid_Bath_1000ml_pocncm.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Baby Secret Amino Acids Baby Shower Gel-Liquid Bath 1000ml'
        },
        {
          name: 'Amino Acid And Glycolic Acid ',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296768/aminoAcidAndGlycolicAcid_sbndmj.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Amino Acid And Glycolic Acid '
        },
        {
          name: 'Le Asian White Exfoliating Whitening Body wash',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296748/Le_Asian_White_Exfoliating_Whitening_Body_wash_haxdze.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fair Child Natural Moisturizing Body Milk Wash'
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
