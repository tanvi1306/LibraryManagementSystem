const Bookreducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":{
      return {
        ...state,
        isLoading: true,
      };
    }

    case "SET_API_DATA": {
      let Books = action.payload || []; // Set default value to empty array if payload is null or undefined
      let totalbooks = 0;
    
      if (Array.isArray(Books)) { // Check if Books is an array
        Books.forEach((ele) => { // Use forEach to iterate over array elements
          totalbooks += ele?.stock || 0; // Add stock value to totalbooks
        });
      }
    
      return {
        ...state,
        isLoading: false,
        Books,
        totalbooks,
      };
    }

    case "DELETE_BOOK_DATA":
    {
      let books = state?.Books.filter((book) => {
        return book.id !== action.payload;
      });

      return {
        ...state,
        Books: books,
      };
    }

    case "DELETE_ONE_BOOK":
    {
      let books1 = state?.Books.map((book) => {

        if(book?.id === action.payload.id)
        {
          book.available = book.available - 1;
          book.stock = book.stock - 1;
        }

        let book1 = book?.books.filter((ele) => {
          return ele.bid !== action.payload.bid;
        });

        book.books = book1;

        return book;
      });

      return {
        ...state,
        Books: books1,
      };
    }

    case "SET_ISSUED_DATA": {
      // Check if action.payload.issuedbook is an array
      if (!Array.isArray(action.payload.issuedbook)) {
        // Handle the case where issuedbook is not an array, for example, set it to an empty array
        action.payload.issuedbook = [];
      }
    
      // Calculate the number of issued books and the number of return books
      const issuedbooks = action.payload.issuedbook.length;
      let returnbooks = 0;
    
      // Use forEach to iterate over issuedbook array
      action.payload.issuedbook.forEach((book) => {
        // Check if return_date is not null for each book
        if (book.history.return_date !== null) {
          returnbooks++;
        }
      });
    
      return {
        ...state,
        IssuedBooks: action.payload.issuedbook,
        issuedbooks,
        returnbooks,
      };
    }
    

    case "SET_USER_DATA":
    {
      const totalmembers = action.payload.length;

      return {
        ...state,
        Members : action.payload,
        totalmembers,
      }

    }

    case "SEARCH_ISSUED_BOOK":
    {
      let SearchIssueBooks = [...state.IssuedBooks];

      if(action.payload.searchtext !== "")
      {
        SearchIssueBooks = SearchIssueBooks.filter((book1) => {
          return book1.user.name.toLowerCase().includes(action.payload.searchtext.toLowerCase()) || book1.history.bookname.toLowerCase().includes(action.payload.searchtext.toLowerCase()) || book1.book.bid.toString().toLowerCase().includes(action.payload.searchtext.toLowerCase());
        });

      }

      if(action.payload.searchdate !== "")
      {
        SearchIssueBooks = SearchIssueBooks?.filter((book1) => {
          return book1?.history?.issue_date?.substring(0,10) === (action.payload.searchdate);
        })
      }

      if(action.payload.searchreturndate !== "")
      {
        SearchIssueBooks = SearchIssueBooks?.filter((book1) => {
          return book1.history?.return_date?.substring(0,10) === (action.payload.searchreturndate);
        })
      }
      
      return {
        ...state,
        SearchIssueBooks,
      }

    }

    case "SEARCH_BOOK" :
    {
      let SearchBooks = state.Books.filter((book) => {
          return book.title.toLowerCase().includes(action.payload.toLowerCase()) || 
          book.author.toLowerCase().includes(action.payload.toLowerCase()) || 
          book.id.toString().toLowerCase().includes(action.payload.toLowerCase()) ||
          book.category.toLowerCase().includes(action.payload.toLowerCase());
      })

      return {
        ...state,
        SearchBooks,
      }
    }

    case "SEARCH_MEMBER" :
    {
      let SearchMembers = state.Members.filter((member) => {
        return member.uid.toString().includes(action.payload.toLowerCase()) ||
        member.name.toLowerCase().includes(action.payload.toLowerCase());
    })

      return {
        ...state,
        SearchMembers,
      }

    }

    case "PENALTY_PAYMENT" :
      {
        let Members = state?.Members ? [...state.Members] : [];
      
      Members = Members?.map((member) => {
        
          let penalty = 0;

          member.bookIssueHistories.map((history) => {
              if(history.hid === action.payload)
              {
                  penalty += history.penalty;
              }
          })

          member.total_penalty -= penalty;
          
          return member;
      })

      return {
        ...state,
        Members,
      }
    }
  }
};

export default Bookreducer;