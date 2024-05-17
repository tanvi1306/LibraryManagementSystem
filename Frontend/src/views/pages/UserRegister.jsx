import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import BookContext from "../../context/BookContext";

const UserRegister = () => {

  const {getIssuedBooks} = useContext(BookContext);

  const [userinfo, setUserinfo] = useState({
    name: null,
    email: null,
    password: null,
    isValidEmail: false,
  });

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const name1 = e.target.name;
    const value = e.target.value;

    if(name1 === 'email')
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);

        setUserinfo({
          ...userinfo,
          email: value,
          isValidEmail: isValid,
        });

        return;
    }

    setUserinfo({
      ...userinfo,
      [name1]: value,
    });
  };

  const handleuser = async (e) => {
    e.preventDefault();

    for (const key in userinfo) {
      if (userinfo[key] === null || userinfo[key] === "") {
        toast.error(`Please enter value of ${key} field`);
        return;
      }
    }

    if (!userinfo.isValidEmail) {
      toast.error("Please enter valid email");
      return;
    }

    if (userinfo.password.length < 8) {
      toast.error("Please enter atleast 8 lenght password");
      return;
    }

    const obj = {
      name: userinfo.name,
      email: userinfo.email,
      password: userinfo.password,
      role_id:2,
    };

    try {
      const response = await axios.post(
        'http://localhost:8081'+ `/user/userregister`,
        obj
      );

      if (response.data === "User register successfully") {
        toast.success(response.data,{closeOnClick:true});
        for (const key in userinfo) {
          userinfo[key] = null;

          if (key === "isValidEmail") userinfo[key] = false;
        }
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className=" mt-[5.5rem]">
        <section className="max-w-2xl p-6 mx-auto bg-white rounded-md shadow-lg border dark:bg-gray-800 sm:mt-40">
          <h1 className="text-3xl mb-10 font-bold text-gray-600 capitalize dark:text-white tracking-widest">
            REGISTER USER
          </h1>
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <div>
                <label
                  className="text-gray-500 dark:text-gray-200"
                  htmlFor="name"
                >
                  User Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userinfo.name}
                  className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label
                  className="text-gray-500 dark:text-gray-200"
                  htmlFor="email"
                >
                  User Email *
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={userinfo.email}
                  className="w-full mt-2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label
                  className="text-gray-500 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password *
                </label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 end-3 flex items-center ps-3.5 ">
                    <button
                      type="button"
                      className="cursor-pointer text-lg"
                      onClick={() => {
                        setShowPass(!showPass);
                      }}
                    >
                      {showPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    id="password"
                    name="password"
                    value={userinfo.password}
                    className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out pr-12"
                    onChange={(e) => {
                        handleChange(e);
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-gray-600 w-60"
                  onClick={handleuser}
                >
                  {" "}
                  <span className="text-lg"></span> Register User
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UserRegister;
