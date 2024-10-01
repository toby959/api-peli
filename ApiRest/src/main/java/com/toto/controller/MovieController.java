package com.toto.controller;

import com.toto.models.Movie;
import com.toto.repository.MovieRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1") // Define la ruta base para la versión 1
public class MovieController {

    MovieRepository repository;

    public MovieController(MovieRepository repository) {
        this.repository = repository;
    }


    @GetMapping("/movies")
    public List<Movie> getMovies() {
        return repository.findAll();
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<Movie> getMovie(@PathVariable Long id) {
        Optional<Movie> opt = repository.findById(id);
        if(opt.isEmpty()) {
            return ResponseEntity.notFound().build(); // Cambiar a notFound si no se encuentra
        } else {
            return ResponseEntity.ok(opt.get());
        }
    }


    @CrossOrigin(origins = "*")
    @PostMapping("/movie")
    public ResponseEntity<Movie> saveMovie(@RequestBody Movie movie) {

        if(movie.getId() != null) {
            return ResponseEntity.badRequest().build();
        }
            repository.save(movie);
        return ResponseEntity.ok(movie);
    }

/*
    @CrossOrigin(origins = "*")
    @PutMapping("/movie")
    public ResponseEntity<Movie> updateMovie(@RequestBody Movie movie) {

        if(movie.getId() == null || !repository.existsById(movie.getId())) {

            return ResponseEntity.badRequest().build();
        }
        repository.save(movie);
        return ResponseEntity.ok(movie);
    }
    Este es el modificado---
 */

    @CrossOrigin(origins = "*")
    @PutMapping("/movie/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movieUpdated) {
        // Busca la película por ID
        Movie movie = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        // Actualiza los campos de la película
        if (movieUpdated.getTitle() != null) {
            movie.setTitle(movieUpdated.getTitle());
        }
        if (movieUpdated.getDirector() != null) {
            movie.setDirector(movieUpdated.getDirector());
        }
        if (movieUpdated.getGenre() != null) {
            movie.setGenre(movieUpdated.getGenre());
        }

        // Guarda la película actualizada
        Movie updatedMovie = repository.save(movie);

        return ResponseEntity.ok(updatedMovie);
    }


    @CrossOrigin(origins = "*")
    @DeleteMapping("/movie/{id}")
    public ResponseEntity<Movie> deleteMovie(@PathVariable Long id) {

        if(id == null || !repository.existsById(id)) {

            return ResponseEntity.badRequest().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
/*
    @CrossOrigin(origins = "*")
    @PutMapping("/{id}")
    public ResponseEntity<Movie> editMovie(@PathVariable Long id, @RequestBody Movie movieUpdated) {
        // Busca la película por ID
        Movie movie = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        // Actualiza los campos de la película
        movie.setTitle(movieUpdated.getTitle());
        movie.setDirector(movieUpdated.getDirector());
        movie.setGenre(movieUpdated.getGenre());

        // Guarda la película actualizada
        Movie updatedMovie = repository.save(movie);

        return ResponseEntity.ok(updatedMovie);
    }

 */
}
