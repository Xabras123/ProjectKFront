<template>
  <div class="font-mono bg-yellow-200 h-full bg-gradient-to-t from-yellow-300"  id="app">
    <div id="nav" class="flex fixed  w-full font-sans  justify-between p-2 bg-yellow-300 shadow-lg text-xl">
      <router-link class="font-black text-2xl" to="/">Project K</router-link> 

      <div class="text-bold flex justify-center">
        <router-link class="mx-2" to="/">Crear Pelicula</router-link> |
        <router-link class="mx-2" to="/movies">Peliculas</router-link> |
        <router-link class="mx-2" to="/novelties">Novedades</router-link>

      </div>

    </div>




    <router-view class="pt-12" />

  </div>
</template>

<style>



</style>
