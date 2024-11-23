<template>
  <div class="flex flex-col justify-center items-start  px-4 py-10  md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Shower Bath Products & Prices</h2>

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
          name: 'white therapy gel douche maxi-blanchissert gommant',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297319/whitetherapy1_wdohta.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'white therapy gel douche extra eclaircissant',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297310/whitetherapy_atiaut.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'White Care Shower Cream 500x500',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297300/White_Care_Shower_Cream-500x500_ik5ofn.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'White Care Whitening Moisture Spa Shower Cream',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297283/White_Care_WhiteningMoistureSpaShowerCream_sxaxwu.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Veet gold Gluta white 10 whitening shower gel',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297260/Veetgold_Gluta_white_10_whitening_shower_gel_xzn50q.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'veet gold lemon facial cleanser toner 500x500',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297247/veet-gold-lemon-facial-cleanser-toner-500x500_sfbb3s.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Ultimate Aliya',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297105/UltimateAliya_eybchc.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Veet Gold Body Wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297236/Veet_Gold_Veetgold_Body_Wash_tryfdj.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: "Veet Gold Tomato Lycopene Extra Whitening Shower Bath White Glow SPF 30 1000ml",
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297222/Veet_Gold_Tomato_Lycopene_Extra_Whitening_Shower_Bath_White_Glow_SPF_30_1000ml_vtnasq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Sugar And Milk Body Magic Super Whitening',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297096/SugaAndMilkBodyMagicSuperWhitening_ks5gnp.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'veet gold teen multivitamin',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297208/veet_gold_teen_multivitamin_ctrqyr.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'strawberry And Peach Extra Whitening',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297089/strawberryAndPeachExtraWhitening_d3tkur.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: "st'Ives Bath",
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297083/St._Ives_Bath_j1g8sh.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Skin by Zaron Vitamin C Body Wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297062/Skin_by_Zaron_Vitamin_C_Body_Wash_ppq2dq.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'sepi White Body Corrector Body Glowing',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297051/sepiWhiteBodyCorrectorBodyGlowing_el8jtt.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Pr.Francoise Bedon Paris Carrot Caviar Whitening Shower Gel',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297041/Pr._FrancoiseBedonCarrot_CaviarWhiteningShowerGel_cqqynj.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Olay Vitamin C Body Wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297025/Olay_Vitamin_C_Body_Wash_b60zqq.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Nivea Love Adventure Aloe Fresh Scented Shower Gel 500ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297015/Nivea-Love-Adventure-Aloe-Fresh-Scented-Shower-Gel-ml_g1plyh.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Nivea Fresh Shower Gel Wild Berry Scent 500ml',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732297008/Nivea_Fresh_Shower_Gel_Wild_Berry_Scent_500ml_ev4tsl.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'nano White Niacinamide',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296960/nanoWhite_Niacinamide_chh2uf.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'medix 5.5 lactic acid',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296950/medix-lactic-acid_xvb19i.jpg',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Lilies Kids Teens Milk Wash 1600x',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296941/Lilies_Kids_Teens_Milk_Wash_1600x_kvik9v.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Idole',
          price: '2,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296927/idole_nzif9i.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'health Glow alpha arbutin and kojic acid',
          price: '35,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296914/healthGlow_xajczq.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'HalfCast Carotte Lightening Shower Gel ',
          price: '3,000',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296905/HalfCast_Carotte_Lightening_Shower_Gel_d0alqc.webp',
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Half Cast Vitamin C Pro Lightening Bath Gel',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296893/Half_Cast_Vitamin_C_Pro_Lightening_Bath_Gel_odndxy.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: "Golden glow intensive whitening and exfoliating shower gel and Golden Glow Intensive Half Cast Lightening Shower Bath 1000ml",
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296885/Golden_glow_intensive_whitening_and_exfoliating_shower_gel_and_Golden_Glow_Intensive_Half_Cast_Lightening_Shower_Bath_-_1000ml_lkslfa.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'gluthione Injection Shower Bath',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296879/gluthioneInjectionShowerBath_nx4quw.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Fruiser Double Moisturizing Shower Goat & Milk Bath And Pearl Powder',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296866/Fruiser_Double_Moisturizing_Shower_Goat_s_Milk_Bath_And_Pearl_Powder_j62xze.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Faster White Paris Snail Slime Exfoliating Luxury Shower Milk',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296856/Faster_White_Paris_Snail_Slime_Exfoliating_Luxury_Shower_Milk_x8vmfe.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Cosmeticary bruxelles Anua Heart leaf- 77-Soothing Toner',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732284542/Cosmeticary-bruxelles-Anua-Heartleaf-77_-Soothing-Toner_1024x1024_gkn4va.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Fair child yellow shower gel',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296847/Fair-child-yellow-shower-gel_hpfzkg.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Fair Child Natural Moisturizing Body Milk Wash 300x300',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296839/Fair-Child-Natural-Moisturizing-Body-Milk-Wash-300x300_hdo5z2.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Half Cast Extra Fairness',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296829/extraFairness_u8kzd9.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Easy Glow Shower Bath',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296823/easyGlow_lt8bpg.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Dr Teals',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296819/DrTeals_ioxmri.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },


        {
          name: 'Dove Reviving Body Wash 450ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296814/DoveRevivingBodyWash450mlnigeria_vfgqtu.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'boots baby Head to Toe wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296800/boots-head-to-toe_wash_mennkf.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'BELLA WHITE WHITENING BODY WASH VARIANCE',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296787/BELLA-WHITE-WHITENING-BODY-WASH-VARIANCE_i0btmz.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Baby Secret Amino Acids Baby Shower Gel-Liquid Bath 1000ml',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296777/Baby_Secret_Amino_Acids_Baby_Shower_Gel_-_Liquid_Bath_1000ml_pocncm.webp',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Amino Acid And Glycolic Acid ',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296768/aminoAcidAndGlycolicAcid_sbndmj.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the Lotion product.'
        },
        {
          name: 'Le Asian White Exfoliating Whitening Body wash',
          price: '2,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732296748/Le_Asian_White_Exfoliating_Whitening_Body_wash_haxdze.webp',
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
