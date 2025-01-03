"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginSuccess } from "../store/slices/authSlice";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { LuLock } from "react-icons/lu";
import { RiGlobalLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  //console.log(json)

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   let response = await fetch('api/auth', {
  //     method: "POST",
  //     body: JSON.stringify({
  //         email: email,
  //         password: password
  //     }),
  //     headers: {
  //         'Content-type': 'application/json'
  //     }
  // })

  // response = await response.json()

  // alert(JSON.stringify(response))
  // }

  const handleLogin = async (email: string, password: string) => {
    console.log(email);
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        setTimeout(() => {
          setLoading(false);
          setErrorMsg("Incorrect email or password.");
        }, 2000);

        return;
      }

      const data = await response.json();
      console.log(data.token.success);
      /*       if (!data.token.success) {
        console.log("invalid");
        
        setTimeout(() => {
          
          setLoading(false);
          setErrorMsg("Incorrect email or password.")
        }, 2000);
        return;
      } */
      //console.log(data);
      dispatch(
        loginSuccess({ token: data.token.token, restaurant: data.token.data })
      );
      //localStorage.setItem("authToken", data.token.token);

      // Redirect to another page (optional)
      router.push("/user/dashboard");
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        setLoading(false);
        setErrorMsg("Error occurred. Please try again.");
      }, 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="font-inter bg-[#f3f6fa] bg-[url('/builderbg.svg')] bg-cover bg-no-repeat h-[100vh] w-full text-my-black-950 relative">
      {loading && (
        <div className="absolute w-full h-full bg-[#616264]/15 left-0 top-0 z-10"></div>
      )}
      <nav className=" flex justify-between absolute w-full left-0 top-0  py-4 px-4 md:px-8">
        <div className="text-[1.1rem] font-semibold text-my-dark-900 tracking-wide">
          SmartMenu
        </div>
        <a
          href="https://smartmenu-app.vercel.app/"
          className="group flex items-center gap-[0.35rem] "
        >
          <RiGlobalLine className="text-[1.3rem] flex text-[#72879b]" />
          <p className="group-hover:underline text-[0.93rem] tracking-wide leading-none mt-[0.2rem] text-[#26394e]">
            SmartMenu Solution
          </p>
        </a>
      </nav>
      <div className="h-full px-[2rem] flex justify-center items-center">
        <div className="rounded-md w-full md:w-[500px] py-7 ">
          <h1 className="text-center font-semibold text-[1.5rem] text-[#26394e]">
            Sign In
          </h1>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="relative bg-white login-bg-shadow rounded-md  flex flex-col gap-4 px-7  py-9 mt-6 [&_.LOGIN-INPUT]:w-full [&_.LOGIN-INPUT]:py-[0.45rem] [&_.LOGIN-INPUT]:px-9 [&_.LOGIN-INPUT]:border [&_.LOGIN-INPUT]:border-my-dark-300 [&_.LOGIN-INPUT]:rounded-md [&_.LOGIN-INPUT]:text-[0.95rem]"
          >
            {loading && (
    
                <div className="z-[99] absolute w-[98%] h-1 top-0 left-[50%] translate-x-[-50%] bg-[#919396]/20">
                  <div className="z-[99] absolute w-0 h-full bg-[#5d99fd] login-form-loading-ani"></div>
                </div>
 
            )}

            <div>
              <p className="font-semibold  text-[#26394e] text-[1.1rem] tracking-wide">
                Welcome to SmartMenu Builder
              </p>
              <p className=" text-my-black-950 mt-1 text-[0.95rem]">
                Get started building your digital menu today.
              </p>
            </div>
            <hr></hr>
            <label className="relative mt-2">
              <input
                className="peer LOGIN-INPUT focus:outline-my-secondary-400 hover:bg-my-dark-50 focus-within:bg-white  hover:focus-within:bg-white "
                type="text"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
                disabled={loading}
              />
              <HiOutlineMail className="peer-focus:text-my-secondary-400 login-email-icon absolute left-3 top-[50%] translate-y-[-50%] text-[1.1rem] flex text-my-dark-600" />
            </label>
            <label className="relative">
              <input
                autoComplete="new-password"
                className="peer LOGIN-INPUT focus:outline-my-secondary-400 hover:bg-my-dark-50 focus-within:bg-white  hover:focus-within:bg-white "
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                name="password"
                disabled={loading}
              />
              <LuLock className="peer-focus:text-my-secondary-400 absolute left-3 top-[50%] translate-y-[-50%] text-[1.1rem] flex text-my-dark-600" />
            </label>
            <div className="flex justify-between text-[0.875rem] text-my-black-950 px-1">
              <label className=" flex gap-2">
                <input
                  className="rememberMeCheckbox"
                  type="checkbox"
                  checked={true}
                />
                Remember me
              </label>
              <p className="text-[#24a0ed] underline">Forgot Password?</p>
            </div>
            {errorMsg && (
              <div className="flex gap-2 items-center rounded-sm border border-[#fec9c9] bg-[#fec9c9] text-[#720000] py-[0.45rem] px-3 text-[0.9rem]">
                <div className="bg-[#fb3d55] rounded-full w-[1.2rem] h-[1.2rem] flex justify-center items-center">
                  <IoClose fill="#ffffff" className="text-[0.9rem] flex" />
                </div>

                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="mt-7 border border-[#4a65f0] bg-[#4a65f0] hover:bg-[#2f47d3]/90 hover:border-[#2f47d3]/90  rounded-md text-white py-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
