package com.example.backend.Controllers;

import com.example.backend.Entities.BookIssueHistory;
import com.example.backend.Entities.Books;
import com.example.backend.Services.BookIssueHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/issue")
@CrossOrigin("*")
public class BookIssueController {

    @Autowired
    BookIssueHistoryService bookIssueHistoryService;

    @PostMapping(value = "/bookissue/{id}/{bid}/{uid}")
    public ResponseEntity<?> bookissue(@RequestBody BookIssueHistory bookIssueHistory, @PathVariable Long id, @PathVariable Long bid, @PathVariable Long uid)
    {
        return ResponseEntity.ok(this.bookIssueHistoryService.saveBookIssueHistory(bookIssueHistory, id, bid, uid));
    }

    @GetMapping(value = "/showissuebooks")
    public ResponseEntity<?> showissuebooks()
    {
        return ResponseEntity.ok(this.bookIssueHistoryService.getAllBookIssueHistory());
    }

    @PutMapping(value = "/returnbook/{hid}")
    public ResponseEntity<?> returnbook(@PathVariable Long hid)
    {
        return ResponseEntity.ok(this.bookIssueHistoryService.setreturnbook(hid));
    }

    @PutMapping(value = "/paypenalty/{hid}")
    public ResponseEntity<?> paypenalty(@PathVariable Long hid)
    {
        return ResponseEntity.ok(this.bookIssueHistoryService.paypenalty(hid));
    }
}
