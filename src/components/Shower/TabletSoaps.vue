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
        name: 'VEET GOLD Sugar Whitening Soap',
        price: '4,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337294/VEET_GOLD_Sugar_Whitening_Soap_gqubng.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the VEET GOLD Sugar Whitening Soap.'
      },
      {
        name: 'VEET GOLD Skin Whitening And Toning Transparent Soap X3',
        price: '4,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337288/VEET_GOLD_Skin_Whitening_And_Toning_Transparent_Soap_X3_tr2viu.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the VEET GOLD Skin Whitening And Toning Transparent Soap X3.'
      },
      {
        name: 'Super Brightening Soap with GLUTA injection extracts',
        price: '5,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337282/Super_Brightening_Soap_with_GLUTA_injection_extracts_idqju6.jpg',
        whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Super Brightening Soap with GLUTA injection extracts.'
      },
      {
        name: 'SNAPCHAT SOAP BLUE DIAMOND 150g',
        price: '4,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337273/SNAPCHAT_SOAP_BLUE_DIAMOND_150g_wsdbpx.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the SNAPCHAT SOAP BLUE DIAMOND 150g.'
      },
      {
        name: 'Lait SAVON SELFIE 24H COLLAGEN BOOSTER ALPHA ARBUTIN SOAP',
        price: '4,500',
        image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/43/7958563/1.jpg?9535',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lait SAVON SELFIE 24H COLLAGEN BOOSTER ALPHA ARBUTIN SOAP'
      },
      {
        name: 'Extract Whitening Herbal Soap',
        price: '2,500',
        image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/59/2123841/2.jpg?3201',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Extract Whitening Herbal Soap'
      },
      {
        name: 'Smooth As Silk Extra Cool Complexion Toning Soap -200gm',
        price: '4,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337263/Smooth_As_Silk_Extra_Cool_Complexion_Toning_Soap_-_200gm_detaqd.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Smooth As Silk Extra Cool Complexion Toning Soap -200gm.'
      },
      {
        name: 'Silka Whitening Herbal Soap Papaya Soap with Vitamin E Orange 135g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337252/Silka_Whitening_Herbal_Soap_Papaya_Soap_with_Vitamin_E_Orange_135g_aexcab.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Silka Whitening Herbal Soap Papaya Soap with Vitamin E Orange 135g.'
      },
      {
        name: 'Purec Egyptian Secret Gold Soap 160g',
        price: '3,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337237/Purec_Egyptian_Secret_Gold_Soap_160g_zvi4ow.webp',
        whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Purec Egyptian Secret Gold Soap 160g.'
      },
      {
        name: 'Nano Extra White Soap',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337224/Nano_Extra_White_Nano_Extra_White_Soap_iv3f02.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Nano Extra White Nano Extra White Soap.'
      },
      {
        name: "lumine super whitening soap",
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337215/lumine_super_whitening_soap_varhks.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the lumine super whitening soap.'
      },
      {
        name: 'lilies kids teens milk soap',
        price: '3,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337194/lilies_kids_teens_milk_soap_v39rqa.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the lilies kids teens milk soap.'
      },
      {
        name: 'Lee Tamarind  Kojic Soap',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337184/Lee-Tamarind-Lamongrass-Kojic-Soap-LS04_b8obbk.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lee Tamarind Lamongrass Kojic Soap.'
      },
      {
        name: 'Jam Extra Carrot Gluta CollagenSoap',
        price: '2,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337166/Jam_Extra_Jam_Carrot_Gluta_Collagen_Soap_-_12_Pieces_zkywdi.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Jam Extra Carrot Gluta CollagenSoap.'
      },
      {
        name: 'Jam Extra RICE MILK Soap',
        price: '2,000',
        image: 'https://www.beautyre.com/wp-content/uploads/2021/06/JAM-Rice-Milk-Soap-with-Gluta-and-Collagen.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Jam Extra Carrot Gluta CollagenSoap.'
      },
      
      {
        name: "Jam Acne Herbal soap For Acne Dark Spots Blemish Control",
        price: '2,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337126/Jam_Acne_Herbal_Soap_For_Acne_Dark_Spots_Blemish_Control._Soap_yhww0l.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Jam Acne Herbal soap For Acne Dark Spots Blemish Control.'
      },
      {
        name: 'Idole Papaya Whitening Facial Soap 200g',
        price: '1,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337114/Idole-Papaya-Whitening-Facial-Soap-200g_toto0p.png',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Idole Papaya Whitening Facial Soap 200g.'
      },
      {
        name: 'Idole Lightening Exfoliating Bar Soap With Avocado Powder -200g',
        price: '1,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337094/Idole_Lightening_Exfoliating_Bar_Soap_With_Avocado_Powder-200g_Buy_product_at_Skinol_Cosmetics_website-_https-_skinol.com.ng_product_idole-lightening-exfoliating-bar-soap-with-avocado-powder-200g_u3e8p9.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Idole Lightening Exfoliating Bar Soap With Avocado Powder -200g.'
      },
      {
        name: 'HalfCast VITAMIN-C SOAP',
        price: '4,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337086/HALFCAST-VITAMIN-C-SOAP_oppht3.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the HalfCast VITAMIN-C SOAP.'
      },
      {
        name: 'HalfCast Privilege Age defying',
        price: '4,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337071/HalfCast_Privilege_Age-defying_Bar_Soap_po0h5j.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the HalfCast Privilege Age defying.'
      },
      {
        name: 'Glutathione Injection Strong Whitening Soap -200g',
        price: '5,000',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn4MpWovgPuYQ9hwu2D2hYHRmsdIll_n6KwA&s',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Glutathione Injection Strong Whitening Soap -200g.'
      },
      {
        name: 'Avenomade skin lightening black soap',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732336996/Avenomade_skin_lightening_black_soap_cpumuf.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Avenomade skin lightening black soap'
      },
      {
        name: 'Baby Secret Baby Hand Made Bar Soap -80g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337001/Baby-Secret-Baby-Hand-Made-Bar-Soap-80g-880_rs8aqs.png',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Baby Secret Baby Hand Made Bar Soap -80g'
      },
      {
        name: 'Bavaria International Whitening Herbal Soap',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337010/Bavaria_International_Whitening_Herbal_Soap_nmu6td.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Glutathione Active Soap 170g.'
      },
      {
        name: 'Drip Carrot Brightening Soap ',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337014/Drip_Carrot_brightening_soap_hlvbee.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Drip Carrot Brightening Soap.'
      },
      {
        name: 'Veet Gold Kid And Teen Lightning Soap 150g ',
        price: '3,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483890/Veet_Gold_3_in_1_Kid_And_Teen_Lightning_Soap_150g_etghmy.png',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Veet Gold Kid And Teen Lightning Soap 150g.'
      },
      {
        name: 'USA BeautyCare Face Out For Black Spot ',
        price: '2,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483881/USA_Beauty_Care_Face_Out_For_Black_Spot_sgra4a.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the USA BeautyCare Face Out For Black Spot.'
      },
      
      {
        name: 'Sebamed Clear Face Teenage Cleansing Bar -100g ',
        price: '6,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483865/Sebamed_Clear_Face_Teenage_Cleansing_Bar_100g_eysusn.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Sebamed Clear Face Teenage Cleansing Bar -100g.'
      },
      {
        name: 'Retin-A Remove Acne Whitening 24K Soap -100g',
        price: '3,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483855/Retin-A_Remove_Acne_Whitening_24K_Soap_100g_aizkkq.png',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Retin A Remove Acne Whitening 24K Soap -100g.'
      },
      {
        name: 'RDL Bleaching Soap With Skin Moisturizer -135g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483849/RDL_Bleaching_Soap_With_Skin_Moisturizer_-135g_wt5949.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the RDL Bleaching Soap With Skin Moisturizer -135g.'
      },
      {
        name: "Palmer's Skin Success Anti-Dark Spot Complexion Bar -140g",
        price: '4,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483843/Palmer_s_Skin_Success_Anti-Dark_Spot_Complexion_Bar_140_g_tiqorl.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Palmer\'s Skin Success Anti-Dark Spot Complexion Bar -140g.'
      },
      {
        name: 'Mega White Rapid Action Clarifying Soap 190g',
        price: '1,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483835/Mega_White_Rapid_Action_Clarifying_Soap_190g_msxyzt.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Mega White Rapid Action Clarifying Soap 190g.'
      },
      {
        name: 'Kojic White Gluta Papaya Arbutin 7 Days Whitening Soap ',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483822/Kojic_White_Gluta_Papaya_Arbutin_7_Days_Whitening_Soap_aowihm.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Kojic White Gluta Papaya Arbutin 7 Days Whitening Soap.'
      },
      {
        name: 'U.S.A Papaya Soap 120g Black spot',
        price: '2,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483803/K.Brothers_U.S.A_Papaya_Soap_120g_Black_spot_ezj4lf.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the K.Brothers U.S.A Papaya Soap 120g Black spot.'
      },
      {
        name: 'Johnsons Blossoms Baby Soap',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483792/JohnsonsBlossomsBabySoap_xv3a1b.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Johnsons Blossoms Baby Soap.'
      },
      {
        name: 'Jam Goat Milk Collagen Soap',
        price: '2,000',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483785/JamGoatMilkCollagenSoap_qosri6.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Jam Goat Milk Collagen Soap.'
      },
      {
        name: 'FAIR WHITE PARIS GOLD ULTIMATE',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483776/FAIR_WHITE_PARIS_GOLD_ULTIMATE_1_idyevi.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the FAIR WHITE PARIS GOLD ULTIMATE.'
      },
      {
        name: 'Asantee Carrot Papaya & Honey Soap -125g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483770/Asantee_Carrot_Pawaw_Soap_125g_3PCS_veultj.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Asantee Carrot Papaya & Honey Soap -125g.'
      },
      {
        name: 'Asantee Carrot Honey Soap 125g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732483753/Asantee_Carrot_Honey_Soap_125g_3PCS_rtjvtf.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Asantee Carrot Honey Soap 125g.'
      },
      {
        name: 'Eclaircissant Larissa Savon Carotte 225g',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337021/Eclaircissant_Larissa_Savon_Carotte_225g_sypw3q.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the FAIR WHITE PARIS GOLD ULTIMATE.'
      },

      {
        name: 'Fair And White Paris Fair White Exfoliating Soap ',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337036/Fair_And_White_Paris_Fair_White_So_White_Exfoliating_Soap_qhxe1a.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Fair And White Paris Fair White Exfoliating Soap'
      },
      {
        name: 'Glutathione Injection Strong Whitening Soap ',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337063/Glutathione_Injection_Strong_Whitening_Soap_-200g_pdgzpr.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Asantee Carrot Honey Soap 125g.'
      },
      {
        name: 'GLUTA-C INTENSE WHITENING GLUTATHIONE PAPAYA SOAP',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337056/GLUTA_C_INTENSE_WHITENING_GLUTATHIONE_PAPAYA_SOAP_rvej4f.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the GLUTA-C INTENSE WHITENING GLUTATHIONE PAPAYA SOAP '
      },
      {
        name: 'Glow Half Cast Extra Fairness Soap',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337046/glow-half-cast-extra-fairnes-soap_qdwzno.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Asantee Carrot Honey Soap 125g.'
      },
      {
        name: 'Glutathione Injection Strong Whitening Soap ',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337063/Glutathione_Injection_Strong_Whitening_Soap_-200g_pdgzpr.webp',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Asantee Carrot Honey Soap 125g.'
      },
      {
        name: 'Debbitone Soap ',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1733740932/debbitone_yu1io7.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Debbitone_yu1io7'
      },
      {
        name: 'GLUTATHIONE INJECTION Gluta Kojic White Molato Cream Soap Terminal White Soap',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1733740914/GLUTATHIONE_INJECTION_Gluta_Kojic_White_Molato_Cream_Soap_Terminal_White_Soap_qros2o.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the GLUTATHIONE INJECTION Gluta Kojic White Molato Cream Soap Terminal White Soap'
      },
      {
        name: 'Cottage Fresh Ghana Soap',
        price: '2,500',
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1733740926/Cottage_Fresh_Ghana_dkvuzc.jpg',
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Cottage Fresh Ghana'
      },
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
