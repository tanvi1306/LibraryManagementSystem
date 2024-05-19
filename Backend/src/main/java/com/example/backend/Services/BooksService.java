package com.example.backend.Services;

import com.example.backend.Entities.Books;
import com.example.backend.Entities.BooksInformation;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public interface BooksService {

    public Books saveBooks(Books books);
    public String deleteBook(Long id, Long bid);
    public List<Books> getAllBooks();
    public Books getBooksById(Long id);

}
