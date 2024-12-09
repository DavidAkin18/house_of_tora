<template>
    <section class=" px-4 md:px-16 py-14 lg:py-28" id="products">
        <div class="flex justify-start items-center  ">
            <h2 class="text-3xl font-bold text-[#B87F61]">Products</h2>
        </div>
        <hr class="border-[#B87F61] text-xl font-bold mb-10">

        <!-- Product Cards -->
        <div class="grid grid-cols-2 gap-4 md:grid-cols-5 ">
            <div class="">
                <router-link to="/lotion">
                    <img 
                    src="https://res.cloudinary.com/def9quyti/image/upload/v1732348159/lotion_kw6glc.jpg" 
                    alt="Beauty Soaps" class="rounded-lg shadow-md">
                    <button class="mt-2 text-white font-medium rounded-md p-1 text-center border bg-[#B87F61] hover:bg-[#E5E5E5] hover:border-[#B87F61] hover:text-[#B87F61]">Lotion & Tube Creams</button>
                </router-link>
            </div>
            <div class="">
            <router-link to="/scrub">
                <img src="https://res.cloudinary.com/def9quyti/image/upload/v1732348193/scrub_abrcml.jpg" alt="Body Lotion" class="rounded-lg shadow-md">
                <button class="mt-2 text-white font-medium text-center rounded-md p-1 border bg-[#B87F61] hover:bg-[#E5E5E5] hover:border-[#B87F61] hover:text-[#B87F61]">Scrub & Supplements</button>
            </router-link>
            </div>
            <div class="">
                <router-link to="/shower">
                    <img src="https://res.cloudinary.com/def9quyti/image/upload/v1732348610/shower_bath_and_tablet_soap_c8o0qg.jpg" alt="Hair Oil" class="rounded-lg shadow-md">
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
                    <img src="https://res.cloudinary.com/def9quyti/image/upload/v1732348170/body_oil_hmukyo.webp" alt="Facewash" class="rounded-lg shadow-md">
                    <button class="mt-2 text-[#ffffff] border bg-[#B87F61] hover:bg-[#E5E5E5] hover:border-[#B87F61] hover:text-[#B87F61]  rounded-md p-1 font-medium text-center">Body oil, Face serum & Face creams</button>
                </router-link>
            </div>
        </div>
    </section>

</template>

<script>
export default {

}
</script>

<style>

</style>