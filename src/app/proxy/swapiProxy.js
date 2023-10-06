// const request = require("request")
const axios = require('axios');
const apiswapi = require("../../config/property")

module.exports = {

    get: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await axios.get(apiswapi.api_swapi);
      
            if (response.data) {
              const data = response.data;
              resolve({
                nombre: data.name,
                altura: data.height,
                masa: data.mass,
                color_cabello: data.hair_color,
                color_piel: data.skin_color,
                color_ojo: data.eye_color,
                anio_nacimiento: data.birth_year,
                genero: data.gender,
                nacionalidad: data.homeworld,
                filmaciones: data.films,
                especies: data.species,
                vehiculos: data.vehicles,
                naves_estelares: data.starships,
                creado: data.created,
                editado: data.edited,
                url: data.url,
              });
            } else {
              resolve(response.data);
            }
          } catch (error) {
            console.error(error);
            reject(new Error('Error al obtener los datos de SWAPI'));
          }
        });
      }

    // get: () => {
    //     return new Promise((resolve, reject) => {

    //         request.get(apiswapi.api_swapi, (error, response, body) => {
    //             if (error) {
    //                 console.error(error);
    //                 reject(new Error('Error al obtener los datos de SWAPI'))
    //             } else

    //                 if (body) {

    //                     resolve({
    //                         nombre: JSON.parse(body).name,
    //                         altura: JSON.parse(body).height,
    //                         masa: JSON.parse(body).mass,
    //                         color_cabello: JSON.parse(body).hair_color,
    //                         color_piel: JSON.parse(body).skin_color,
    //                         color_ojo: JSON.parse(body).eye_color,
    //                         anio_nacimiento: JSON.parse(body).birth_year,
    //                         genero: JSON.parse(body).gender,
    //                         nacionalidad: JSON.parse(body).homeworld,
    //                         filmaciones: JSON.parse(body).films,
    //                         especies: JSON.parse(body).species,
    //                         vehiculos: JSON.parse(body).vehicles,
    //                         naves_estelares: JSON.parse(body).starships,
    //                         creado: JSON.parse(body).created,
    //                         editado: JSON.parse(body).edited,
    //                         url: JSON.parse(body).url
    //                     })
    //                 } else {
    //                     resolve(JSON.parse(body))
    //                 }
    //         });
    //     })
    // }
}
