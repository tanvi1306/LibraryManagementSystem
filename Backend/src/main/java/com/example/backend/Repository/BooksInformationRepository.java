package com.example.backend.Repository;

import com.example.backend.Entities.BooksInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BooksInformationRepository extends JpaRepository<BooksInformation,Long> {
}
