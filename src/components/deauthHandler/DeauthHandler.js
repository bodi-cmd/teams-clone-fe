import { useNavigate } from "react-router-dom"
import SessionStorage from "../../components/sessionStorage/SessionStorage.ts"


const DeauthHandler = () => {
const navigator = useNavigate();
const deauth = ()=>{
  SessionStorage().removeItem("user");
  SessionStorage().removeItem("auth");
    navigator("/login");
}
  return {deauth}
}

export default DeauthHandler