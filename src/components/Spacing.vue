<template>
    <div class="bg-white min-h-16 overflow-hidden  px-4 md:px-16">
      <div class="scrolling-container">
        <div class="logo mx-4" v-for="brand in brands" :key="brand">
          <img :src="brand" alt="Brand Logo" class="h-12 mx-4" />
        </div>
        <div class="logo mx-4" v-for="brand in brands" :key="brand">
          <img :src="brand" alt="Brand Logo" class="h-12 mx-4" />
        </div>
      </div>
    </div>
</template>
  
<script>
export default {
  data() {
    return {
      brands: [
        'https://logos-world.net/wp-content/uploads/2020/09/Dove-Logo-2012-present.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Mm9BAQQhg0eRiLvgRlpwazEDaDIQLvBeNA&s',
        'https://w7.pngwing.com/pngs/360/479/png-transparent-veet-logo-cosmetics-hair-removal-brand-veet-blue-leaf-text.png',
        'https://m.media-amazon.com/images/S/aplus-media-library-service-media/6093b149-6f3f-4d12-9023-b8b1d3f417ed.__CR0,0,970,300_PT0_SX970_V1___.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt8_xLlT0Td5M8c7aSmdd5mI81raeHzFPS6Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8NnVBUnPDVDeMi7LyN6wW2mDNUK8NGZt4NQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjquM0Tu8rXNCsHdGmJKeCrmlAtr0TDkKKPA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiREgSU9NaKl9HrEiyo-IH-xPSeOd_Tb5_zA&s',
        'https://venerafragrances.com/image/cache//catalog/data/products/Lancome-Idole-Poster-2-600x600.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyA4aG0Fc1CiVfgsyNz4IUlIYBlddWhyBG6Q&s',
        'https://cdn.punchng.com/wp-content/uploads/2024/06/30012441/Dr-Teal.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmKTohCe0HsMkEdICqRG7qsB0hENn7sSVFqNfQ_s2O_ODft6_d0dZ67T7ab-NYmPI3xLQ&usqp=CAU',
        'https://onnybeauty.com/cdn/shop/files/Onny-Beauty@2x.png?height=100&v=1698080922',
        'https://l450v.alamy.com/450v/2g6kek7/yc-feminine-logo-beauty-monogram-and-elegant-logo-design-handwriting-logo-of-initial-signature-wedding-fashion-floral-and-botanical-with-creative-2g6kek7.jpg',
        'https://bolandlaura.sa/image/cache/catalog/brandslogo/Disaar%20Beauty-600x315h.png'
      ],
    };
  },
};
</script>

<style scoped>
/* Container styles */
.scrolling-container {
  display: flex;
  align-items: center;
  animation: scroll-left 15s linear infinite;
  width: max-content;
}

.logo img {
  display: block;
}

/* Keyframes for scrolling animation */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Adjustments for the wrapper */
.bg-white {
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: start;
}
</style>

