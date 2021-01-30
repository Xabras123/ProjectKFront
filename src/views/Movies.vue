<template>
  <div class="w-full ">


    <div class="shadow-lg bg-gradient-to-b from-indigo-600 to-blue-700  text-center p-5 ">

        <h1 class="text-4xl text-gray-100">Peliculas</h1>
    </div>


    <div class="divide-y  flex  justify-between ml-10 mr-10 mt-5">
        <p class="flex justify-center text-xl">Buscar por Nombre</p>

        <div class="flex justify-center">

            <input  class="bg-gray-200" v-model="movieTitle" type="text" placeholder="Ingrese el nombre de la pelicula">
            <button class="bg-blue-200  rounded " @click="searchMovie">Buscar</button>
        </div>
    </div>

    <p class="flex justify-center mt-5"> Categorias</p>
    <div class="flex justify-between  ml-10 mr-10 ">
        <div class="my-5" id="categories" v-for="(category) in categories" :key="category">
        <input  type="checkbox" :id="category">
        <label :for="category">{{category}}</label>
        </div>
    </div>

    <div class="mb-5 flex justify-center">
        <button class="bg-blue-200 p-2 rounded " @click="searchMovieByCategory">Buscar por Categorias</button>

    </div>

    <div class="flex justify-center ">
        <div id="moviesDiv" class="text-center flex justify-around mx-5" v-for="(movie, index) in movies" :key="index">

            <div id="movieDiv"  class="wrap bg-gray-300 my-4 shadow-lg rounded">
                <div @mouseover="mouseOver(index)">
                <p class="text-xl my-2 py-2" id="movieTitle">{{movie.title}}</p>
                <img v-if="!hover[index]" height="450" width="300" :src="movie.img" alt="">
                <p v-if="hover[index]">{{movie.synopsis}}</p>
                </div>

            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            hover: [false, false],
            movies: [

            ],
            categories: ["Comedia", "Accion", "Amor", "Terror", "Policial", "Documental"],
            movieTitle: "",

        }
    },

    methods:{

        //mouseOver(index) {
        //    this.hover[index] = !this.hover[index];
        //},

        async searchMovie(){

            if(this.movieTitle == ""){
                this.movies = []
                return
            }

            await axios.post(`http://localhost:3000/get-single-movie`, 
            {
                title: this.movieTitle,
            }
            )
            .then((res) => {
                this.movies = []
                this.movies.push(res.data)
            }
            ).catch((error) => {

                    console.log("Error de servidor");
                    console.log(error);

                }
            )

        },

        async searchMovieByCategory(){

            await axios.post(`http://localhost:3000/get-single-movie`, 
            {
                title: this.movieTitle,
            }
            )
            .then((res) => {
                this.movies = []
                this.movies.push(res.data)
            }
            ).catch((error) => {

                    console.log("Error de servidor");
                    console.log(error);

                }
            )

        },
    },

    async mounted(){
      await axios.get(`http://localhost:3000/get-movies`)
      .then((res) => {
        this.movies = res.data
      }
      ).catch((error) => {

            console.log("Error de servidor");
            console.log(error);

        }
      )

    }

}
</script>

<style>



</style>