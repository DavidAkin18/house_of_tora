<template>
  <div class="flex flex-col justify-center items-start  px-4 py-10  md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Tablet Soap Products & Prices</h2>

    <div class="mb-8 relative w-full max-w-md">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search for a product..." 
        class="w-full p-3 pl-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B87F61] mb-4"
      />
      <!-- Search Button with Icon -->
      <button 
        @click="triggerSearch"
        class="absolute left-1 top-1/3 transform -translate-y-1/2 text-[#B87F61] cursor-pointer hover:text-[#B87F61]  focus:outline-none focus:ring-2 focus:ring-[#B87F61]">
        <i class="ri-search-line font-bold text-2xl"></i>
      </button>
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
          <a 
            :href="product.whatsappLink" 
            target="_blank" 
            class="text-md font-medium text-gray-800 cursor-pointer hover:underline"
          >
            ₦ {{ product.price }}
          </a>
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
      products: [
      {
          name: 'VEET GOLD Sugar Whitening Soap',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337294/VEET_GOLD_Sugar_Whitening_Soap_gqubng.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'VEET GOLD Skin Whitening And Toning Transparent Soap X3',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337288/VEET_GOLD_Skin_Whitening_And_Toning_Transparent_Soap_X3_tr2viu.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Super Brightening Soap with GLUTA injection extracts',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337282/Super_Brightening_Soap_with_GLUTA_injection_extracts_idqju6.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'SNAPCHAT SOAP BLUE DIAMOND 150g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337273/SNAPCHAT_SOAP_BLUE_DIAMOND_150g_wsdbpx.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Smooth As Silk Extra Cool Complexion Toning Soap -200gm',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337263/Smooth_As_Silk_Extra_Cool_Complexion_Toning_Soap_-_200gm_detaqd.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Silka Whitening Herbal Soap Papaya Soap with Vitamin E Orange 135g',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337252/Silka_Whitening_Herbal_Soap_Papaya_Soap_with_Vitamin_E_Orange_135g_aexcab.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Purec Egyptian Secret Gold Soap 160g',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337237/Purec_Egyptian_Secret_Gold_Soap_160g_zvi4ow.webp',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Nano Extra White Nano Extra White Soap',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337224/Nano_Extra_White_Nano_Extra_White_Soap_iv3f02.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: "lumine super whitening soap",
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337215/lumine_super_whitening_soap_varhks.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'lilies kids teens milk soap',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337194/lilies_kids_teens_milk_soap_v39rqa.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Lee Tamarind Lamongrass Kojic Soap',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337184/Lee-Tamarind-Lamongrass-Kojic-Soap-LS04_b8obbk.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Jam Extra Carrot Gluta CollagenSoap',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337166/Jam_Extra_Jam_Carrot_Gluta_Collagen_Soap_-_12_Pieces_zkywdi.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: "Jam Acne Herbal soap For Acne Dark Spots Blemish Control",
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337126/Jam_Acne_Herbal_Soap_For_Acne_Dark_Spots_Blemish_Control._Soap_yhww0l.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Idole Papaya Whitening Facial Soap 200g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337114/Idole-Papaya-Whitening-Facial-Soap-200g_toto0p.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Idole Lightening Exfoliating Bar Soap With Avocado Powder -200g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337094/Idole_Lightening_Exfoliating_Bar_Soap_With_Avocado_Powder-200g_Buy_product_at_Skinol_Cosmetics_website-_https-_skinol.com.ng_product_idole-lightening-exfoliating-bar-soap-with-avocado-powder-200g_u3e8p9.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'HalfCast VITAMIN-C SOAP',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337086/HALFCAST-VITAMIN-C-SOAP_oppht3.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Olay Vitamin C Body Wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297025/Olay_Vitamin_C_Body_Wash_b60zqq.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'HalfCast Privilege Age defying',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337071/HalfCast_Privilege_Age-defying_Bar_Soap_po0h5j.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Glutathione Injection Strong Whitening Soap -200g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337063/Glutathione_Injection_Strong_Whitening_Soap_-200g_pdgzpr.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'GLUTA-C INTENSE WHITENING GLUTATHIONE PAPAYA SOAP',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337056/GLUTA_C_INTENSE_WHITENING_GLUTATHIONE_PAPAYA_SOAP_rvej4f.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'glow half cast extra fairness soap',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337046/glow-half-cast-extra-fairnes-soap_qdwzno.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Fair And White Paris Fair White So White Exfoliating',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337036/Fair_And_White_Paris_Fair_White_So_White_Exfoliating_Soap_qhxe1a.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Extract Whitening Herbal Soap-Papaya Calamansi',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337028/Extract_Whitening_Herbal_Soap_-_Papaya_Calamansi_vlrsov.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Eclaircissant Larissa Savon Carotte 225g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337021/Eclaircissant_Larissa_Savon_Carotte_225g_sypw3q.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Drip Carrot brightening soap',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337014/Drip_Carrot_brightening_soap_hlvbee.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Bavaria International Whitening Herbal Soap',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337010/Bavaria_International_Whitening_Herbal_Soap_nmu6td.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Baby Secret Baby Hand Made Bar Soap -80g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337001/Baby-Secret-Baby-Hand-Made-Bar-Soap-80g-880_rs8aqs.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Avenomade skin lightening black soap',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732336996/Avenomade_skin_lightening_black_soap_cpumuf.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
      ],
    };
  },
  computed:{
    filterProducts(){
      return this.products.filter(product => {
        return product.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      })
    }
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
