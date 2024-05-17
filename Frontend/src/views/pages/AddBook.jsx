import axios from "axios";
import React, { useState ,useContext} from "react";
import { toast } from "react-toastify";
import BookContext from "../../context/BookContext";

const AddBook = () => {
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();
  const [available, setAvailable] = useState();
  const [isUpload, setIsUpload] = useState(false);

  const {getBooks} = useContext(BookContext);
  
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

  const addnewbook = async (e) => {
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

    if (image === null || image === undefined) {
      toast.error("Please upload image.");
      return;
    }

    setIsUpload(true);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "BookWise");
    data.append("cloud_name", "dne1ksr0y");

    let url;

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dne1ksr0y/image/upload",
        data
      );

      url = res.data.url;
    } catch (error) {
      console.log(error);
    }

    const obj = {
      author: author,
      available: available,
      category: category,
      image: url,
      isbn: isbn,
      stock: stock,
      title: title,
    };

    try {
      const response = await axios.post(
        'http://localhost:8081' + `/book/addbook`,
        obj
      );

      if (response.data === "Book sucessfully added") {
        setAuthor("");
        setTitle("");
        setAvailable(null);
        setImage(null);
        setStock(null);
        setCategory("");
        setIsbn("");
        toast.success(response.data);
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.log(error);
    }

    setIsUpload(false);
  };

  if (isUpload) {
    return (
      <>
        <div className="p-4 sm:ml-64">
          <div className=" mt-[5.5rem]">
            <div
              role="status"
              className="flex justify-center mt-80 flex-col items-center gap-2"
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
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className=" mt-[5.5rem]">
          <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-lg border dark:bg-gray-800 mt-20">
            <h1 className="text-3xl font-bold text-gray-600 capitalize dark:text-white tracking-widest">
              ADD BOOK
            </h1>
            <form>
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
                     {
                       image===null || image===undefined ? <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg> : <img src={URL.createObjectURL(image)} alt="book image" />
                     } 
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
                              setImage(e.target.files[0]);
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

              <div className="flex justify-end mt-6">
                <button
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-gray-600 w-60"
                  onClick={(e) => addnewbook(e)}
                >
                  {" "}
                  <span className="text-lg">+ </span> Add new book
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default AddBook;
