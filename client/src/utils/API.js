import Axios from "axios";

export default {
  testAPI(){
    return Axios.get("/api/user/test")
  },

  loginUser(email, password){
    return Axios.post("/api/user/login", {email, password})
  },

  signupUser(email, username, password){
    return Axios.post("/api/user/signup", {email, username, password})
  }
}