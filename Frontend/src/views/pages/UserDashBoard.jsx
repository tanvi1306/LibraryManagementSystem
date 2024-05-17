import { useState, useContext } from 'react'
import { FaUsers, FaBook, FaClock, FaSearch } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import BookContext from '../../context/BookContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  console.log('InDashBoard');

    const {IssuedBooks, SearchIssueBooks, totalbooks, issuedbooks, totalmembers, returnbooks, searchIssuedbook} = useContext(BookContext);
    const navigate = useNavigate();

    const [searchterm, SetSearchterm] = useState("");

    const [visible, setVisible] = useState(15);
    const [show, setShow] = useState(true);

    const showMoreIssuedBooks = () => {
        if (visible < IssuedBooks.length) {
          setVisible((prevValue) => prevValue + 15);
        } else {
          setShow(false);
        }
      };
 
  return (
   
    <div className="p-4 sm:ml-64"> 
      <div className="mt-[5.5rem]">

      <p className='ml-12 mt-28 text-4xl font-medium font-serif'>Welcome, User</p>
      
      {/* <div className="bg-white rounded-lg md:p-8 dark:bg-gray-800">
            <div className="grid grid-rows-4 lg:grid-rows-1 lg:grid-cols-4 mx-auto text-gray-900 dark:text-white m-8 gap-16 sm:flex-row flex-col w-full">
                <div className="flex flex-col items-center justify-center border shadow-md rounded-2xl hover:shadow-lg hover:transform hover:-translate-y-2 transition duration-300 ease-in-out md:h-72 h-56">
                  <FaUsers className='text-8xl mb-4' />
                    <p className="mb-2 text-4xl">{totalmembers}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xl font-thin">Total Members</p> 
                    
                </div>
                <div className="flex flex-col items-center justify-center border shadow-md rounded-2xl hover:shadow-lg hover:transform hover:-translate-y-2 transition duration-300 ease-in-out md:h-72 h-56">
                    <FaBook className='text-8xl mb-4'/>
                    <p className="mb-2 text-4xl">{totalbooks}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xl font-thin">Total Books</p>
                </div>
                <div className="flex flex-col items-center justify-center border shadow-md rounded-2xl hover:shadow-lg hover:transform hover:-translate-y-2 transition duration-300 ease-in-out md:h-72 h-56">
                    <FaClock className='text-8xl mb-4'/>
                    <p className="mb-2 text-4xl">{issuedbooks}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xl font-thin">Issue Books</p>
                </div>
                <div className="flex flex-col items-center justify-center border shadow-md rounded-2xl hover:shadow-lg hover:transform hover:-translate-y-2 transition duration-300 ease-in-out md:h-72 h-56">
                    <TiArrowBack className='text-8xl mb-4'/>
                    <p className="mb-2 text-4xl">{returnbooks}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xl font-thin">Return Books</p>
                </div>  
            </div>


            <div className="container mx-auto">
            <div className="flex">
                <div className="w-full">
                    <div className="bg-white border rounded-md p-6">
                        <div className='flex justify-between mb-6 flex-col lg:flex-row gap-3'>
                           <p className='font-semibold text-xl'>Recents Circulations</p>

                           
                <button
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200  bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-gray-600 w-56"
                    onClick={() => navigate("/addbook")}
                >
                  {" "}
                  <span className="text-lg">+ </span> Add new book
                </button>

                <button
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200  bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-gray-600 w-56"
                    onClick={() => navigate("/issuebook")}
                >
                  Issue new book
                </button>
           

                           <div className='flex gap-2 items-center'>
                              <p className='text-lg text-slate-500'><FaSearch /></p>
                              <input type="text" placeholder='Search' className="bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                onChange={(e) => {
                                    SetSearchterm(e.target.value);
                                    searchIssuedbook(e.target.value,"","");
                                }}
                              />
                           </div>
                        </div>
                        <div className="table-responsive overflow-x-scroll">
                            <table id="zero_config" className="table-auto w-full border-collapse border border-gray-300 bg-white rounded-t-xl">
                                <thead className="thead-dark bg-gray-800 text-white text-nowrap">
                                    <tr>
                                        
                                    <th className="w-40 py-2 px-2">Member Name</th>
                                        <th className="w-40 py-2 px-2">Book Title</th>
                                        <th className="w-40 py-2 px-2">Book ID</th>
                                        <th className="w-40 py-2 px-2">Issue Date</th>
                                        <th className="w-40 py-2 px-2">Due Date</th>
                                        <th className="w-40 py-2 px-2">Return Date</th>
                                    </tr>
                                </thead>
                                <tbody className='dark:bg-slate-50'>

                                    { IssuedBooks && 
                                        (searchterm.length === 0 ? IssuedBooks : SearchIssueBooks)?.slice(0, visible)?.map((issuedbook, index) => {
                                            return (
                                                <tr key={index} className={`text-center ${
                            index % 2 === 0 ? "bg-slate-50" : "bg-white"
                          } h-16`}>
                                                
                                                    <td className="py-2 px-2">{issuedbook?.user?.name}</td>
                                                    <td className="py-2 px-2">{issuedbook?.history?.bookname}</td>
                                                    <td className="py-2 px-2">{issuedbook?.book?.bid}</td>
                                                    <td className="py-2 px-2 text-nowrap">{issuedbook?.history?.issue_date.substring(0,10)}</td>
                                                    <td className="py-2 px-2 text-nowrap">{issuedbook?.history?.due_date.substring(0,10)}</td>

                                                    {
                                                        issuedbook?.history?.return_date==null ? <></> :  
                                                    <td className="py-2 px-2 text-nowrap">{issuedbook?.history?.return_date.substring(0,10)}</td>
                                                    }
                                                    
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>

                            <div
          className="justify-center"
          style={{
            display: show && (searchterm.length === 0 ? IssuedBooks : SearchIssueBooks).length > 15 ? "flex" : "none",
          }}
        >
          <button onClick={showMoreIssuedBooks} className="text-white my-2 bg-slate-500 border p-2 rounded-md hover:bg-slate-700">View More</button>
        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            
        

              
            </div> */}

        </div>
      </div>
   
  )
}

export default UserDashboard