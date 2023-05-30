import SigninRequestModel from "../models/auth/SigninRequestModel";
import SigninResponseModel from "../models/auth/SigninResponseModel";
import SignupRequestModel from "../models/auth/SignupRequestModel";
import {useState} from "react";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  async login(signinRequest: SigninRequestModel) {
    console.log(API_URL)
    const url = `${API_URL}/api/auth/signin`;



    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinRequest)
    };


    const signinResponse = await fetch(url, requestOptions);
    if(!signinResponse.ok){
      throw new Error(signinResponse.statusText);
    }

    const signinResponseJson = await signinResponse.json();

    const signinData = new SigninResponseModel (
      signinResponseJson.token,
      signinResponseJson.type,
      signinResponseJson.id,
      signinResponseJson.username,
      signinResponseJson.email,
      signinResponseJson.roles
    );

    if (signinData.token) {
      localStorage.setItem("user", JSON.stringify(signinData));
    }

    return signinData;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(name: string, cpf: string, email: string, password: string){
    const url = `${API_URL}/api/auth/signup`;

    const signupRequest = new SignupRequestModel(
      name,
      cpf,
      email,
      password,
      ["user"]
    );

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupRequest)
    }

    const signupResponse = await fetch(url, requestOptions);
    if(!signupResponse.ok){
      throw new Error(signupResponse.statusText);
    }

    return signupResponse;
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }


}

export default new AuthService();