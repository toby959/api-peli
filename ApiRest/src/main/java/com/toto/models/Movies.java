package com.toto.models;


import java.util.List;

public class Movies {

    private List<Movie> movies;

    // Constructor vacío (requerido por Jackson)
    public Movies() {}

    public Movies(List<Movie> movies) {
        this.movies = movies;
    }

    public List<Movie> movies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

}
