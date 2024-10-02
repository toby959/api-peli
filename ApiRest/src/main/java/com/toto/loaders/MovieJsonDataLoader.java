package com.toto.loaders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.toto.models.Movie;
import com.toto.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import com.toto.models.Movies; // Asegúrate de importar la clase Movies
import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component
public class MovieJsonDataLoader implements CommandLineRunner {

  private final MovieRepository movieRepository;
  private final ObjectMapper objectMapper;

    public MovieJsonDataLoader(MovieRepository movieRepository, ObjectMapper objectMapper) {
        this.movieRepository = movieRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {

        try (InputStream inputStream = getClass().getResourceAsStream("/data/movie.json")) {
            if (inputStream == null) {
                throw new RuntimeException("No se pudo cargar el archivo movie.json");
            }
/*            Movie[] movies = objectMapper.readValue(inputStream, Movie[].class); // Suponiendo que el JSON es un array de objetos Run
            for (Movie movie : movies) {
                movieRepository.save(movie); // Guarda cada objeto Run en el repositorio

 */
            // Cambia esto para leer el objeto Movies
            Movies moviesContainer = objectMapper.readValue(inputStream, Movies.class);
            for (Movie movie : moviesContainer.movies()) {
                movieRepository.save(movie); // Guarda cada objeto Movie en el repositorio
            }
            System.out.println("Datos cargados desde movie.json");
        } catch (Exception e) {
            throw new RuntimeException("Error al cargar los datos desde movie.json", e);
        }
    }
}
