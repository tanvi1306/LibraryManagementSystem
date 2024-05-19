package com.example.backend.Services;

import com.example.backend.Entities.BookIssueHistory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface BookIssueHistoryService {

    public String saveBookIssueHistory(BookIssueHistory bookIssueHistory, Long id, Long bid, Long uid);
    public void deleteBookIssueHistory(Long id);
    public List<Map<String, Object>> getAllBookIssueHistory();
    public BookIssueHistory getBookIssueHistoryById(Long id);
    public String setreturnbook(Long hid);
    public String paypenalty(Long hid);
}
