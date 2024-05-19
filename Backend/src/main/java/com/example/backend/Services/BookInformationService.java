package com.example.backend.Services;

import com.example.backend.Entities.Books;
import com.example.backend.Entities.BooksInformation;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface BookInformationService {

    public String saveBooksInformation(BooksInformation booksInformation);
    public String deleteBooksInformation(Long id);
    public List<BooksInformation> getAllBooksInformation();
    public BooksInformation getBooksInformationById(Long id);
    public BooksInformation getBooksInformationByObject(BooksInformation booksInformation);
    public String updateBooksInfromation(BooksInformation booksInformation, Long id);
}
