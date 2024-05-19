package com.example.backend.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long bid;

    @Column(name = "status", nullable = false)
    private String status = "available";

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference(value = "book_bookinfo")
    @JoinColumn(name = "bookinfo_id", nullable = false)
    private BooksInformation booksInformation;

    @OneToMany(mappedBy = "books", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "book_history")
    private List<BookIssueHistory> bookIssueHistories;

}
