<template>
  <div class="w-full ">


    <div class="shadow-lg bg-gradient-to-b from-indigo-600 to-blue-700  text-center p-5 ">

        <h1 class="text-2xl text-gray-100">Novedades</h1>
    </div>


    <div class="flex justify-around">
    <div class=" mx-10  grid grid-cols-3 gap-20  md:grid grid-cols-4 sm:grid grid-cols-1" >
        <div  @mouseover="mouseOver(index)"  @mouseleave="mouseLeave(index)" id="moviesDiv" class="text-center flex justify-around " v-for="(movie, index) in movies" :key="index">

            <div id="movieDiv" class="mt-4 bg-gray-300  shadow-lg rounded w-full bg-gradient-to-t from-gray-400" >
                <div >
                    
                    <p class="text-xl my-2 py-2" id="movieTitle">{{movie.title}}</p>
                    <div v-if="!isMovieDetails[index]"   class="flex justify-center bg-gradient-to-t from-gray-500 rounded">
                        <img   class=" w-full"  :src="movie.img" >

                    </div>
                    <div v-else class="py-2 px-3 bg-gray-200 " >
                        <p class="text-xs my-4">"{{movie.synopsis}}"</p>
                        <p class="mt-y">Vistas: {{movie.views}}</p>
                        <p>Rating: {{ movie.movieLikePercentage}}%</p>
                        <div v-if="!isMovieRated[index]" class="flex justify-center my-3" >
                            <img  @click="rateMovie(true, index)" class="w-2/12 bg-gray-200 mx-4 hover:shadow-lg"  src="../assets/thumbs.png"  >
                            <img  @click="rateMovie(false, index)"  class="w-2/12 bg-gray-200 mx-4 transform rotate-180 hover:shadow-lg"  src="../assets/thumbs.png"  >

                        </div>

                        <div v-else class="my-2 text-red-400"> <p>Pelicula Calificada</p>
                        </div>
                    
                        <button :disabled="isViewAdded[index]" :class="isViewAdded[index] ? 'bg-gray-200 text-gray-400' : 'bg-blue-300 border-2 border-blue-400  hover:border-blue-500 '" @click="addView(index)" class="mt-3 rounded p-1 px-2 shadow-md text-md">¡Vi esta pelicula!</button>

                    </div>


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
            isViewAdded: [],
            isMovieRated: [],

            movies: [

            ],


        }
    },

    methods:{

        async addView(index){


            

            await axios.post(`http://localhost:3000/add-view`, 
            {
                movieId: this.movies[index]._id,
            }
            )
            .then((res) => {

                this.movies[index].views = res.data.views;
                this.isViewAdded[index] = true;
                this.isViewAdded.push(false);
                this.isViewAdded.pop();
                

            }
            ).catch((error) => {

                    console.log("Error de servidor");
                    console.log(error);

                }
            )

        },

        moviesHoverInitializer() {
            this.isMovieDetails = [];
            this.isViewAdded = [];
            this.isMovieRated= [];
            for(var i = 0; i < this.movies.length; i++){

                this.isMovieDetails.push(false);
                this.isViewAdded.push(false);
                this.isMovieRated.push(false);
            }
        },

        async rateMovie(rate, index){

            await axios.post(`http://localhost:3000/rate-movie`, 
            {
                movieId: this.movies[index]._id,
                rating: rate,
            }
            )
            .then((res) => {

                this.movies[index].movieLikePercentage = res.data.rating;
                this.isMovieRated[index] = true;
                this.isMovieRated.push(false);
                this.isMovieRated.pop();
                

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
    },

    async mounted(){

        console.log("movies mountedddd")
        await axios.get(`http://localhost:3000/get-novelties/21`)
        .then((res) => {
            this.movies = res.data

        }).catch((error) => {

                console.log("Error de servidor");
                console.log(error);

            }
        )

    }
}
</script>

<style>



</style>