<template>
  <div class="flex flex-col justify-center items-start px-4 py-10  md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Face Wash Products & Prices</h2>


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
      searchQuery:'',
      // Array of 20 demo products
      products: [
        {
          name: 'YC Lemon Face Wash 500x500',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282671/YC-Lemon-Face-Wash-500x500_uzrxvr.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'YC Whitening Gold Caviar Face Wash',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282654/YC_Whitening_Gold_Caviar_Face_Wash_zbofuf.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'VEET GOLD WHITENING EXPERT FACE WASH FOAM',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282641/VEETGOLD_WHITENING_EXPERT_FACE_WASH_FOAM_cpqydk.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Veet gold turmeric face wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282624/Veetgold_turmeric_face_wash_cz4ogc.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Veet Gold Whitening Expert-Face Wash Foam With Tea Tree Green Tea-200g',
          price: '1,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282612/Veet_Gold_Whitening_Expert_-_Face_Wash_Foam_With_Tea_Tree_Green_Tea_-_200g_xaumhh.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'VEET GOLD Amino Acid And Glycolic Acid Shower Bath And Face Wash',
          price: '4,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282604/VEET_GOLD_Amino_Acid_And_Glycolic_Acid_Shower_Bath_And_Face_Wash_zyojrq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'tee tree daily use',
          price: '1,800',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282597/tee_tree_daily_use_zgvfma.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Skin Therapy Cleansing Oil Face',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282585/Skin_Therapy_Cleansing_Oil_Face_jorp7y.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'disaar vitamin c whitening facial wash',
          price: '600',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282574/disaar_vitamin_c_whitening_fscial_wash_peqd18.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'AILKE Rose Facial Cleanser',
          price: '2,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282566/AILKE_Rose_Facial_Cleanser_od4sge.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'ACNE CONTROL Glow Face Wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282559/ACNECONTROLGlowFaceWash.jpg_y3ehq0.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Veet Gold Whitening Expert Face Wash Foam With Rice Milk-200g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732282549/Product_image_thumbnail.Product_image_thumbnail.Product_image_thumbnail._Veet_Gold_Whitening_Expert_Face_Wash_Foam_With_Rice_Milk_200g_nmpgzm.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
      ]
    };
  },
  computed:{
    filterProducts(){
      return this.products.filter(product =>{
        return product.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      } )
    }
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
