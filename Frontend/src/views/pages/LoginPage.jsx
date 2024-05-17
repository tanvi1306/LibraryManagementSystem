import { useContext, useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import LoginContext from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button } from 'flowbite-react';

const LoginPage = () => {


    console.log('InLoginPage');
    const navigate = useNavigate();
    const {setUseremail, setAdminemail,setIsLogin,setIsUserLogin} = useContext(LoginContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);

    const [showPass, setShowPass] = useState(false);
    
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(newEmail);
        
        setIsValidEmail(isValid);
      };

    const checkdetail = async () => {

        if(!isValidEmail)
        {
            toast.error("Please enter valid email");
            return;
        }

        if(password === "")
        {
            toast.error("Please enter password");
            return;
        }
        
        const obj = {
            email : email,
            password :password,
        }

        try
        {
            let url;
            if(email==="admin@gmail.com")
            {
                url = 'http://localhost:8081' + `/user/adminlogin`;
            }
            else{
                url = 'http://localhost:8081' + `/user/userlogin`

            }
            const response = await axios.post(url,obj);

            if(response.data === "Admin Successfully Login")
            {
                toast.success("Admin Successfully Login")
                setAdminemail(email);
                setIsLogin(true);
                localStorage.setItem("ADMIN_EMAIL", email);
                navigate("/dashboard");
            }
            else if(response.data.responseData === "User Successfully Login")
            {
                toast.success("User Successfully Login");
                setUseremail(email);
                localStorage.setItem("userId",response.data.uid)
                setIsUserLogin(true);
                localStorage.setItem("USER_EMAIL",email);
                navigate("/dashboard");
            }
            else{
                toast.error(response.data);
                return;
            }
        }
        catch(error)
        {
            console.log(error);
        }

    }


    return (
        <>
            <section className="text-gray-600 body-font h-full flex bg-[url('./loginbg.jpg')] bg-cover bg-center">


                <div className="w-full lg:px-20 py-24 mx-auto flex flex-wrap items-center " style={{
                    background: 'linear-gradient(to bottom right, rgba(0,0,0,0.1), rgba(0,0,0,0.7))',
                }}>
                    <div className="lg:w-1/2 md:w-1/2 md:pr-16">
                        <h1 className="title-font font-extralight text-[3rem] text-white">Journey Through Pages, Explore Through Books.</h1>
                        <p className="leading-relaxed mt-4 text-white text-lg"> Libraries serve as knowledge hubs, providing access to a vast array of information and resources.Libraries offer a variety of learning opportunities, from educational programs to workshops, supporting lifelong learning.</p>
                    </div>
                    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 className="text-gray-900 text-2xl font-medium title-font mb-5">Login</h2>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600 ml-1">Email *</label>
                            <input type="email" id="email" name="email" value={email} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => {
                                handleEmailChange(e);
                            }}  />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600 ml-1">Password *</label>


                            <div>
                                <div className="absolute inset-y-0 end-0 flex items-center ps-3.5 top-7 right-4">

                                    <button type='button' className='cursor-pointer text-lg' onClick={() => { setShowPass(!showPass) }}>

                                        {
                                            showPass ? <IoEyeOffOutline /> : <IoEyeOutline />
                                        }
                                    </button>
                                </div>
                                <input type={showPass ? "text" : "password"} id="password" name="password" value={password} className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out pr-12" 
                                onChange={(e) => {
                                    e.preventDefault();
                                    setPassword(e.target.value);
                                }}
                                 />


                            </div>

                        </div>
                        <button className="text-white bg-yellow-400 border-0 py-2 px-8 mt-2 focus:outline-none hover:bg-yellow-500 rounded text-lg" onClick={() => {
                            checkdetail();
                        }}>Login</button>
                        <p className="text-xs text-gray-500 mt-3">Literally you probably haven&apost heard of them jean shorts.</p>
                    </div>
                </div>

            </section>
        </>
    )
}

export default LoginPage