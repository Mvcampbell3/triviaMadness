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
  },

  checkAuth(){
    return Axios.get("/api/user/checkauth", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  },

  getAllGames(){
    return Axios.get("/api/game/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  },
  
  getGameByID(gameID) {
    return Axios.get(`api/game/playgame/${gameID}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  },

  gradeGame(gameID, userAnswers) {
    return Axios.post(`/api/game/gradegame/${gameID}`, {userAnswers}, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  },

  createNewGame(title, category, questions, correct){
    return Axios.post("/api/game/newgame", {
      title,
      category, 
      questions,
      correct
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }})
  }
}