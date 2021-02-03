<template>
  <div class="w-full ">


    <div class="shadow-lg bg-gradient-to-b from-indigo-600 to-blue-700  text-center p-5 ">

        <h1 class="text-2xl text-gray-100">Peliculas</h1>
    </div>


    <div class="divide-y  flex  justify-between ml-10 mr-10 mt-5">
        <p class="flex justify-center text-xl">Buscar por Nombre</p>

        <div class="flex justify-center">

            <input  class="bg-gray-200" v-model="movieTitle" type="text" placeholder="Ingrese el nombre de la pelicula">
            <button class="bg-blue-200  rounded " @click="searchMovieByTitle">Buscar</button>
        </div>
    </div>

    <p class="flex justify-center mt-5"> Categorias</p>
    <div class="flex justify-between  ml-10 mr-10 ">
        <div class="my-5" id="categories" v-for="(category, index) in categories" :key="category.name">
        <input  @click="checkCheckbox(index)" type="checkbox" :id="category.name">
        <label :for="category">{{category.name}}</label>
        </div>
    </div>

    <div class="mb-5 flex justify-center">
        <button class="bg-blue-200 p-2 rounded " @click="searchMovieByCategory">Buscar por Categorias</button>

    </div>

    <div class=" mx-10  grid grid-cols-4 gap-20  md:grid grid-cols-3 sm:grid grid-cols-1" >
        <div  @mouseover="mouseOver(index)"  @mouseleave="mouseLeave(index)" id="moviesDiv" class="text-center flex justify-around " v-for="(movie, index) in movies" :key="index">

            <div id="movieDiv" class="mt-4 inline-block bg-gray-300  shadow-lg rounded w-full bg-gradient-to-t from-gray-400" >
                <div >
                    <p class="text-xl my-2 py-2" id="movieTitle">{{movie.title}}</p>
                    <div v-if="!isMovieDetails[index]"  width="320" class="flex justify-center bg-gradient-to-t from-gray-500 rounded">
                        <img   class="object-fill"  :src="movie.img" >

                    </div>
                    <div v-else class="py-2 px-3 bg-gray-200 " width="300">
                        <p class="text-xs my-4">"{{movie.synopsis}}"</p>
                        <p class="mt-y">Vistas: {{movie.views}}</p>
                        <p>Rating: {{ movie.movieLikePercentage}}%</p>
                        <div class="flex justify-center my-3">
                            <img  @click="rateMovie(true, index)" class="w-2/12 bg-gray-200 mx-4"  src="../assets/thumbs.png"  >
                            <img  @click="rateMovie(false, index)"  class="w-2/12 bg-gray-200 mx-4 transform rotate-180"  src="../assets/thumbs.png"  >

                        </div>
                    
                        <button @click="addView(index)" class="mt-3 rounded bg-blue-300 p-1 px-2 shadow-md text-md">¡Vi esta pelicula!</button>

                    </div>


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
            isMovieDetails: [],
            isMovieDetails2: false,
            movies: [

            ],
            categories: [
                            {name: "Comedia", checked: false},
                            {name: "Accion", checked: false},
                            {name: "Terror",  checked: false}, 
                            {name: "Amor",  checked: false}, 
                            {name: "Policial", checked: false}, 
                            {name: "Documental", checked: false},
                            {name: "Anime", checked: false},
                            {name: "Adventure", checked: false},
                        ],
            movieTitle: "",

        }
    },

    methods:{

        async rateMovie(rate, index){

            await axios.post(`http://localhost:3000/rate-movie`, 
            {
                movieId: this.movies[index]._id,
                rating: rate,
            }
            )
            .then((res) => {

                this.movies[index].movieLikePercentage = res.data.rating;
                

            }
            ).catch((error) => {

                    console.log("Error de servidor");
                    console.log(error);

                }
            )
        },



        mouseOver(index) {
            this.isMovieDetails2 =true;
            this.isMovieDetails[index] = true;
            this.isMovieDetails.push(false)
            this.isMovieDetails.pop()
        },

        mouseLeave(index) {
           
            this.isMovieDetails2 =false;

            this.isMovieDetails[index] = false;
            this.isMovieDetails.push(false)
            this.isMovieDetails.pop()

        },
        async searchMovieByTitle(){

            if(this.movieTitle == ""){
                //this.movies = []
                return
            }

            await axios.post(`http://localhost:3000/search-movie-by-title`, 
            {
                title: this.movieTitle,
            }
            )
            .then((res) => {

                
                this.movies = res.data;
                this.moviesHoverInitializer();
                
            }
            ).catch((error) => {

                    console.log("Error de servidor");
                    console.log(error);

                }
            )

        },

        async searchMovieByCategory(){

            const categoriesNames = []
            for(var i = 0; i < this.categories.length; i++){
                if(this.categories[i].checked){
                    categoriesNames.push(this.categories[i].name)
                }
            }

            

            await axios.post(`http://localhost:3000/search-movie-by-categories`, 
            {
                categories: categoriesNames,
            }
            )
            .then((res) => {


                this.movies = res.data
            }
            ).catch((error) => {

                    console.log("Error de servidor");
                    console.log(error);

                }
            )

        },



        moviesHoverInitializer() {
            this.isMovieDetails = [];
            for(var i = 0; i < this.movies.length; i++){

                this.isMovieDetails.push(false);
            }
        },


        checkCheckbox(index) {
            
            this.categories[index].checked = !this.categories[index].checked;

        },


        async addView(index){


            

            await axios.post(`http://localhost:3000/add-view`, 
            {
                movieId: this.movies[index]._id,
            }
            )
            .then((res) => {

                this.movies[index].views = res.data.views
                

            }
            ).catch((error) => {

                    console.log("Error de servidor");
                    console.log(error);

                }
            )

        }
    },

    computed:{

    },

    async mounted(){
      await axios.get(`http://localhost:3000/get-movies`)
      .then((res) => {
        this.movies = res.data
        this.moviesHoverInitializer();


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