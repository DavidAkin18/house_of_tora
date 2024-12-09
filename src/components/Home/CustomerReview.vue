<template>
    <section class="bg-[#FFEFD8] px-4 md:px-16 py-14 lg:py-28">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center text-[#B87F61] mb-8">Customer Reviews</h2>
        <div class="relative">
          <!-- Scrollable Container -->
          <div
            ref="scrollContainer"
            class="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 transition-transform duration-500 ease-out"
          >
            <!-- Individual Review Cards -->
            <div
              v-for="(review, index) in reviews"
              :key="index"
              class="min-w-[300px] max-w-sm flex-shrink-0 bg-[#B87F61] rounded-lg shadow-lg p-6 snap-center"
            >
              <p class="text-[#ffffff] text-lg mb-4">{{ review.text }}</p>
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
                  {{ review.initials }}
                </div>
                <div class="ml-4">
                  <h3 class="text-white font-semibold">{{ review.name }}</h3>
                  <p class="text-gray-300 text-sm">{{ review.location }}</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Navigation Arrows -->
          <button
            @click="scrollLeft"
            class="absolute md:hidden left-0 top-1/2 transform -translate-y-1/2 bg-white px-2 py-1 rounded-full shadow-lg text-gray-700 hover:bg-gray-200"
          >
            ←
          </button>
          <button
            @click="scrollRight"
            class="absolute md:hidden right-0 top-1/2 transform -translate-y-1/2 bg-white px-2 py-1 rounded-full shadow-lg text-gray-700 hover:bg-gray-200"
          >
            →
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reviews: [
          {
            text: "This is the best service I’ve ever used!",
            initials: "JD",
            name: "John Doe",
            location: "New York, USA",
          },
          {
            text: "Fantastic quality and quick delivery!",
            initials: "SS",
            name: "Sarah Smith",
            location: "London, UK",
          },
          {
            text: "Absolutely loved the experience!",
            initials: "AK",
            name: "Alice Kim",
            location: "Seoul, South Korea",
          },
          {
            text: "Highly recommend it to anyone.",
            initials: "ML",
            name: "Michael Lee",
            location: "Toronto, Canada",
          },
          {
            text: "Great customer support and amazing product.",
            initials: "AB",
            name: "Amelia Brown",
            location: "Sydney, Australia",
          },
          {
            text: "Top-notch services and worth every penny.",
            initials: "RB",
            name: "Robert Black",
            location: "Berlin, Germany",
          },
          {
            text: "Exceeded my expectations in every way.",
            initials: "KP",
            name: "Karen Patel",
            location: "Mumbai, India",
          },
          {
            text: "Will definitely return for more!",
            initials: "JW",
            name: "James Wilson",
            location: "San Francisco, USA",
          },
        ],
      };
    },
    methods: {
      scrollLeft() {
        const container = this.$refs.scrollContainer;
        container.scrollBy({ left: -300, behavior: "smooth" });
      },
      scrollRight() {
        const container = this.$refs.scrollContainer;
        container.scrollBy({ left: 300, behavior: "smooth" });
      },
    },
  };
  </script>
  
  <style>
  /* Hide scrollbar for a clean look */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  </style>
  