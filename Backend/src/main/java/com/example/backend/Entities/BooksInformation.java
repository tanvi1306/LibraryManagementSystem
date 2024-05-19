package com.example.backend.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BooksInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookinfo_id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "category")
    private String category;

    @Column(name = "stock")
    private Long stock= 0L;

    @Column(name = "available")
    private Long available= 0L;

    @Column(name = "image_url")
    private String image;

    @OneToMany(mappedBy = "booksInformation", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "book_bookinfo")
    private List<Books> books;

    @Override
    public String toString() {
        return "BooksInformation{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", isbn='" + isbn + '\'' +
                ", category='" + category + '\'' +
                ", stock=" + stock +
                ", available=" + available +
                ", image='" + image + '\'' +
                ", books=" + books +
                '}';
    }
}