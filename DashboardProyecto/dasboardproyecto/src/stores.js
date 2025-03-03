// // src/stores.js
// import { writable } from 'svelte/store';
// import { db, collection, getDocs } from './lib/firebase';

// // Crear un store para almacenar el conteo de documentos
// export const proyectosCount = writable(0);

// // Función para obtener el número de documentos en la colección 'proyectos'
// export async function fetchProyectosCount() {
//   const querySnapshot = await getDocs(collection(db, "proyectos"));
//   proyectosCount.set(querySnapshot.size);  // Establecer el tamaño de la colección
// }

// // Crear un store para almacenar el recuento de tecnologías
// export const tecnologiasCount = writable({});

// // Crear un store para almacenar los documentos completos de tecnologías
// export const tecnologiasDocs = writable({});

// // Función para obtener el recuento de tecnologías usadas en todos los proyectos
// export async function fetchTecnologiasCount() {
//     const querySnapshot = await getDocs(collection(db, "proyectos"));
//     let count = {};
//     let docs = {};
//     let tecnologiasUnicas = new Set();  // Usar Set para evitar repeticiones
  
//     // Primero, contar las tecnologías usadas en los proyectos
//     querySnapshot.forEach((doc) => {
//       const proyecto = doc.data();
//       if (proyecto.tecnologias) {
//         // Obtener las tecnologías del campo 'tecnologías' y dividirlas
//         const tecnologias = proyecto.tecnologias.split(',').map(tecnologia => tecnologia.trim());
  
//         // Agregar las tecnologías al Set (el Set asegura que no se repitan)
//         tecnologias.forEach(tecnologia => tecnologiasUnicas.add(tecnologia));
  
//         // Contar cada tecnología
//         tecnologias.forEach((tecnologia) => {
//           if (count[tecnologia]) {
//             count[tecnologia]++;
//           } else {
//             count[tecnologia] = 1;
//           }
  
//           // Buscar el documento en la colección 'Tecnologias' para la tecnología
//          // buscarTecnologiaEnDocs(tecnologia, docs);
//         });
//       }
//     });
  
//     // Convertir el Set a un array para trabajar con los valores
//     const tecnologiasArray = Array.from(tecnologiasUnicas);
  
//     // Establecer el resultado en el store
//     tecnologiasCount.set(count);
//     tecnologiasDocs.set(docs);
  
//     // Retornar el array de tecnologías únicas para uso posterior
//     console.log("Tecnologías únicas:", tecnologiasArray);

//     // Compara las tecnologías con los campos de los documentos en "Tecnologias" y muestra los IDs
//     tecnologiasArray.forEach(tecnologia => {
//       compararTecnologiaConDocs(tecnologia);  // Compara cada tecnología con los documentos de "Tecnologias"
//     });
  
//     return tecnologiasArray;  // Retornar el array de tecnologías únicas
//   }
//   /*
// async function buscarTecnologiaEnDocs(tecnologia, docs) {
//   const tecnologiasSnapshot = await getDocs(collection(db, "Tecnologias"));
  
//   tecnologiasSnapshot.forEach((doc) => {
//     const docData = doc.data();
    
//     console.log("Buscando en documento: ", doc.id); // Log de ID de documento
//     console.log("Campos del documento: ", docData); // Log de los campos del documento

//     // Normalizar la tecnología a minúsculas para asegurar la búsqueda independiente de mayúsculas y minúsculas
//     const normalizedTecnologia = tecnologia.trim().toLowerCase();

//     // Comprobar si el documento tiene un campo con el nombre de la tecnología (insensible a mayúsculas/minúsculas)
//     Object.keys(docData).forEach(field => {
//       console.log("Comparando con campo:", field); // Log de campo comparado
//       if (field.toLowerCase() === normalizedTecnologia) {
//         // Si existe, agregar el ID del documento al store de documentos
//         if (!docs[tecnologia]) {
//           docs[tecnologia] = [];
//         }
//         docs[tecnologia].push(doc.id);  // Guardar el ID del documento
//         console.log("Tecnología encontrada en el documento:", doc.id); // Log de la tecnología encontrada
//       }
//     });
//   });
// }*/

// async function compararTecnologiaConDocs(tecnologia) {
//     const tecnologiasSnapshot = await getDocs(collection(db, "Tecnologías"));
    
//     // Verificar si realmente hay documentos en la colección "Tecnologias"
//     if (tecnologiasSnapshot.empty) {
//       console.log("No se encontraron documentos en la colección 'Tecnologias'.");
//       return;
//     }
  
//     tecnologiasSnapshot.forEach((doc) => {
//       const docData = doc.data();
      
//       // Normalizar la tecnología a minúsculas y eliminar espacios extra
//       const normalizedTecnologia = tecnologia.trim().toLowerCase();
  
//       console.log(`Buscando la tecnología "${tecnologia}" en los documentos...`);
  
//       // Comprobar si el documento tiene un campo con el nombre de la tecnología (insensible a mayúsculas/minúsculas y sin espacios)
//       Object.keys(docData).forEach(field => {
//         // Normalizar también los campos del documento (minúsculas y sin espacios)
//         const normalizedField = field.trim().toLowerCase();
        
//         console.log(`Comparando "${normalizedTecnologia}" con el campo "${normalizedField}"`);
  
//         if (normalizedField === normalizedTecnologia) {
//           // Si encuentra una coincidencia, imprimir el ID del documento
//           console.log(`Tecnología "${tecnologia}" encontrada en el documento ID: ${doc.id}`);
//         }
//       });
//     });
//   }
import { writable } from 'svelte/store';
import { db, collection, getDocs } from './lib/firebase';

// Crear un store para almacenar el conteo de documentos
export const proyectosCount = writable(0);

// Función para obtener el número de documentos en la colección 'proyectos'
export async function fetchProyectosCount() {
  const querySnapshot = await getDocs(collection(db, "proyectos"));
  proyectosCount.set(querySnapshot.size);  // Establecer el tamaño de la colección
}

// Crear un store para almacenar el recuento de tecnologías
export const tecnologiasCount = writable({});

// Crear un store para almacenar los documentos completos de tecnologías
export const tecnologiasDocs = writable({});

export let tecnologiasUnicas = new Set();

export let tecnologiasById = writable([]);

// Función para obtener el recuento de tecnologías usadas en todos los proyectos
export async function fetchTecnologiasCount() {
    const querySnapshot = await getDocs(collection(db, "proyectos"));
    let count = {};  // Para almacenar el conteo de tecnologías
    tecnologiasUnicas.clear();  // Limpiar el Set antes de contar nuevas tecnologías
  
    // Primero, contar las tecnologías usadas en los proyectos
    querySnapshot.forEach((doc) => {
      const proyecto = doc.data();
      if (proyecto.tecnologias) {
        // Obtener las tecnologías del campo 'tecnologías' y dividirlas
        const tecnologias = proyecto.tecnologias.split(',').map(tecnologia => tecnologia.trim());
  
        // Agregar las tecnologías al Set (el Set asegura que no se repitan)
        tecnologias.forEach(tecnologia => tecnologiasUnicas.add(tecnologia));
  
        // Contar cada tecnología
        tecnologias.forEach((tecnologia) => {
          if (count[tecnologia]) {
            count[tecnologia]++;
          } else {
            count[tecnologia] = 1;
          }
        });
      }
    });
  
    // Convertir el Set a un array para trabajar con los valores
    const tecnologiasArray = Array.from(tecnologiasUnicas);
  
    // Mostrar en consola los resultados
    console.log("Número de proyectos que usan cada tecnología:", count);
    console.log("Lista única de tecnologías encontradas:", tecnologiasArray);
  
    // Establecer el resultado en el store
    tecnologiasCount.set({ ...count });

    // Ahora recorrer la colección 'Tecnologías' y asociar cada tecnología a los documentos
    const tecnologiasRef = collection(db, "Tecnologías");
    const tecnologiasSnapshot = await getDocs(tecnologiasRef);

    // Creamos un array para almacenar el resultado final
    let tecnologiasByIdArray = [];

    // Recorremos los documentos de la colección 'Tecnologías'
    tecnologiasSnapshot.forEach((doc) => {
      const tecnologiasDocData = doc.data();
      const tecnologiasId = doc.id;
      
      // Crear una lista para almacenar las tecnologías encontradas en este documento
      let tecnologiasEncontradas = [];

      // Recorremos cada tecnología del array 'tecnologiasUnicas'
      tecnologiasArray.forEach((tecnologia) => {
        if (tecnologiasDocData.tecno) {
          const tecnologiasDocArray = tecnologiasDocData.tecno.split(',').map(tecnologia => tecnologia.trim());
          if (tecnologiasDocArray.includes(tecnologia)) {
            tecnologiasEncontradas.push(tecnologia);
          }
        }
      });

      // Si hay tecnologías encontradas, las añadimos al array final
      if (tecnologiasEncontradas.length > 0) {
        tecnologiasByIdArray.push({
          id: tecnologiasId,
          conteoTecnologias: tecnologiasEncontradas.reduce((acc, tecnologia) => {
            acc[tecnologia] = count[tecnologia] || 0; // Usamos el conteo global de tecnologías
            return acc;
          }, {})
        });
      }
    });

    // Establecer el array final en el store
    tecnologiasById.set(tecnologiasByIdArray);

    // Mostrar el resultado en consola
    console.log("Tecnologías por ID de documento con conteo:", tecnologiasByIdArray);
} 



  /*
  export async function fetchTecnologiasPorClase() {
    const querySnapshot = await getDocs(collection(db, "Tecnologias"));
    let tecnologiasPorClase = {
      FrontEnd: [],
      BackEnd: [],
      Otro: []
    };
  
    // Obtener la lista única de tecnologías
    const queryProyectos = await getDocs(collection(db, "proyectos"));
    let tecnologiasUnicas = new Set();
  
    queryProyectos.forEach((doc) => {
        const proyecto = doc.data();
        console.log("Proyecto obtenido:", proyecto); // Ver qué datos tiene el documento
        
        if (proyecto.tecnologias && typeof proyecto.tecnologias === "string") {
          const tecnologias = proyecto.tecnologias.split(',').map(tecnologia => tecnologia.trim());
          console.log("Tecnologías extraídas:", tecnologias); // Verifica si extrae bien las tecnologías
          
          tecnologias.forEach(tecnologia => tecnologiasUnicas.add(tecnologia));
        } else {
          console.warn(`El campo 'tecnologias' no es una cadena en el documento: ${doc.id}`, proyecto.tecnologias);
        }
      });
      
  
    
    // Comparar con la colección "Tecnologias" y clasificar
    querySnapshot.forEach((doc) => {
      const tecnologiaDoc = doc.data();
      if (tecnologiasUnicas.has(tecnologiaDoc.nombre)) {
        if (tecnologiaDoc.clase === "FrontEnd") {
          tecnologiasPorClase.FrontEnd.push(tecnologiaDoc.nombre);
        } else if (tecnologiaDoc.clase === "BackEnd") {
          tecnologiasPorClase.BackEnd.push(tecnologiaDoc.nombre);
        } else {
          tecnologiasPorClase.Otro.push(tecnologiaDoc.nombre);
        }
      }
    });
  
    // Mostrar resultados en consola
    console.log("Tecnologías clasificadas por clase:", tecnologiasPorClase);
  
    return tecnologiasPorClase;
  }
  
  /*
  // Compara las tecnologías con los campos de los documentos en "Tecnologias" y muestra los IDs
  for (const tecnologia of tecnologiasArray) {
    await compararTecnologiaConDocs(tecnologia, docs);  // Compara cada tecnología con los documentos de "Tecnologias"
  }

  // Imprimir por consola el resultado
  console.log("Tecnologías encontradas con sus documentos y número de apariciones:");
  console.log(docs);

  return tecnologiasArray;  // Retornar el array de tecnologías únicas
}

async function compararTecnologiaConDocs(tecnologia, count) {
    const tecnologiasSnapshot = await getDocs(collection(db, "Tecnologías"));
    
    // Verificar si realmente hay documentos en la colección "Tecnologias"
    if (tecnologiasSnapshot.empty) {
      console.log("No se encontraron documentos en la colección 'Tecnologias'.");
      return;
    }
  
    console.log(`Documentos encontrados en la colección: ${tecnologiasSnapshot.size}`);
  
    // Buscar los documentos que contienen la tecnología en cuestión
    tecnologiasSnapshot.forEach((doc) => {
      const docData = doc.data();
      
      // Normalizar la tecnología a minúsculas y eliminar espacios extra
      const normalizedTecnologia = tecnologia.trim().toLowerCase();
  
      // Comprobar si el documento tiene un campo con el nombre de la tecnología
      Object.keys(docData).forEach(field => {
        const normalizedField = field.trim().toLowerCase();
        
        console.log(`Comparando "${normalizedTecnologia}" con el campo "${normalizedField}"`);
  
        if (normalizedField === normalizedTecnologia) {
          const category = doc.id;  // Usar el ID del documento como categoría
          
          if (!count[category]) {
            count[category] = {};  // Inicializamos la categoría si no existe
          }
  
          if (!count[category][tecnologia]) {
            count[category][tecnologia] = 0;  // Inicializamos el contador si no existe
          }
  
          count[category][tecnologia] += 1;  // Incrementamos el contador
          console.log(`Tecnología "${tecnologia}" encontrada en el documento ID: ${doc.id} en la categoría ${category}`);
        }
      });
    });
  
    console.log("Número de proyectos que usan cada tecnología:", count);
  }
  */