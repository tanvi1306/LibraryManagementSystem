import axios from "axios";
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import BookContext from "../../context/BookContext";

const IssueBook = () => {

  const {getIssuedBooks} = useContext(BookContext);

  const [issuebookinfo, setIssuebookinfo] = useState({
    mainbookid: null,
    bookid: null,
    userid: null,
    duedate: null,
    issuedate: null,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setIssuebookinfo({
      ...issuebookinfo,
      [name] : value,
    });
  };

  const handleissuebook = async (e) => {
    e.preventDefault();

    for (const key in issuebookinfo) {
      if (issuebookinfo[key] === null || issuebookinfo[key] === "") {
        toast.error(`Please enter value of ${key} field`);
        return;
      }
    }

    const issueDateObj = new Date(issuebookinfo.issuedate);
    const dueDateObj = new Date(issuebookinfo.duedate);

    if (dueDateObj <= issueDateObj) {
      toast.error("Please enter valid duedate");
    }

    const obj = {      
        issue_date : issuebookinfo.issuedate,
        due_date : issuebookinfo.duedate  
    }

    try{

      const response = await axios.post('http://localhost:8081' + `/issue/bookissue/${issuebookinfo.mainbookid}/${issuebookinfo.bookid}/${issuebookinfo.userid}`, obj);
      
      if(response.data === "Book Successfully issue")
      {
        toast.success(response.data);
        for (const key in issuebookinfo) {
          issuebookinfo[key] = null;
        }
      }
      else{
        toast.error(response.data);
      }

    }
    catch(error)
    {
      console.log(error);
    }

  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className=" mt-[5.5rem]">
          <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-lg border dark:bg-gray-800 sm:mt-40">
            <h1 className="text-3xl mb-10 font-bold text-gray-600 capitalize dark:text-white tracking-widest">
              ISSUE BOOK
            </h1>
            <form>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    className="text-gray-500 dark:text-gray-200"
                    htmlFor="mainbookid"
                  >
                    Main Book Id *
                  </label>
                  <input
                    type="number"
                    id="mainbookid"
                    name="mainbookid"
                    value={issuebookinfo.mainbookid}
                    className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <label
                    className="text-gray-500 dark:text-gray-200"
                    htmlFor="bookid"
                  >
                    Book Id *
                  </label>
                  <input
                    id="bookid"
                    type="number"
                    name="bookid"
                    value={issuebookinfo.bookid}
                    className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <label
                    className="text-gray-500 dark:text-gray-200"
                    htmlFor="userid"
                  >
                    User Id *
                  </label>
                  <input
                    id="userid"
                    type="number"
                    name="userid"
                    value={issuebookinfo.userid}
                    className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <label
                    className="text-gray-500 dark:text-gray-200"
                    htmlFor="issuedate"
                  >
                    IssueDate *
                  </label>
                  <input
                    id="issuedate"
                    type="date"
                    name="issuedate"
                    value={issuebookinfo.issuedate}
                    className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <label
                    className="text-gray-500 dark:text-gray-200"
                    htmlFor="duedate"
                  >
                    DueDate *
                  </label>
                  <input
                    id="duedate"
                    type="date"
                    name="duedate"
                    value={issuebookinfo.duedate}
                    className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-gray-600 w-60"
                  onClick={handleissuebook}
                >
                  {" "}
                  <span className="text-lg"></span> Issue new book
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default IssueBook;