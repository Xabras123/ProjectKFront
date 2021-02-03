<template>
  <div class="w-full">

    <div class="shadow-lg bg-gradient-to-b from-indigo-600 to-blue-700  text-center p-5">
      <h1 class="text-gray-100 text-2xl">Creador de Peliculas</h1>

    </div>

    <div class="w-full mt-5">
      
      <div class="divide-y divide-yellow-500 flex justify-between ml-8 mr-8">
        <p>URL de la Imagen</p>
        <input class="bg-gray-200 mb-4" placeholder="Ingrese el URL de la magen" v-model="image" type="text" />

      </div>

      <div class="divide-y divide-yellow-500 flex justify-between ml-8 mr-8">
        <p>Titulo</p>  
        <input class="bg-gray-200  mb-4" v-model="title" type="text" placeholder="Ingresa el titulo de la pelicula">
      </div>

      <div class=" divide-y divide-yellow-500 flex justify-between ml-8 mr-8">

        <p>Duracion en Minutos</p>
        <input class="bg-gray-200  mb-4" v-model="duration" type="number" placeholder="Ingresa la duracion de la pelicula en minutos">

      </div>

      <div class="grid grid-cols-1 divide-y divide-yellow-500 flex justify-center ml-8 mr-8">

        <p>Sinopsis</p>
        <textarea class="bg-gray-200  mb-4" v-model="synopsis" placeholder="Ingresa una sinopsis para la pelicula"></textarea>
      </div>



      
      <div class=" flex justify-between ml-8 mr-8 my-2">
        <p>Categorias</p>
      </div>
      <div class="my-2 flex justify-between ml-8 mr-8">


        <div class=" mb-4" id="categories" v-for="(category) in categories" :key="category">
          <input class="bg-gray-200" type="checkbox" :id="category">
          <label :for="category">{{category}}</label>

        </div>
      </div>
      <div class=" divide-y divide-yellow-500 flex justify-between ml-8 mr-8">

        <p>Link de trailer en YouTube</p>
        <input class="bg-gray-200  mb-4"  v-model="trailerLink" type="text" placeholder="Ingresa el link del trailer de la pelicula">

      </div>

      <div class="divide-y divide-yellow-500 flex justify-between ml-8 mr-8">

      <p>Fecha de Estreno</p>
      <input class="bg-gray-200  mb-4"  type="date" v-model="releaseDate" />
      </div>
      <button class=" my-3 mx-8 rounded shadow-md bg-indigo-300 p-3 rounded w-full  mb-4"  @click="createMovie">Registrar Pelicula</button>

    </div>

      
  </div>
</template>

<script>
// @ is an alias to /
import axios from 'axios'

export default {
  name: 'Home',
  data(){
    return {
      image: "",
      title: "",
      synopsis: "",
      duration: 0,
      categories: ["Comedia", "Accion", "Amor", "Terror", "Policial", "Documental"],
      selectedCategories: ["Comedia"],
      trailerLink: "",
      releaseDate: "",

    }
  },

  methods: {

    async createMovie(){

      if(this.image == "" || this.title == "" || this.synopsis == "" || this.selectedCategories == [] 
      || this.trailerLink == "" || this.duration == 0 || this.releaseDate == "" ){

        alert('Porfavor llene todos los campos!')
        return
      }

      if(this.title.length > 205){
        alert('The title is too long')
        return
      }

      if(this.synopsis.split(" ").length > 65){
        alert('The synopsis is to long is too long')
        return
      }



      await axios.post(`http://localhost:3000/create-movie`
      , {

            img: this.image,
            title: this.title,
            synopsis: this.synopsis,
            duration: this.duration,  
            categories: this.categories,
            trailerLink: this.trailerLink,
            releaseDate: this.releaseDate

      }
      )
      .then((res) => {
        
        alert('Pelicula se creo exitosamente!')
        console.log(res);

      }
      ).catch((error) => {

            console.log("Error de servidor");
            console.log(error);

        }
      )

    }
  },
  components: {
    
  }
}
</script>
<style>

</style>
