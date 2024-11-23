<template>
  <div class="flex flex-col justify-center items-start px-4 py-10  md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Supplement Products & Prices</h2>

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
          name: 'Wins Town Weight Gainer',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152160/WinsTownWeightGainer_siygn4.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'white Filter Skin Beauty',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152145/whiteFilterSkinBeauty_wsrn4m.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'White Doll',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152135/WhiteDoll_vuecvl.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'White Babe Whitening And Energy Booster',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152118/WhiteBabeWhiteningAndEnergyBooster_prmpao.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'solgar evening primrose oil 500-mg 90 soft gel',
          price: '1,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152039/solgar-evening-primrose-oil-500-mg-90-softjel-kcm83847060-1-eb93517c2ea5453cbd39217c92e8c004_bsridk.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Vitamin C For Kids Gummies',
          price: '4,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152085/VitamincForKidsGummies_jkkkf5.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'vita-source natural b carotene capsule',
          price: '1,800',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152075/vita_source-natural-b-carotene-capsules_m2pnps.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'vit-c-1000',
          price: '10,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152068/vit-c-1000_imx20s.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Super Curry Weight Gain',
          price: '600',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152060/superCurrryWeightGain_htul5k.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'SOQ gluta and collagen',
          price: '2,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152051/SOQ-gluta-and-collagen_k4tq0b.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'skin whitening vitamins gummies',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152027/skin-whitening-vitamins-gummies_bvrssy.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'skandal White Blinks',
          price: '700',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152014/skandalWhiteBlinks_ehafbu.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Skandal Miracle Pure White Glutathione',
          price: '1,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732152004/Skandal-Miracle-Pure-White-Glutathione-300x300-1_vdaymg.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'satin skin white blanc',
          price: '1,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151994/satinskinzwhiteblanc_s8fndq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'pro collagen fruit pectin gummies',
          price: '1,700',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151985/pro-collagen-fruit-pectin-gummies_kmvzdn.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'PMS Relief Gummies',
          price: '2,800',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151974/PMS-Relief-Gummies_fcbr1l.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: ' pearl white pinky plus',
          price: '2,600',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151964/pinkyplus_lorxtv.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Phyto Collagen King Of Whitening',
          price: '40,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151952/Phyto-Collagen-King-Of-Whitening-Supplement-1000ml_lwxc1m.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'ONNY Collagen Capsules',
          price: '3,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151943/ONNY-Collagen-Capsules_rrslup.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'natures cure anti-aging renew',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151933/natures-cure-anti-aging-renew_uoivue.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'nature cure anti aging gummies',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151924/naturecure-anti-aging-gummies_lis5gt.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'nature cure whitening gummies strawberry flavour',
          price: '1,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151913/nature-cure-whitening-gummies-strawberry-flavour_g9u46r.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'ladies Shine',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151900/ladiesShine_vacvd0.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'ladies Collagen',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151889/ladiesCollagen_vnjxyb.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Kumiko Collagen Salmon',
          price: '1,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151877/KumikoCollagenSalmon_pppz5t.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'juliet Ava',
          price: '4,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151868/julietAva_tzrbhe.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'joju Collagen',
          price: '1,800',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151860/jojuCollagen_ydq7uo.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'herbal Hip Or Butt Enlargement',
          price: '1,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151853/herbalHipOrButtEnlargement_a9hdaz.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Gluta White Sparkle',
          price: '600',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151846/GlutaWhiteSparkle_hbzlpl.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'glutathione collagen glow',
          price: '2,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151832/glutathione-collagen-glow_ven0pg.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'gluta Collagen big size',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151818/glutaCollagen_qsu4xp.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'fevert hb hair skin nails Big size',
          price: '700',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151796/fevert-hb_hair-skin-nails-Big_fzat06.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'fevert hb hair skin nails small size',
          price: '1,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151787/fevert-hb_hair-skin-nails_small_uofoxe.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'dynewell',
          price: '1,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151774/dynewell_evuesp.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'ultra potency vitamin C gummies',
          price: '1,700',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151765/daynrr-vitamin-c-gummies_kgawax.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Magnesium with vitamin b6',
          price: '2,800',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151757/cc-plus-zinc_qcfo3o.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: ' Acorbic c-1000',
          price: '13,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151752/c-1000_ffkvzt.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'bluta Berry',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151744/blutaBerry_fjmclk.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'BBL Gummies',
          price: '3,200',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732151736/BBL-Gummies_ynypop.jpg',
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
  },
 
};
</script>

<style scoped>
/* Optional custom styles */
</style>
