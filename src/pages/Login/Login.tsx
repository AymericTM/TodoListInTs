import axios from "axios";
import React, { useEffect, useRef, useState, useContext } from "react";
import { FormLogin } from "../../type";
import { request } from "../../Utils";
import { GlobalContext } from "../../Utils/Context/GlobalContext";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState<FormLogin>({
    email: "",
    password: "",
    remember: false,
  });
  const { updateGlobalContext } = useContext(GlobalContext);
  const onValueChange = (e: any, field: string) => {
    const text = e.target.value;
    setLoginInfo({ ...loginInfo, [field]: text });
  };
  const onFormSubmit = (e: any) => {
    e.preventDefault();

    let body: any = { ...loginInfo };
    body.remember = loginInfo.remember ? "yes" : "no";

    request("post", "/authentication/login", body).then((data) => {
      const token = data.token;
      localStorage.setItem("token", token);
      updateGlobalContext({ ...data, authenticated: true });
      console.log(data);
    });
  };
  return (
    <>
      <div className=" flex justify-center p-3">
        <form onSubmit={onFormSubmit}>
          <label className="block">
            <label className="text-gray-700 ">Email</label>
            <input
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="text"
              placeholder="Inserisci la tua email"
              value={loginInfo.email}
              onChange={(e) => onValueChange(e, "email")}
            ></input>{" "}
            <br />
          </label>
          <label className="block">
            <label className="text-gray-700">Password</label>
            <input
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={(e) => onValueChange(e, "password")}
            ></input>{" "}
            <br />
          </label>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded "
                type="checkbox"
                checked={loginInfo.remember}
                onClick={() =>
                  setLoginInfo({ ...loginInfo, remember: !loginInfo.remember })
                }
              ></input>
              <label className="ml-2 block text-sm text-gray-900">
                Rimani Loggato
              </label>
            </div>
          </div>
          <br />
          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
