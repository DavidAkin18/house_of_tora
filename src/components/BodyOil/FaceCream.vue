<template>
  <div class="flex flex-col justify-center items-start px-4 py-10  md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Face Cream Products & Prices</h2>

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
          name: 'White Extra Whitening Face Cream with Collagen',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343819/Xx-White_Extra_Whitening_Face_Cream_with_Collagen_wxcqud.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'White Light Baby Face Whitening Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343813/WhiteLightBabyFaceWhiteningCrem_yia7xg.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'white spot removing anti spot cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343804/white_spot_removing_anti_spot_cream_gno0vr.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: "Ultimate Aliya",
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343795/Ultimate_Aliya_gnoj9k.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'selfie face cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343788/selfie-face-cream_1_kglz2d.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Skin Balance Facial Whitening And Spot Removing Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343740/Skin_Balance_Facial_Whitening_And_Spot_Removing_Cream_odsefr.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Raffine White Rejuvenating Face Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343725/Raffine_White_Rejuvenating_Face_Cream_lzgojh.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Pure Carrot Face Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343712/PureCarrotFaceCream_y1u4xq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Pure Haven Face Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343702/Pure_Haven_Face_Cream_1600x_nuzwzy.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Pure Nomarks Xtra Beauty Gold Facial Cream 30g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343692/Pure_Nomarks_Xtra_Beauty_Gold_Facial_Cream_30g_do1hhd.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Nomarks Super Whitening Facial Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343685/Nomarks_Super_Whitening_Facial_Cream_ykt31x.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'No Stress Restorative Cream 35ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343668/No_Stress_Restorative_Cream_35ml_dpz5ia.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'nano whitening cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343659/nano-whitening-cream_rrgjsa.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Madam WHITE EXCLUSIVE WHITENING FACE CREAM',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343652/Madam_WHITE_EXCLUSIVE_WHITENING_FACE_CREAM_r4ubhs.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Lait Snapchat Facial Cream Blue Diamond Glutathione Vitamin C 50g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343644/Lait_Snapchat_Facial_Cream_Blue_Diamond_Glutathione_Vitamin_C_50g_kgyhus.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'K Whitening Hydrating Face Cream with Vitamin E SPF',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343630/K_Whitening_Hydrating_Face_Cream_with_Vitamin_E_SPF_wnwtou.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        

        {
          name: 'Golden face cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343625/golden_f6fvrz.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Florida Sunblock Face Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343616/Florida-Sunblock_nje9h8.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'flawless Face Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343606/flawlessFaceCream_dzcmdj.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'face facts wonder cream Instant Glow Revive',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343598/facefactswondercreamfragrancefree2_z0vjwj.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'EVER WHITE SUPER WHITENING FACE CREAM',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343592/EVER-WHITE-SUPER-WHITENING-FACE-CREAM_xpnjeu.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'DR.Rashel Skin Whitening Day Cream 50g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343586/Dr._Rashel_Skin_Whitening_Day_Cream_50_g_akc7pv.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Dr.Rashel Vitamin C Brightening and Anti Aging face cream 50g',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343580/Dr_Rashel_Vitamin_C_Brightening_and_Anti_Aging_face_cream_50g_fbmozd.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'DIAMOND COMPLEXION GLUTATHIONE SUPER LIGHTENING COMPRESSED CREAM',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343573/DIAMOND_COMPLEXION_GLUTATHIONE_SUPER_LIGHTENING_COMPRESSED_CREAM_pki2zh.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Clear face to face baby facial cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343568/Clear_face_to_face_baby_facial_cream_uh2l2u.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Ailke Boost Luster 24K Gold Collagen Revitalizing Whitening  Face Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732343563/Ailke_Boost_Luster_24K_Gold_Collagen_Revitalizing_Whitening_2_in_1_Face_Cream_Set_rmd1iz.webp',
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
