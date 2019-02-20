var audioEffects = {
    nivel1:"nivel1.mp3",
    nivel2:"nivel2.mp3",
    nivel3:"nivel3.mp3"
  }
  
  var loadedAudios = {} //donde se guardan los audios cargados
  var totalLoaded = 0; //contador para saber q los audios estan cargados
  var totalAudios = Object.keys(audioEffects).length; //cuantos audios tiene que cargar
  
  Object.keys(audioEffects).forEach(function (e) {
    var audio = new Audio('music/' + audioEffects[e]);
    audio.oncanplay = function () {
      totalLoaded++;
      if (totalLoaded == totalAudios) {
        console.log("All audios loaded");
      }
    };
    loadedAudios[e] = audio; //guarda el audio
  })

  //obkect.keys le paqsas un objeto y el te devuelve un array de todas sus keys. 
  // como te devuelve un array hacemos un forEach para recorrer cada uno de eso elementos
  //hacemos un var audio q es ihgual a un neu audio y (en vez d escribir (line2,3,...) ) escribirmos music
  // el audio efects 
  //prop.oncanplay comprueba si esta cargada. si es asi aumenta en un 1 el totalloaded y continuamente comprueba 
  //si el totalloaded es igual al total audios ;es decir, si ha llegad al total de la musica q tne q cargar por lo q si lo cumple hace un console log 

//   loadedAudios.nivel1.play()