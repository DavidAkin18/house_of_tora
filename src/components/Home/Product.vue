<template>
  <section class="bg-[#E5E5E5] px-4  py-8 md:px-16" id="products">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-800">Products</h2>
    </div>

    <!-- Product Cards -->
    <div class="grid grid-cols-2 gap-4 md:grid-cols-5 ">
        <div class="">
            <router-link to="/lotion">
                <img 
                src="https://image.made-in-china.com/202f0j00ZavozMQHvcrt/D50mm-120ml-150ml-180ml-200ml-220ml-240ml-250ml-Body-Lotion-Cream-Plastic-Tube-Cosmetic-Packaging-Tube.webp" 
                alt="Beauty Soaps" class="rounded-lg shadow-md">
                <button class="mt-2 text-white font-medium rounded-md p-1 text-center border bg-[#B87F61] hover:bg-[#E5E5E5] hover:border-[#B87F61] hover:text-[#B87F61]">Lotion & Tube Creams</button>
            </router-link>
        </div>
        <div class="">
           <router-link to="/scrub">
            <img src="https://www.cultbeauty.com/images?url=https://static.thcdn.com/productimg/original/13522440-2744937422208733.jpg&format=webp&auto=avif&width=1200&height=1200&fit=cover" alt="Body Lotion" class="rounded-lg shadow-md">
            <button class="mt-2 text-white font-medium text-center rounded-md p-1 border bg-[#B87F61] hover:bg-[#E5E5E5] hover:border-[#B87F61] hover:text-[#B87F61]">Scrub & Supplements</button>
           </router-link>
        </div>
        <div class="">
            <router-link to="/shower">
                <img src="https://driftbasket.com/wp-content/uploads/2022/06/71fP1ocQg0L._SL1500_-e1654535869753.jpg" alt="Hair Oil" class="rounded-lg shadow-md">
                <button class="mt-2 text-white font-medium text-center rounded-md p-1 border bg-[#B87F61] hover:bg-[#E5E5E5] hover:border-[#B87F61] hover:text-[#B87F61]">Shower Baths & Tablet soaps</button>
            </router-link>
        </div>
        <div class="">
            <router-link to="/faceWash">
                <img src="https://www.simpleskincare.in/cdn/shop/files/Kind-to-Skin-Replenishing-Combo.jpg?v=1721644261&width=1500" alt="Facewash" class="rounded-lg shadow-md">
                <button class="mt-2 text-white font-medium text-center border rounded-md p-1 bg-[#B87F61] hover:bg-[#E5E5E5] hover:border-[#B87F61] hover:text-[#B87F61]">Face wash, Toner & Cleanser</button>
            </router-link>
        </div>
        <div class="">
            <router-link to="/bodyOil">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvFDnV8uBdvflBwd5glxnSCX_eOVTB8pF54w&s" alt="Facewash" class="rounded-lg shadow-md">
                <button class="mt-2 text-[#ffffff] border bg-[#B87F61] hover:bg-[#E5E5E5] hover:border-[#B87F61] hover:text-[#B87F61]  rounded-md p-1 font-medium text-center">Body oil, Face serum & Face creams</button>
            </router-link>
        </div>
    </div>
    </section>

    <!-- <section class="bg-gray-50 px-4 py-8 md:px-16">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">Ayurvedic Soaps</h2>
            <a href="#" class="text-orange-500 hover:text-orange-600 font-medium">See All →</a>
        </div> -->

        <!-- Soap Cards -->
        <!-- <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div class="bg-white rounded-lg shadow-md p-4">
            <img src="https://via.placeholder.com/150" alt="Cinnamon Beauty Bar" class="rounded-lg">
            <h3 class="text-sm font-bold text-gray-800 mt-2">Cinnamon Beauty Bar</h3>
            <p class="text-sm text-gray-600 mt-1">USD 10</p>
            <button class="mt-2 bg-orange-500 text-white text-sm px-3 py-1 rounded hover:bg-orange-600">Add to Cart</button>
            </div>
            <div class="bg-white rounded-lg shadow-md p-4">
            <img src="https://via.placeholder.com/150" alt="Charcoal Cleansing Bar" class="rounded-lg">
            <h3 class="text-sm font-bold text-gray-800 mt-2">Charcoal Cleansing Bar</h3>
            <p class="text-sm text-gray-600 mt-1">USD 10</p>
            <button class="mt-2 bg-orange-500 text-white text-sm px-3 py-1 rounded hover:bg-orange-600">Add to Cart</button>
            </div>
            <div class="bg-white rounded-lg shadow-md p-4">
            <img src="https://via.placeholder.com/150" alt="Lemongrass Germ Bar" class="rounded-lg">
            <h3 class="text-sm font-bold text-gray-800 mt-2">Lemongrass Germ Bar</h3>
            <p class="text-sm text-gray-600 mt-1">USD 10</p>
            <button class="mt-2 bg-orange-500 text-white text-sm px-3 py-1 rounded hover:bg-orange-600">Add to Cart</button>
            </div>
            <div class="bg-white rounded-lg shadow-md p-4">
            <img src="https://via.placeholder.com/150" alt="Ayurvedic Beauty Bar" class="rounded-lg">
            <h3 class="text-sm font-bold text-gray-800 mt-2">Ayurvedic Beauty Bar</h3>
            <p class="text-sm text-gray-600 mt-1">USD 10</p>
            <button class="mt-2 bg-orange-500 text-white text-sm px-3 py-1 rounded hover:bg-orange-600">Add to Cart</button>
            </div>
        </div>
        </section> -->


</template>

<script>
export default {

}
</script>

<style>

</style>