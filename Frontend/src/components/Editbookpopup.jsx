import React, { useEffect, useState,useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import BookContext from "../context/BookContext";

const Editbookpopup = ({ book }) => {

  const {getBooks} = useContext(BookContext);
  const [imageobj, setImageobj] = useState();
  const [image, setImage] = useState(book?.image);
  const [title, setTitle] = useState(book?.title);
  const [author, setAuthor] = useState(book?.author);
  const [isbn, setIsbn] = useState(book?.isbn);
  const [category, setCategory] = useState(book?.category);
  const [stock, setStock] = useState(book?.stock);
  const [available, setAvailable] = useState(book?.available);
  const [isUpload, setIsUpload] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "title":
        setTitle(value);
        break;

      case "author":
        setAuthor(value);
        break;

      case "isbn":
        setIsbn(value);
        break;

      case "available":
        setAvailable(value);
        break;

      case "stock":
        setStock(value);
        break;

      case "category":
        setCategory(value);
        break;
    }
  };

  const handleupdate = async (e) => {
    e.preventDefault();

    if (title === "") {
      toast.error("Please enter title of book.");
      return;
    }

    if (author === "") {
      toast.error("Please enter author of book.");
      return;
    }

    if (isbn === "") {
      toast.error("Please enter ISBN of book.");
      return;
    }

    if (isbn < 17 || isbn > 17) {
      toast.error("Please enter valid ISBN number.");
      return;
    }

    if (category === "") {
      toast.error("Please enter category of book.");
      return;
    }

    if (stock === 0) {
      toast.error("Please enter stock of book.");
      return;
    }

    if (available === 0) {
      toast.error("Please enter number of available book.");
      return;
    }

    if (available > stock) {
      toast.error("Available book is not more than stock");
      return;
    }

    if (image === null || image === undefined || image === "") {
      toast.error("Please upload image.");
      return;
    }

    if (stock < book?.stock) {
      toast.error("Please enter stock greater than current stock");
      return;
    }

    if (available < book?.available) {
      toast.error(
        "Please enter available books greater than current available books"
      );
      return;
    }

    if(stock !== book?.stock && available === book?.available && stock-book.stock === available-book.available)
    {
      toast.error("Please change stock and available book accordingly");
      return;
    }

    setIsUpload(true);

    let url = image;
    if (imageobj !== undefined) {
      const data = new FormData();
      data.append("file", imageobj);
      data.append("upload_preset", "BookWise");
      data.append("cloud_name", "dne1ksr0y");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dne1ksr0y/image/upload",
          data
        );

        url = res.data.url;
      } catch (error) {
        console.log(error);
      }
    }

    const obj = {
      id : book?.id,
      author: author,
      available: available,
      category: category,
      image: url,
      isbn: isbn,
      stock: stock,
      title: title,
      books: book?.books,
    };

    console.log(obj);

    try {
      const response = await axios.put(
        'http://localhost:8081' + `/book/updatebook/${book?.id}`,
        obj
      );

      if (response.data === "Book is successfully Updated") {
        await getBooks();
        toast.success(response.data);
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.log(error);
    }

    setIsUpload(false);

  };

  return (
    <div
      id={`static-modal${book?.isbn}` + "1"}
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Update book detail
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide={`static-modal${book?.isbn}` + "1"}
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
            {isUpload ? (
              <div
                role="status"
                className="flex justify-center my-10 flex-col items-center gap-2"
              >
                <svg
                  aria-hidden="true"
                  className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
                <p className="text-lg tracking-widest">
                  Date was Uploading..........
                </p>
              </div>
            ) : (
              <form className="text-lg text-left">
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="text-gray-500 dark:text-gray-200"
                      htmlFor="title"
                    >
                      Book title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div>
                    <label
                      className="text-gray-500 dark:text-gray-200"
                      htmlFor="author"
                    >
                      Author Name *
                    </label>
                    <input
                      id="author"
                      type="text"
                      name="author"
                      value={author}
                      className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div>
                    <label
                      className="text-gray-500 dark:text-gray-200"
                      htmlFor="isbn"
                    >
                      ISBN No. *
                    </label>
                    <input
                      id="isbn"
                      type="text"
                      name="isbn"
                      value={isbn}
                      className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div>
                    <label
                      className="text-gray-500 dark:text-gray-200"
                      htmlFor="category"
                    >
                      Category *
                    </label>
                    <input
                      id="category"
                      type="text"
                      name="category"
                      value={category}
                      className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div>
                    <label
                      className="text-gray-500 dark:text-gray-200"
                      htmlFor="stock"
                    >
                      Book Stock *
                    </label>
                    <input
                      id="stock"
                      type="number"
                      name="stock"
                      value={stock}
                      className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-500 dark:text-gray-200"
                      htmlFor="available"
                    >
                      Available Stock *
                    </label>
                    <input
                      id="available"
                      type="number"
                      name="available"
                      value={available}
                      className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div>
                    <label className="block text-basic font-normal text-gray-500">
                      Image *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {imageobj ? (
                          <img src={URL.createObjectURL(imageobj)} alt="" />
                        ) : (
                          <img src={image} alt="book image" />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span className="">Upload a file</span>

                            <input
                              className="hidden"
                              aria-describedby="user_avatar_help"
                              id="file-upload"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                setImageobj(e.target.files[0]);
                              }}
                            />
                          </label>
                          <p className="pl-1 text-gray-400">or drag and drop</p>
                        </div>

                        <p className="text-gray-500">{image && image.name}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-6 p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-gray-600 w-60"
                    onClick={handleupdate}
                  >
                    {" "}
                    <span className="text-lg"></span> Update book
                  </button>
                  <button
                    data-modal-hide={`static-modal${book?.isbn}` + "1"}
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancle
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editbookpopup;
