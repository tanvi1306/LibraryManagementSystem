package com.example.backend.Repository;

import com.example.backend.Entities.BookIssueHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookIssueHistoryRepository extends JpaRepository<BookIssueHistory,Long> {
}
