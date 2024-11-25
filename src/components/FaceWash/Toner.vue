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
            name: 'Yan Namei Ji Rose Water Toner-450ml',
            price: '2,000',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284756/Yan_Namei_Ji_Rose_Water_Toner-450ml_kbvy6s.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Yan Namei Ji Rose Water Toner-450ml.'
          },
          {
            name: 'Veet gold Kojic Acid Amino Acid Whitening Refreshing Cleansing Toner SPF15',
            price: '35,000',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284742/Veetgold_Kojic_Acid_Amino_Acid_Whitening_Refreshing_Cleansing_Toner_SPF15_sszn4g.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Veet gold Kojic Acid Amino Acid Whitening Refreshing Cleansing Toner SPF15.'
          },
          {
            name: 'VEET GOLD Clarifying Astringent Face Toner Extra Whitening',
            price: '3,000',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284727/VEET_GOLD_Veetgold_Clarifying_Astringent_Face_Toner_Extra_Whitening_nyojjp.jpg',
            whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the VEET GOLD Clarifying Astringent Face Toner Extra Whitening.'
          },
          {
            name: 'St Ives Glowing Apricot Facial Cleanser',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284709/St_Ives_Glowing_Apricot_Facial_Cleanser_wh0fjc.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the St Ives Glowing Apricot Facial Cleanser.'
          },
          {
            name: 'skin By Zaron ultimate glow',
            price: '2,000',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284688/skinByZaron_ultimate_glow_poasjj.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the skin By Zaron ultimate glow.'
          },
          {
            name: 'Simple Soothing Facial Toner',
            price: '35,000',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284678/Simple_Soothing_Facial_Toner_qx37wf.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Simple Soothing Facial Toner.'
          },
          {
            name: 'Royal Refreshing Toner Green Tea',
            price: '3,000',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284653/Royal_Refreshing_Toner_Green_Tea_hluaqp.jpg',
            whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Royal Refreshing Toner Green Tea.'
          },
          {
            name: 'Pro skin care Nano Half caste whitening Cleaser Toner',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284637/Pro_skin_care_Nano_Halfcaste_whitening_Cleaser_Toner_ij1cfi.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Pro skin care Nano Half caste whitening Cleaser Toner.'
          },
          {
            name: "L'Oreal Paris Tonic Delicate Flowers 400mL",
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284629/L_Oreal_Paris_Tonic_Delicate_Flowers_400_mL_tvvgzj.png',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the L\'Oreal Paris Tonic Delicate Flowers 400mL.'
          },
          {
            name: 'Hit The Spot Hit The Spots Blackhead Facial Cleanser 200ml',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284616/Hit_The_Spot_Hit_The_Spots_Blackhead_Facial_Cleanser_200ml_qrkojc.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Hit The Spot Hit The Spots Blackhead Facial Cleanser 200ml.'
          },
          {
            name: 'skin success Completion toner',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284609/eventone-toner-removebg-preview_okwmjv.png',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the skin success Completion toner.'
          },
          {
            name: 'Estelin Skin Care Set Hydrating Vitalizing',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284557/Estelin_Skin_Care_Set_Hydrating_Vitalizing_4_Piece_Set_xsqbfi.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Estelin Skin Care Set Hydrating Vitalizing.'
          },
          {
            name: 'Cosmeticary bruxelles Anua Heart leaf- 77-Soothing Toner',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284542/Cosmeticary-bruxelles-Anua-Heartleaf-77_-Soothing-Toner_1024x1024_gkn4va.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Cosmeticary bruxelles Anua Heart leaf- 77-Soothing Toner.'
          },
          {
            name: 'Clean and Clear Essentials Deep Cleansing Toner',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284528/Clean-and-Clear-Essentials-Deep-Cleansing-Toner_bquehr.png',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Clean and Clear Essentials Deep Cleansing Toner.'
          },
          {
            name: 'BOOT GLYCERIN AND ROSEWATER TONER',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284514/BOOT_GLYCERIN_AND_ROSEWATER_TONER_bnin2g.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the BOOT GLYCERIN AND ROSEWATER TONER.'
          },
          {
            name: 'beauty formulas vit-c facial tonic',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284338/beautyformulas-vit-c-facialtonic_oh6hqo.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the beauty formulas vit-c facial tonic.'
          },
          {
            name: 'Babymed-Cologne-200 500ml',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284322/Babymed_-_Cologne_-_200_500_ml_yav2kq_ozanij.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Babymed-Cologne-200 500ml.'
          },
          {
            name: '5 ACWELL LICORICE PH BALANCING CLEANSING TONER',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284304/Acwell_5.5_ACWELL_LICORICE_PH_BALANCING_CLEANSING_TONER_qmtfu8.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the 5 ACWELL LICORICE PH BALANCING CLEANSING TONER.'
          },
          {
            name: 'Skin Doctor Papaya And Natural Witch Hazel Toner 200ml',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482568/Skin-Doctor-Papaya-And-Natural-Witch-Hazel-Toner-200ml_ec784d8d-3036-49a6-aec9-c1e959c1c3df_lhdfwq.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Skin Doctor Papaya And Natural Witch Hazel Toner 200ml.'
          },
          {
            name: 'Natural Beauty Blossom Essence 360 Cherry Toner',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732482562/NaturalBeautyBlossoMessnce360Cherry_toner_vf45yj.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Natural Beauty Blossom Essence 360 Cherry Toner.'
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
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .dropdown-container {
      scrollbar-width: thin; /* Firefox */
      scrollbar-color: #b87f61 transparent;
    }

    .dropdown-container::-webkit-scrollbar {
      width: 8px;
    }

    .dropdown-container::-webkit-scrollbar-thumb {
      background: #b87f61;
      border-radius: 4px;
    }

    .dropdown-container::-webkit-scrollbar-thumb:hover {
      background: #935943;
    }
    .fixed {
      transition: opacity 0.3s ease-in-out;
    }
  </style>
  