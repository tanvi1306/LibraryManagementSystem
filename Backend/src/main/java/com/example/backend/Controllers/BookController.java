package com.example.backend.Controllers;

import com.example.backend.Entities.BooksInformation;
import com.example.backend.Services.BookInformationService;
import com.example.backend.Services.BooksService;
import com.example.backend.ServicesImpl.BookInformationServiceImpl;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookInformationService bookInformationService;

    @Autowired
    private BooksService booksService;


    @PostMapping(value = "/addbook")
    public ResponseEntity<?> addBook(@RequestBody BooksInformation booksInformation)
    {
        return ResponseEntity.ok(this.bookInformationService.saveBooksInformation(booksInformation));
    }


    @GetMapping("/getbooks")
    public ResponseEntity<?> getBooks()
    {
        return ResponseEntity.ok(this.bookInformationService.getAllBooksInformation());
    }

    @DeleteMapping("/deletebook/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable Long bookId)
    {
        return ResponseEntity.ok(this.bookInformationService.deleteBooksInformation(bookId));
    }

    @PutMapping("/updatebook/{bookId}")
    public ResponseEntity<?> updateBook(@PathVariable Long bookId,@RequestBody BooksInformation booksInformation)
    {
        return ResponseEntity.ok(this.bookInformationService.updateBooksInfromation(booksInformation, bookId));
    }

    @DeleteMapping("/deletebook/{Id}/{bookId}")
    public ResponseEntity<?> deleteOneBook(@PathVariable Long Id,@PathVariable Long bookId)
    {
        return ResponseEntity.ok(this.booksService.deleteBook(Id, bookId));
    }

}
