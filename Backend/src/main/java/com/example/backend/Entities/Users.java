package com.example.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long uid;

    @Column(name = "name")
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    @JsonIgnore
    private String email;

    @Column(name = "password", nullable = false)
    @JsonIgnore
    private String password;

    @Column(name = "total_penalty")
    private float total_penalty = 0;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Roles role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<BookIssueHistory> bookIssueHistories = new ArrayList<>();

}
