<template>
  <section class="bg-[#FFEFD8] px-4 md:px-16 pt-28 py-14 lg:py-28 lg:pt-48">
    <div class="flex flex-col md:flex-row items-center md:justify-between">
        <!-- Text Content -->
        <div class="mb-6 md:mb-0 md:w-1/2">
            <h1 class="text-5xl font-extrabold text-[#B87F61]  mb-4">
                ...Look pretty, feel pretty.
            </h1>
            <p class="text-[#2D2D2D] mb-6">
                Beauty care treatments that are effective, safe, and have withstood the trials of time.
            </p>
            <div class="flex space-x-4">
                <a href="https://wa.me/2349092627921" target="_blank" 
                class="bg-[#B87F61] text-white px-6 py-2 rounded 
                 hover:bg-[#FFEFD8] hover:border hover:border-[#B87F61] hover:text-[#B87F61]">
                contact us
                </a>
                <a @click.prevent="scrollTo('products')" class="text-[#B87F61]  border border-[#B87F61]
                 hover:border-[#FFEFD8] hover:border hover:bg-[#B87F61] 
                hover:text-[#FFFFFF] px-6 py-2 rounded ">
                Products
                </a>
            </div>
        </div>

        <!-- Hero Image -->
        <div class="md:w-1/2">
        <img src="https://media.istockphoto.com/id/1460122345/photo/cream-lotion-and-face-of-black-woman-skincare-product-beauty-cosmetics-and-advertising.jpg?s=612x612&w=0&k=20&c=_g4VgTeFHYZuEqqmC6BRFe6SLDcsdcXEelT1LXtjyc8=" alt="Ayurvedic Products" class="rounded-lg shadow-lg">
        </div>
    </div>
    </section>

</template>

<script>
export default {
methods:{
    scrollTo(target) {
      this.$scrollTo(`#${target}`, 500); // 500ms duration
    },
}
}
</script>

<style>

</style>