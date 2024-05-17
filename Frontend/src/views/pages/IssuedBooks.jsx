import React, { Fragment, useEffect, useState, useContext } from "react";
import BookContext from "../../context/BookContext";
import axios from "axios";
import { initFlowbite } from "flowbite";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import LoginContext from "../../context/LoginContext";

const IssuedBooks = () => {
  const {isUserLogin} = useContext(LoginContext);
  const { IssuedBooks, getIssuedBooks, searchIssuedbook, SearchIssueBooks, getUsers,paypenalty} = useContext(BookContext);

  const userId = localStorage.getItem("userId");
  const [searchterm, SetSearchterm] = useState("");
  const [searchissuedate, SetSearchissuedate] = useState("");
  const [searchreturndate, SetSearchreturndate] = useState("");

  const [visible, setVisible] = useState(15);
  const [show, setShow] = useState(true);

  const showMoreIssuedBooks = () => {
    if (visible < IssuedBooks.length) {
      setVisible((prevValue) => prevValue + 15);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    initFlowbite();
  });

  useEffect(() => {
    getIssuedBooks(userId);
  }, [userId]);

  const handlereturn = async (e, hid) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        'http://localhost:8081' + `/issue/returnbook/${hid}`
      );

      await getIssuedBooks(userId);
      toast.success(response.data);

      

    } catch (error) {
      console.log(error);
    }
  };

  const handlepenalty = async (e, hid) => {
    e.preventDefault();

    try {
      
      paypenalty(hid);
      const response = await axios.put(
        'http://localhost:8081' + `/issue/paypenalty/${hid}`
        );

      await getIssuedBooks(userId);
      toast.success(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className=" mt-[5.5rem]">

        <div className="flex justify-around lg:flex-row flex-col">

        <div className="flex my-5 justify-end gap-2 items-center">
          
          <p className="text-xl text-slate-500">Search IssueDate Base: </p>
          <input type="date" className="bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-lg outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            
            onChange={(e) =>{
              SetSearchissuedate(e.target.value.substring(0,10));
              searchIssuedbook(searchterm,e.target.value.substring(0,10),searchreturndate);
            }}

                              />
          </div>

          <div className="flex my-5 justify-end gap-2 items-center">
          
          <p className="text-xl text-slate-500">Search ReturnDate Base: </p>
          <input type="date" className="bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-lg outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            
            onChange={(e) =>{
              SetSearchreturndate(e.target.value.substring(0,10));
              searchIssuedbook(searchterm,searchissuedate,e.target.value.substring(0,10));
            }}

                              />
          </div>
       
        <div className="flex my-5 justify-end gap-2 items-center">
          
          <p className="text-xl text-slate-500"><FaSearch/></p>
          <input type="text" className="bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-lg outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            placeholder='Search'
            onChange={(e) =>{
              SetSearchterm(e.target.value);
              searchIssuedbook(e.target.value,searchissuedate,searchreturndate);
            }}

                              />
          </div>
          </div>
          <div className="overflow-x-scroll">
            <table>
              <thead className="bg-gray-800 text-white h-11">
                <tr className="text-lg">
                  <th className="w-40 px-2">HistoryId</th>
                  <th className="w-40 px-2">Bookname</th>
                  <th className="w-40 px-2">BookmainId</th>
                  <th className="w-40 px-2">BookId</th>
                  <th className="w-40 px-2">Username</th>
                  <th className="w-40 px-2">UserId</th>
                  <th className="w-40 px-2">IssueDate</th>
                  <th className="w-40 px-2">DueDate</th>
                  <th className="w-40 px-2">RetrunDate</th>
                  <th className="w-16 px-2">Penalty</th>
                  <th className="w-16 px-2"></th>
                </tr>
                <tr className="border border-slate-500" />
              </thead>

              <tbody className="items-center">
                {IssuedBooks.length > 0 &&
                  (searchterm.length!==0 || searchissuedate.length !== 0 || searchreturndate.length !== 0 ? SearchIssueBooks :IssuedBooks)?.slice(0, visible)?.map((obj, index) => {
                    return (
                      <Fragment key={index+30}>
                        <tr
                          className={`text-center ${
                            index % 2 === 0 ? "bg-slate-50" : "bg-white"
                          } h-16`}
                        >
                          <td className="w-40 px-2">{obj?.history?.hid}</td>
                          <td className="w-40 px-2">
                            {obj?.history?.bookname}
                          </td>
                          <td className="w-40 px-2">{obj?.history?.bookid}</td>
                          <td className="w-40 px-2">{obj?.book?.bid}</td>
                          <td className="w-40 px-2">{obj?.user?.name}</td>
                          <td className="w-40 px-2 ">{obj?.user?.uid}</td>
                          <td className="w-40 px-2 text-nowrap">
                            {obj?.history?.issue_date.substring(0, 10)}
                          </td>
                          <td className="w-40 px-2 text-nowrap">
                            {obj?.history?.due_date.substring(0, 10)}
                          </td>
                          <td className="w-40 px-2 text-nowrap">
                            { obj?.history?.return_date && obj?.history?.return_date
.substring(0, 10)}
                          </td>
                          <td className="w-40 px-2">&#x20b9; {obj?.history?.penalty}</td>
                          

                          <td>
                            {
                              obj?.history?.return_date !== null ?
                                  (obj?.history?.penalty !== 0 ?
                                <>

                                  <button
                              data-modal-target={`static-modal${obj?.history?.hid}1111000`}
                              data-modal-toggle={`static-modal${obj?.history?.hid}1111000`}
                              className='bg-blue-500 rounded-md h-10 w-20 text-white hover:bg-blue-600'
                              type="button"
                            >
                              Pay
                            </button>

                            <div
                              id={`static-modal${obj?.history?.hid}1111000`}
                              data-modal-backdrop="static"
                              tabIndex="-1"
                              aria-hidden="true"
                              className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                            >
                              <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                  <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                                  
                                    <button
                                      type="button"
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                      data-modal-hide={`static-modal${obj?.history?.hid}1111000`}
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                      </svg>
                                      <span className="sr-only">Close modal</span>
                                    </button>
                                  </div>

                                  <div className="p-4 md:p-5 space-y-2">
                                    <p>
                                      {obj?.user?.name} paid &#x20b9;{obj?.history?.penalty} amount
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-center p-4 md:p-5  border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                      data-modal-hide={`static-modal${obj?.history?.hid}1111000`}
                                      type="button"
                                      className='bg-blue-500 rounded-md h-10 w-20 text-white hover:bg-blue-600'
                                      onClick={(e) => {
                                        handlepenalty(e, obj?.history?.hid);
                                      }}
                                    >
                                      Pay
                                    </button>
                                    <button
                                      data-modal-hide={`static-modal${obj?.history?.hid}1111000`}
                                      type="button"
                                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-yellow-500 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                      Cancle
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                                  
                                </>
                                   : <></>)
                               : <>

                              {isUserLogin && <button
                              data-modal-target={`static-modal${obj?.history?.hid}`}
                              data-modal-toggle={`static-modal${obj?.history?.hid}`}
                              className='bg-yellow-400 rounded-md h-10 w-20 text-white hover:bg-yellow-500'
                              type="button"
                            >
                              Return
                            </button>}

                            <div
                              id={`static-modal${obj?.history?.hid}`}
                              data-modal-backdrop="static"
                              tabIndex="-1"
                              aria-hidden="true"
                              className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                            >
                              <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                  <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                                  
                                    <button
                                      type="button"
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                      data-modal-hide={`static-modal${obj?.history?.hid}`}
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                      </svg>
                                      <span className="sr-only">Close modal</span>
                                    </button>
                                  </div>

                                  <div className="p-4 md:p-5 space-y-4">
                                    <p>
                                      You are confirm {obj?.user?.name} return {obj?.history?.bookname} book today.
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                      data-modal-hide={`static-modal${obj?.history?.hid}`}
                                      type="button"
                                      className='bg-yellow-400 rounded-md h-10 w-20 text-white'
                                      onClick={(e) => {
                                handlereturn(e, obj?.history?.hid);
                              }}
                                    >
                                      Return
                                    </button>
                                    <button
                                      data-modal-hide={`static-modal${obj?.history?.hid}`}
                                      type="button"
                                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-yellow-500 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                      Cancle
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            

                            

                              </>
                            }

                            
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
              </tbody>
            </table>

            <div
          className="justify-center"
          style={{
            display: show && (searchterm.length!==0 || searchissuedate.length !== 0 || searchreturndate.length !== 0 ? SearchIssueBooks :IssuedBooks).length > 15 ? "flex" : "none",
          }}
        >
          <button onClick={showMoreIssuedBooks} className="text-white my-2 bg-slate-500 border p-2 rounded-md hover:bg-slate-700">View More</button>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssuedBooks;