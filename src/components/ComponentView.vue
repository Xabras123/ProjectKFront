<template>

    <div>
        <div id="movieDiv"  class="wrap bg-gray-300 my-4 shadow-lg rounded">
            <div @mouseover="mouseOver(index)">
            <p class="text-xl my-2 py-2" id="movieTitle">{{movie.title}}</p>
            <img v-if="!hover[index]" height="450" width="300" :src="movie.img" alt="">
            <p v-if="hover[index]">{{movie.synopsis}}</p>
            </div>

        </div>

    </div>


</template>

<script>
export default {

}
</script>

<style>

</style>