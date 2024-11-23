<template>
  <div class="flex flex-col justify-center items-start px-4 py-10  md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Body Oil Products & Prices</h2>

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
      searchQuery:'',
      products: [
        {
            name: 'Veet Gold Turmeric Oil 1000ml',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338979/VeetGoldTurmericOil1000ml_w0mhkc.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'VEETGOLD SKIN REPAIR 3 IN 1 BODY TREATMENT OIL 150ML',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338971/VEETGOLD_SKIN_REPAIR_3_IN_1_BODY_TREATMENT_OIL_150ML_kngzjf.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Vaseline Vitamin B3 Body Oil 200ml',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338960/Vaseline_Vitamin_B3_Body_Oil_200ml_br1c5c.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: "Tara vet Brightening glow oil",
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338932/Tara_vet_Brightening_glow_oil_ob0pol.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Sof 7 Super Whitening And Glowing Oil With Turmeric And Honey',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338911/Soft_7_Super_Whitening_And_Glowing_Oil_With_Turmeric_And_Honey_ftzvv9.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Skin Therapy Oil',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338897/SkinTherapyOil_tpjzv8.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Neutrogena Body Oil Light Sesame Formula For Dry Skin',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338871/Neutrogena_Body_Oil_Light_Sesame_Formula_For_Dry_Skin_uwaoyt.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Morrocan Argan Essential Oils 24k Gold Primer Skin Oil',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338865/Morrocan_Argan_Essential_Oils_6_In_1_24k_Gold_Primer_Skin_Oil_Spf_45_300ml_ymdqdz.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'HalfCast Privilege Age defying',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337071/HalfCast_Privilege_Age-defying_Bar_Soap_po0h5j.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Moroccan Argan Essential',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338857/MoroccanArganEssential_klwhpq.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'GLUTA-C INTENSE WHITENING GLUTATHIONE PAPAYA SOAP',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732337056/GLUTA_C_INTENSE_WHITENING_GLUTATHIONE_PAPAYA_SOAP_rvej4f.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Moroccan Argan Oil-Vitamin C Glowing Oil',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338844/Moroccan_Argan_Oil_-_Vitamin_C_Glowing_Oil_pxwk8a.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Disaar Natural Vitamin C Whitening And Moisturizing Oil',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338836/DisaarNaturalVitaminCWhiteningAndMoisturizingOil_gzy0g1.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Beauty IQ Beauty Carrot Oil 200ml',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338829/Beauty_IQ_Beauty_Carrot_Oil_200ml_uytpdf.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Aveeno Daily Moisturizing Oil Mist',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338820/Aveeno_Daily_Moisturizing_Oil_Mist_m2umce.jpg',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
          {
            name: 'Veet Gold Extra Whitening Corrector Glowing Dark Spot Treatment Oil for Face Body',
            price: '2,500',
            image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732338814/Veet_Gold_Extra_Whitening_Corrector_Glowing_Dark_Spot_Treatment_Oil_for_Face_Body_y7smtw.webp',
            whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
          },
      ],
    };
  },
  computed:{
    filterProducts(){
      return this.products.filter(product =>{
        return product.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      })
    }
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
