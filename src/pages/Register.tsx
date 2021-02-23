import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { FormRegister } from "../type";
import { request } from "../Utils";
import { GlobalContext } from "../Utils/Context/GlobalContext";
// nome cognome email psw pswConfirm tos
export default function Register() {
  const [userInfo, setUserInfo] = useState<FormRegister>({
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    tos: false,
  });
  const { updateGlobalContext } = useContext(GlobalContext);
  const onFormSubmit = (e: any) => {
    e.preventDefault();

    request("post", "/authentication/signup")
      .then((data) => {
        const token = data.token;
        localStorage.setItem("token", token);
        console.log(data);
        updateGlobalContext({ ...data, authenticated: true });
      })

      .catch((err) => {});
  };
  const onValueChange = (e: any, field: string) => {
    const text = e.target.value;
    setUserInfo({ ...userInfo, [field]: text });
  };
  return (
    <>
      <div>
        <form onSubmit={onFormSubmit}>
          <input
            required
            className="border"
            type="text"
            placeholder="inserisci nome"
            value={userInfo.name}
            onChange={(e) => onValueChange(e, "name")}
          ></input>
          <br />
          <input
            required
            className="border"
            type="text"
            placeholder="inserisci cognome"
            value={userInfo.surname}
            onChange={(e) => onValueChange(e, "surname")}
          ></input>
          <br />
          <input
            required
            className="border"
            type="text"
            placeholder="email insert"
            value={userInfo.email}
            onChange={(e) => onValueChange(e, "email")}
          ></input>{" "}
          <br />
          <input
            required
            className="border"
            type="password"
            placeholder="password"
            value={userInfo.password}
            onChange={(e) => onValueChange(e, "password")}
          ></input>{" "}
          <br />
          <input
            className="border"
            type="password"
            placeholder="password confirm"
            value={userInfo.passwordConfirm}
            onChange={(e) => onValueChange(e, "passwordConfirm")}
          ></input>
          <input
            type="checkbox"
            checked={userInfo.tos}
            onClick={() => setUserInfo({ ...userInfo, tos: !userInfo.tos })}
          ></input>
          <button className="bg-blue-400" type="submit">
            Registrati
          </button>
        </form>
      </div>
    </>
  );
}
