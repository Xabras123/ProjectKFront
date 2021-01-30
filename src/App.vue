<template>
  <div class="font-mono bg-yellow-100" id="app">
    <div id="nav" class="font-sans  flex justify-between p-2 bg-yellow-300 shadow-lg text-xl">
      <router-link class="font-black text-2xl" to="/">Project K</router-link> 

      <div class="text-bold flex justify-center">
        <router-link class="mx-2" to="/">Crear Pelicula</router-link> |
        <router-link class="mx-2" to="/movies">Peliculas</router-link>
      </div>

    </div>




    <router-view/>

  </div>
</template>

<style>



</style>
