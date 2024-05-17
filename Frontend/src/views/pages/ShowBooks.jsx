import { Fragment, useEffect, useState, useContext } from "react";
import BookContext from "../../context/BookContext";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaChevronDown, FaChevronRight,FaSearch  } from "react-icons/fa";
import { initFlowbite } from "flowbite";
import { toast } from "react-toastify";
import Confirmpopup from "../../components/Confirmpopup";
import Editbookpopup from "../../components/Editbookpopup";
import LoginContext from "../../context/LoginContext";

const ShowBooks = () => {
  const {isLogin} = useContext(LoginContext);
  const { Books, deletebook, deleteOnebook, getBooks, searchbook, SearchBooks} = useContext(BookContext);
  const [dropdown, setDropdown] = useState(-1);

  const [searchterm, SetSearchterm] = useState("");

  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);

  const showMoreBooks = () => {
    
    if (visible < Books.length) {
      setVisible((prevValue) => prevValue + 10);
    } else {
      setShow(false);
    }
  };


  useEffect(() => {
    initFlowbite();
  });

  useEffect(()=> {

      getBooks();
  },[])

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className=" mt-[5.5rem] ">

          <div className="flex my-5 justify-end gap-2 items-center">
          
          <p className="text-xl text-slate-500"><FaSearch/></p>
          <input type="text" className="bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-lg outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            placeholder='Search'
            onChange={(e) =>{
              SetSearchterm(e.target.value);
              searchbook(e.target.value);
            }}

                              />
          </div>

          <div className="overflow-x-scroll">
            <table>
              <thead className="bg-gray-800 text-white h-11">
                <tr className="text-lg">
                  <th className="w-40 px-2">ID</th>
                  <th className="w-40 px-2">Image</th>
                  <th className="w-40 px-2">Title</th>
                  <th className="w-40 px-2">Author</th>
                  <th className="w-40 px-2">Isbn</th>
                  <th className="w-40 px-2">Category</th>
                  <th className="w-40 px-2">Stock</th>
                  <th className="w-40 px-2">Available</th>
                  <th className="w-16 px-2"></th>
                  <th className="w-16 px-2"></th>
                  <th className="w-16 px-2"></th>
                </tr>
                <tr className="border border-slate-500" />
              </thead>

              <tbody className="items-center">
                {Books.length > 0 &&
                  (searchterm.length===0?Books:SearchBooks)?.slice(0, visible)?.map((book, index) => {
                    return (
                      <Fragment key={index+30}>
                        <tr
                          className={`text-center ${
                            index % 2 === 0 ? "bg-slate-50" : "bg-white"
                          }`}
                        >
                          <td className="w-40 px-2 text-nowrap">{book?.id}</td>
                          <td className="w-40 px-2 justify-center">
                            <img src={book?.image} alt="book image" />
                          </td>
                          <td className="w-40 px-2 text-nowrap">{book?.title}</td>
                          <td className="w-40 px-2 text-nowrap">{book?.author}</td>
                          <td className="w-40 px-2 text-nowrap">{book?.isbn}</td>
                          <td className="w-40 px-2 text-nowrap">{book?.category}</td>
                          <td className="w-40 px-2 text-nowrap">{book?.stock}</td>
                          <td className="w-40 px-2 text-nowrap">{book?.available}</td>
                          { isLogin && <td className="w-16 px-1 text-xl">
                            
                            <button
                              data-modal-target={`static-modal${book?.isbn}`+"1"}
                              data-modal-toggle={`static-modal${book?.isbn}`+"1"}
                              type="button"
                            >
                              <MdEdit className="cursor-pointer text-2xl" />                             
                            </button>

                            <Editbookpopup key={Math.random()} book={book} />
                          </td>}
                          {isLogin && <td className="w-16 px-1 text-xl">
                            <button
                              data-modal-target={`static-modal${book?.isbn}`}
                              data-modal-toggle={`static-modal${book?.isbn}`}
                              type="button"
                            >
                              <MdDelete className="cursor-pointer text-2xl" />
                            </button>

                            <Confirmpopup
                              key={Math.random()}
                              curele={{ bid: book?.isbn }}
                              message={`Are you sure you want to delete 
                                                ${book?.title} book ? All available and not available record also will be deleted.`}
                              deletemethod={() => deletebook(book?.id)}
                            />
                          </td>}
                          <td className="w-16 px-1">
                            {dropdown === index ? (
                              <FaChevronDown
                                className="text-xl cursor-pointer"
                                onClick={(e) => {
                                  if (dropdown === index) {
                                    setDropdown(() => -1);
                                  } else {
                                    setDropdown(() => index);
                                  }
                                }}
                              />
                            ) : (
                              <FaChevronRight
                                className="text-xl cursor-pointer"
                                onClick={(e) => {
                                  if (dropdown === index) {
                                    setDropdown(() => -1);
                                  } else {
                                    setDropdown(() => index);
                                  }
                                }}
                              />
                            )}
                          </td>
                        </tr>

                        {dropdown === index && (
                          <>
                            <br />
                            <tr>
                              <th></th>
                              <th></th>
                              <th className="w-40 px-2 text-lg">BookID</th>
                              <th></th>
                              <th className="w-40 px-2 text-lg">Status</th>
                              <th></th>
                              <th className="w-40 px-2"></th>
                            </tr>

                            {book?.books.map((curele, ind) => {
                              return (
                                <tr key={Math.random()} className="text-center">
                                  <td></td>
                                  <td></td>
                                  <td className="w-40 px-2 text-lg">
                                    {curele?.bid}
                                  </td>
                                  <td></td>
                                  <td
                                    className={`w-40 text-lg px-2 ${
                                      curele?.status === "available"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {curele?.status}
                                  </td>
                                  <td></td>
                                  {isLogin && <td className="w-40 px-2 text-xl">
                                    <button
                                      data-modal-target={`static-modal${curele?.bid}`}
                                      data-modal-toggle={`static-modal${curele?.bid}`}
                                      type="button"
                                      onClick={() => {
                                        if (curele?.status !== "available") {
                                          toast.error("Book is not available.");
                                        }
                                      }}
                                    >
                                      <MdDelete className="cursor-pointer text-2xl" />
                                    </button>

                                    {curele?.status === "available" && (
                                      <Confirmpopup
                                        key={Math.random()}
                                        curele={curele}
                                        message={`Are you sure you want to delete 
                                                ${book?.title} book which's book
                                                id is ${curele?.bid}?`}
                                        deletemethod={() =>
                                          deleteOnebook(curele?.bid, book?.id)
                                        }
                                      />
                                    )}
                                  </td> }
                                </tr>
                              );
                            })}

                            <br />
                          </>
                        )}
                      </Fragment>
                    );
                  })}
              </tbody>
            </table>

            <div
          className="justify-center"
          style={{
            display: show && (searchterm.length===0?Books:SearchBooks).length > 10 ? "flex" : "none",
          }}
        >
          <button onClick={showMoreBooks} className="text-white my-2 bg-slate-500 border p-2 rounded-md hover:bg-slate-700">View More</button>
        </div>

          </div>

          
        </div>
      </div>
    </>
  );
};

export default ShowBooks;