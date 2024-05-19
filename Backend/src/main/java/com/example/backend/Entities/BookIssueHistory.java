package com.example.backend.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookIssueHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long hid;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "issue_date")
    private Date issue_date;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "due_date")
    private Date due_date;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "return_date",nullable = true)
    private Date return_date;

    @Column(name = "penalty", nullable = true)
    private float penalty = 0;

    @Column(name = "bookname", nullable = true)
    private String bookname;

    @Column(name = "bookInformationId", nullable = true)
    private Long bookid;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    @JsonBackReference(value = "book_history")
    private Books books;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference(value = "user_history")
    private Users user;

}
