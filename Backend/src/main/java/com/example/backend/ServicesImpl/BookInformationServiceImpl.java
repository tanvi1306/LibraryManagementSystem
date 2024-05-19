package com.example.backend.ServicesImpl;

import com.example.backend.Entities.Books;
import com.example.backend.Entities.BooksInformation;
import com.example.backend.Repository.BooksInformationRepository;
import com.example.backend.Services.BookInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class BookInformationServiceImpl implements BookInformationService {

    BooksInformationRepository booksInformationRepository;

    BooksServiceImpl booksService;

    @Autowired
    public BookInformationServiceImpl(BooksInformationRepository booksInformationRepository, BooksServiceImpl booksService) {
        this.booksInformationRepository = booksInformationRepository;
        this.booksService = booksService;
    }

    @Override
    public String saveBooksInformation(BooksInformation booksInformation) {

        BooksInformation booksInformation1 = getBooksInformationByObject(booksInformation);

        if(booksInformation1 == null)
        {


            List<Books> books = new ArrayList<>();
            for(int i=0; i < booksInformation.getStock(); ++i)
            {
                Books book = new Books();
                book.setBooksInformation(booksInformation);

                books.add(book);
            }

            booksInformation.setBooks(books);

            booksInformationRepository.save(booksInformation);

            return "Book sucessfully added";
        }
        else
        {
            return "Book already exist.";
        }

    }

    @Override
    public String deleteBooksInformation(Long id) {

        BooksInformation booksInformation = booksInformationRepository.getReferenceById(id);
        booksInformationRepository.delete(booksInformation);

        BooksInformation booksInformation1 = getBooksInformationByObject(booksInformation);

        if(booksInformation1 == null)
        {
            return "Delete Successfully";
        }
        else
        {
            return "Book is not deleted";
        }
    }

    @Override
    public List<BooksInformation> getAllBooksInformation() {

        return booksInformationRepository.findAll();
    }

    @Override
    public BooksInformation getBooksInformationById(Long id) {

        return booksInformationRepository.getReferenceById(id);
    }

    @Override
    public BooksInformation getBooksInformationByObject(BooksInformation booksInformation) {

        List<BooksInformation> booksInformations = booksInformationRepository.findAll();

        for(BooksInformation booksInformation1 : booksInformations)
        {
            if(booksInformation1.getIsbn().equals(booksInformation.getIsbn()))
            {
                return booksInformation1;
            }
        }

        return null;
    }

    @Override
    public String updateBooksInfromation(BooksInformation booksInformation, Long id) {

        BooksInformation booksInformation1 = booksInformationRepository.getReferenceById(id);

        if(booksInformation1 == null)
        {
            return "Book is not exist";
        }

        if((long)booksInformation.getStock() != (long)(booksInformation1.getStock()))
        {
            if(booksInformation1.getStock() < booksInformation.getStock())
            {
                List<Books> books = booksInformation1.getBooks();

                for(int i=0; i < booksInformation.getStock()-booksInformation1.getStock(); ++i)
                {
                    Books book = new Books();
                    book.setBooksInformation(booksInformation1);

                    books.add(book);
                }

                booksInformation.setBooks(books);
            }
        }

        booksInformationRepository.save(booksInformation);

        return "Book is successfully Updated";
    }
}
