<template>
    <div class="bg-white min-h-16 overflow-hidden  px-4 md:px-16">
      <div class="scrolling-container">
        <div class="logo" v-for="brand in brands" :key="brand">
          <img :src="brand" alt="Brand Logo" class="h-12 mx-4" />
        </div>
        <!-- Duplicate logos for seamless scrolling -->
        <div class="logo" v-for="brand in brands" :key="'duplicate-' + brand">
          <img :src="brand" alt="Brand Logo" class="h-12 mx-4" />
        </div>
        <div class="logo" v-for="brand in brands" :key="'duplicate-' + brand">
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
        'https://via.placeholder.com/150x50?text=Brand+1',
        'https://via.placeholder.com/150x50?text=Brand+2',
        'https://via.placeholder.com/150x50?text=Brand+3',
        'https://via.placeholder.com/150x50?text=Brand+4',
        'https://via.placeholder.com/150x50?text=Brand+5',
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

