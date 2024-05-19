package com.example.backend.ServicesImpl;

import com.example.backend.Entities.Books;
import com.example.backend.Entities.BooksInformation;
import com.example.backend.Repository.BooksInformationRepository;
import com.example.backend.Repository.BooksRepository;
import com.example.backend.Services.BooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BooksServiceImpl implements BooksService {

    BooksRepository booksRepository;

    BooksInformationRepository booksInformationRepository;

    @Autowired
    public BooksServiceImpl(BooksRepository booksRepository, BooksInformationRepository booksInformationRepository) {
        this.booksRepository = booksRepository;
        this.booksInformationRepository = booksInformationRepository;
    }

    @Override
    public Books saveBooks(Books books) {
        booksRepository.save(books);
        return books;
    }

    @Override
    public String deleteBook(Long id, Long bid) {
        Books books = booksRepository.getReferenceById(bid);
        BooksInformation booksInformation = booksInformationRepository.getReferenceById(id);

        booksInformation.setStock(booksInformation.getStock() - 1);
        booksInformation.setAvailable(booksInformation.getAvailable() - 1);

        booksRepository.delete(books);

        return "Successfully deleted";
    }

    @Override
    public List<Books> getAllBooks() {
        return booksRepository.findAll();
    }

    @Override
    public Books getBooksById(Long id) {
        return booksRepository.getReferenceById(id);
    }
}
