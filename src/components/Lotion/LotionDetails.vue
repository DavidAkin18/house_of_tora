<template>
  <div class="flex flex-col justify-center items-start px-4 py-10 pt-20 md:pt-28 md:px-16">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Lotion Products & Prices</h2>

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
      searchQuery: '',
      products: [
      { 
        name: 'X7 CARROT SKIN WHITENING BODY LOTION', 
        price: '5,500', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732120013/X7_Carrot_Skin_Whitening_Body_Lotion_vhkdgx.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the X7 CARROT SKIN WHITENING BODY LOTION product.'
    },
    { 
        name: 'WHITE THERAPY', 
        price: '18,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119984/whiteTherapy_m4esqk.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the WHITE THERAPY product.'
    },
    { 
        name: 'MEDIX VITAMIN C', 
        price: '24,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119936/Vitamin-C-Turmeric-1-1_p8mham.jpg', 
        whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying the MEDIX VITAMIN C product.'
    },
    { 
        name: 'VEET GOLD TEEN BODY LOTION', 
        price: '7,500', 
        image:'https://res.cloudinary.com/def9quyti/image/upload/v1732119923/veetgoldteen_pjhnhl.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the VEET GOLD TEEN BODY LOTION product.'
    },
    { 
        name: 'VEET GOLD KID MILK HONEY LOTION', 
        price: '7,500', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119913/veetgold-kids-milk-honey-body-lotion_erhk7g.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the VEET GOLD KID MILK HONEY LOTION product.'
    },
    { 
        name: 'VASELINE SUPERFOOD FRESHLOCK', 
        price: '21,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119879/vasiline_b4p4lj.png', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the VASELINE SUPERFOOD FRESHLOCK product.'
    },
    { 
        name: 'VASELINE LARGE', 
        price: '16,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119848/VASELINE-UV-BRGT-large_hg3kce.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the VASELINE LARGE product.'
    },
    { 
        name: 'VASELINE MEDIUM', 
        price: '12,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119848/VASELINE-UV-BRGT-large_hg3kce.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the VASELINE MEDIUM product.'
    },
    { 
        name: 'ULTREX-50 EXPERT WHITE', 
        price: '600', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119833/ultrex-expert_el225e.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the ULTREX-50 EXPERT WHITE product.'
    },
    { 
        name: 'ULTIMATE ALIYA BODY LOTION', 
        price: '2,200', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119822/ultimateAliya_xyjgyi.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the ULTIMATE ALIYA BODY LOTION product.'
    },
    { 
        name: "TERA IRENE'S LAIT INJECTION", 
        price: '2,500', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119812/teranIrene_cxlopc.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the TERA IRENE\'S LAIT INJECTION product.'
    },
    { 
        name: "PALMER'S COCOA BUTTER FORMULA", 
        price: '700', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119800/stretchMarks_seuyhq.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the PALMER\'S COCOA BUTTER FORMULA product.'
    },
    { 
        name: 'ST.IVES SOFTENING COCONUT & ORCHID BODY LOTION', 
        price: '1,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119791/stlies_feg6be.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the ST.IVES SOFTENING COCONUT & ORCHID BODY LOTION product.'
    },
    { 
        name: 'SKINDOCTOR PARIS', 
        price: '9,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119776/skindoctor_f5x52f.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the SKINDOCTOR PARIS product.'
    },
    { 
        name: 'SKIN BY ZARON FOR MEN', 
        price: '16,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119761/skinbyzaron_swtjof.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the SKIN BY ZARON FOR MEN product.'
    },
    { 
        name: 'SKIN BY ZARON VITAMIN C', 
        price: '18,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119750/skinbyzaraMoisturizing_uhj01s.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying the SKIN BY ZARON VITAMIN C product.'
    },
    { 
      name: 'Skin Rehab fairness skin', 
      price: '7,000', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119721/skin-rehab_muvgfu.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Skin Rehab fairness skin.' 
    },

    { 
      name: 'Skin Rehab 3x mega blast', 
      price: '2,000', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119688/Skin-Rehab-Mega-Blast-Lotion_o305yb.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Skin Rehab 3x mega blast.' 
    },

    { 
      name: 'Pure glutathion injection', 
      price: '3,200', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119619/pureGlutathioninjection_qiluvw.jpg',      
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pure glutathion injection.' 
    },

    { 
      name: 'Purec Egyptian Secret', 
      price: '4,500', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119590/purecEgyptianSecret_fvaufd.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Purec Egyptian Secret.' 
    },

    { 
      name: 'Pure carrot white', 
      price: '2,000', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119565/purecarrotwhite_vesgeh.jpg',  
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pure carrot white.' 
    },

    { 
      name: 'Purec Egyptian Magic Whitening Gold Lotion', 
      price: '1,500', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119530/Purec-Egyptian-Magic-Whitening-Gold-Lotion-300ml_dautgu.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Purec Egyptian Magic Whitening Gold Lotion.' 
    },

    { 
      name: 'EOS shea butter', 
      price: '3,000', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119674/sheaBetterEos_ugtndj.jpg', 
      whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying EOS shea butter.' 
    },

    { 
      name: 'RDL papaya', 
      price: '2,500', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119655/RDL-papaya_700x700_e5prc3.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying RDL papaya.' 
    },

    { 
      name: 'Queen helene', 
      price: '1,200', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119646/queen-helene-body-lotion-extra-whitening-lotion-with-carrot-extract-260ml-1722834550813_zy8xap.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Queen helene.' 
    },

    { 
      name: 'Pure white super', 
      price: '4,000', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119519/pure_white_super_dv6qbd.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pure white super.' 
    },

    { 
      name: 'Filipino injection', 
      price: '1,800', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119504/philino_bmnvs6.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Filipino injection.' 
    },

    { 
      name: 'Pr.Francoise Bedon Royal lightening lotion', 
      price: '1,000', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119485/paris_tkfypv.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Pr.Francoise Bedon Royal lightening lotion.' 
    },

    { 
      name: 'QEI+ paris privilege lait corporal', 
      price: '600', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119471/package-range-complete-privilege_fxtsiw.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying QEI+ paris privilege lait corporal.' 
    },

    { 
      name: "O'tentika completion milk maxitone", 
      price: '2,200', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119445/otentika_xurpya.jpg', 
      whatsappLink: "https://wa.me/9092627921?text=Hello, I am interested in buying O'tentika completion milk maxitone." 
    },

    { 
      name: 'Olay vitamin C', 
      price: '2,500', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119431/olayvitcbodylotion_wpw1bt.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Olay vitamin C.' 
    },

    { 
      name: 'Olay Regenerist', 
      price: '700', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119419/olayregenerist_pfng2x.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Olay Regenerist.' 
    },

    { 
      name: 'Olay Retinol 24', 
      price: '1,000', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119414/OLAY-RETINOL-CREAM_bcokod.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Olay Retinol 24.' 
    },

    { 
      name: 'Nui skin', 
      price: '1,500', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119382/nui_skin_nn9sxq.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nui skin.' 
    },

    { 
      name: 'Nivea radiant beauty medium', 
      price: '1,700', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119357/niveaMedium_tvgd9z.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nivea radiant beauty medium.' 
    },

    { 
      name: 'Nivea extra white cooling lotus', 
      price: '2,800', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119345/niveacoolinglotus_extfiz.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Nivea extra white cooling lotus.' 
    },

    { 
      name: 'New white x-white', 
      price: '2,600', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119316/new-white-x-imoayi-569x569_ah31ev.png', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying New white x-white.' 
      },

    { 
      name: 'Mega White', 
      price: '2,000', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119302/megaWhite_cwf9y3.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Mega White.' 
    },

    { 
      name: 'paris Fair and White', 
      price: '3,200', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119284/maxiToneParis_czxedb.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying paris Fair and White.' 
    },

    { 
      name: 'Make me white fade milk', 
      price: '4,500', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119271/makeMeWhite_zkmq8i.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Make me white fade milk.' 
    },

    { 
      name: 'Luxury Glow lotion', 
      price: '2,000', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119262/luxuryGlow_oghiou.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Luxury Glow lotion.' 
    },

    { 
      name: 'Lumine Carrot face and body lotion', 
      price: '1,500', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119250/lumineCarrot_fipd2z.jpg', 
      whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying Lumine Carrot face and body lotion.' 
    },

    { 
      name: 'Luminaire Night Lotion', 
      price: '3,000', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119242/Luminaire_NightLotion2_mldzf2.jpg', 
      whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying Luminaire Night Lotion.' 
    },
    { 
      name: "LAIT U PHASE D'INITIALISATION", 
      price: '2,500', 
      image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119224/laitVip_mh6qv8.png', 
      whatsappLink: "https://wa.me/9092627921?text=Hello, I am interested in buying LAIT U PHASE D'INITIALISATION." 
    }, 
   
      { 
        name: 'LAIT TEINT DIAMANT GLUTATHION COMPRIME WHITENING', 
        price: '4,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119200/laitTeintDiamant_a8plre.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying LAIT TEINT DIAMANT GLUTATHION COMPRIME WHITENING.' 
      }, 
      { 
        name: 'LAIT SNAPCHAT', 
        price: '1,800', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119189/laitSnappchat_sb0ltv.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying LAIT SNAPCHAT.' 
      }, 
      { 
        name: 'LAIT ANEEZA', 
        price: '1,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119172/laitAneeza_jtd8fr.png', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying LAIT ANEEZA.' 
      }, 
      { 
        name: 'KOJIC HALFCAST', 
        price: '600', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119157/kojicHalfcast_czmfix.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying KOJIC HALFCAST.' 
      }, 
      { 
        name: 'KOJIC ACID BODY LOTION', 
        price: '2,200', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119144/kojic_lotion_juvxfp.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying KOJIC ACID BODY LOTION.' 
      }, 
      { 
        name: 'JERGENS OIL INFUSED SKIN FIRMING', 
        price: '2,500', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119126/JER_Oil-Infused-Skin-Firming_m4k5qi.png', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying JERGENS OIL INFUSED SKIN FIRMING.' 
      }, 
      { 
        name: 'HYDRO BOOST BODY GEL CREAM', 
        price: '700', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119113/hydro_boost_body_gel_cream_1-min_yywawb.jpg', 
        whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying HYDRO BOOST BODY GEL CREAM.' 
      }, 
      { 
        name: 'HEALTHY GLOW PRO LIGHTENING MILK', 
        price: '1,000', 
        image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119100/Healthy_Glow_Pro_Lightening_Milk_txs665.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying HEALTHY GLOW PRO LIGHTENING MILK.' 
        }, 
        { 
          name: 'HB56+', 
          price: '1,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119090/hb56_okly5j.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying HB56+.' 
        }, 
        { 
          name: 'HALF CAST VITAMIN C', 
          price: '1,700', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119078/halfcaste_qgdqra.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying HALF CAST VITAMIN C.' 
        }, 
        { 
          name: 'HALF CAST CAROTTE LIGHTENING', 
          price: '2,800', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119062/halfCastCarotteDemiCaste_vqwx7d.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying HALF CAST CAROTTE LIGHTENING.' 
        }, 
        { 
          name: 'HALF CAST VITAMIN C LOTION', 
          price: '2,600', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119050/half-cast-vitamin-c-lotion_jxjn2p.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying HALF CAST VITAMIN C LOTION.' 
        }, 
        { 
          name: 'HALF CAST PRIVILEGE LOTION', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119036/half-cast-privilege-lotion_rzxopp.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying HALF CAST PRIVILEGE LOTION.' 
        }, 
        { 
          name: 'GOLDEN FACE LOTION', 
          price: '3,200', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119021/goldenFace_golxgn.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying GOLDEN FACE LOTION.' 
        }, 
        { 
          name: 'GOLD BEAUTY LOTION', 
          price: '4,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732119007/goldBeautyLotion_gem0nx.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying GOLD BEAUTY LOTION.' 
        }, 
        { 
          name: 'GLUTATHIONE VITAMIN C FOR FACE AND BODY', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118985/glutathione_xmmhaj.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying GLUTATHIONE VITAMIN C FOR FACE AND BODY.' 
        }, 
        { 
          name: 'GLUTA BLACK 5XXXXX!+', 
          price: '1,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118963/glutaBlack_lfisbs.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying GLUTA BLACK 5XXXXX!+.' 
        }, 
        { 
          name: 'GLUTA C LOTION', 
          price: '3,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118948/gluta-c_rfukkh.jpg', 
          whatsappLink: 'https://wa.me/2348012345678?text=Hello, I am interested in buying GLUTA C LOTION.' 
        }, 
        { 
          name: 'GLOW HALF CAST EXTRA FAIRNESS', 
          price: '1,200', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118938/glow-half-cast-extra-fairness_ao24tr.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying GLOW HALF CAST EXTRA FAIRNESS.' 
        }, 
        { 
          name: 'GLAM BEAUTY TEINT WHITE', 
          price: '4,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118928/glamBeautyTeintWhite_w7c55x.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying GLAM BEAUTY TEINT WHITE.' 
        }, 
        { 
          name: 'GARNIER SAKURA GLOW', 
          price: '1,800', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118921/Garnier-Sakura-glow-_vlucyg.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying GARNIER SAKURA GLOW.' 
        }, 
        { 
          name: 'FINAL MAXITONE', 
          price: '1,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118920/finalMaxitone_cq9j5o.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying FINAL MAXITONE.' 
        }, 
        { 
          name: 'FASTER WHITE PARIS', 
          price: '600', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118902/fasterWhiteParis_lscia8.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying FASTER WHITE PARIS.' 
        }, 
        { 
          name: 'FAIRNESS SKIN GOLD WHITE MILK', 
          price: '2,200', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118892/fairness_skin_gold_white_milk_uktho4.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying FAIRNESS SKIN GOLD WHITE MILK.' 
        }, 
        { 
          name: 'SKIN SUCCESS FADE MILK', 
          price: '2,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118882/fadeMilk_bf812t.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying SKIN SUCCESS FADE MILK.' 
        }, 
        { 
          name: 'FACE FACTS BODY LOTION', 
          price: '700', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118872/faceFacts_b1jfyk.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying FACE FACTS BODY LOTION.' 
        }, 
        { 
          name: 'EXCEPTIONAL TONING BEAUTIFYING', 
          price: '1,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118857/exceptionalToningBeautifying_jnvghx.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying EXCEPTIONAL TONING BEAUTIFYING.' 
        }, 
        {
          name: 'ELASTALIFT ADVANCED BRIGHTENING VITAMIN C', 
          price: '1,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118842/elastaliftVitaminC_mtd8nd.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying ELASTALIFT ADVANCED BRIGHTENING VITAMIN C.' 
        }, 
        { 
          name: 'EASY GLOW', 
          price: '1,700', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118835/easyGlow_ggjrqo.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying EASY GLOW.' 
        }, 
        { 
          name: "DR TEAL'S", 
          price: '2,800', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118825/drTeals_butjrg.jpg', 
          whatsappLink: "https://wa.me/9092627921?text=Hello, I am interested in buying DR TEAL'S." 
        }, 
        { 
          name: 'DOVE', 
          price: '2,600', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118816/dove_lwgehw.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying DOVE.' 
        }, 
        { 
          name: 'DAL AMANDA', 
          price: '2,000', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118801/dalAmanda_nytuxf.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying DAL AMANDA.' 
        }, 
        { 
          name: 'CRYSTAL WHITE', 
          price: '3,200', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118788/crystalWhite_amam6n.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying CRYSTAL WHITE.' 
        }, 
        { 
          name: 'CLEARISM WHITE EGG YOLK TONING FADE LOTION ORIGINAL', 
          price: '4,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118774/CLEARISM-WHITE-EGG-YOLK-TONING-FADE-LOTION-ORIGINAL_tec0pi.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying CLEARISM WHITE EGG YOLK TONING FADE LOTION ORIGINAL.' 
        }, 
        { 
          name: 'CLEAR NATURE ORIGINAL NATURAL FAIRNESS BODY LOTION', 
          price: '4,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118746/clear_nature_mavriu.png', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying CLEAR NATURE ORIGINAL NATURAL FAIRNESS BODY LOTION.' 
        }, 
        { 
          name: 'CELEBRITY HALF CAST', 
          price: '4,500', 
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118721/celebrityhalfcast_keu6fr.jpg', 
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying CELEBRITY HALF CAST.' 
        },
        { 
          name: 'CAVIAR GOLD SUPER WHITENING FACE & BODY',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118711/caviargold_ynekwq.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying CAVIAR GOLD SUPER WHITENING FACE & BODY.'
        },

        { 
          name: 'BOOTS BABY MOISTURISING LOTION',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118700/bootsbaby_epql5d.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying BOOTS BABY MOISTURISING LOTION.'
        },

        { 
          name: 'BLACK OPAL BODY RENEWAL LOTION',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118692/Black_Opal_Body_Renewal_Lotion_1600x_s9ro64.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying BLACK OPAL BODY RENEWAL LOTION.'
        },

        { 
          name: 'BABY SECRET AMINO ACIDS MEDIUM',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118681/babysecretAmino_qmukg1.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying BABY SECRET AMINO ACIDS MEDIUM.'
        },

        { 
          name: 'BABY SECRET AMINO ACIDS LARGE',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118667/babysecret_bpczdj.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying BABY SECRET AMINO ACIDS LARGE.'
        },

        { 
          name: 'AMLACTIN DAILY MOISTURISING BODY LOTION SMALL',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118648/amlactinBig_aldlsa.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying AMLACTIN DAILY MOISTURISING BODY LOTION SMALL.'
        },

        { 
          name: 'AMLACTIN DAILY MOISTURISING BODY LOTION LARGE',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118648/amlactinBig_aldlsa.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying AMLACTIN DAILY MOISTURISING BODY LOTION LARGE.'
        },

        { 
          name: 'LILIES KIDS & TEEN BODY MILK',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118625/americanFormulaKids_rxyecl.png',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying LILIES KIDS & TEEN BODY MILK.'
        },

        { 
          name: 'ADVANCED CLINICALS VITAMIN C',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118616/advancedClinicalsVitaminC_tggrbx.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying ADVANCED CLINICALS VITAMIN C.'
        },

        { 
          name: 'ACTIVE CAVIAR DRIP',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118606/activeECaviarDrip_umgtmj.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying ACTIVE CAVIAR DRIP.'
        },

        { 
          name: 'ABEBI WHITE GLUTATHIONE LOTION',
          price: '4,500',
          image: 'https://res.cloudinary.com/def9quyti/image/upload/v1732118596/abebi_qg1phf.jpg',
          whatsappLink: 'https://wa.me/9092627921?text=Hello, I am interested in buying ABEBI WHITE GLUTATHIONE LOTION.'
        }
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
.fas {
  font-size: 1.5rem;
}
</style>
