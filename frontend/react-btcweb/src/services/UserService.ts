import authHeader from "./AuthHeader";

const API_URL = process.env.REACT_APP_API_URL;

class UserService {
  async getPublicContent() {
    const url = `${API_URL}/all`;
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  }

  async getUserBoard() {
    const url = `${API_URL}/user`;
    const response = await fetch(url, {
      headers: authHeader()
    });
    if(!response.ok){
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  }

  async getModeratorBoard() {
    const url = `${API_URL}/mod`;
    const response = await fetch(url, {
      headers: authHeader()
    });
    if(!response.ok){
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  }

  async getAdminBoard() {
    const url = `${API_URL}/admin`;
    const response = await fetch(url, {
      headers: authHeader()
    });
    if(!response.ok){
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  }
}

export default new UserService();