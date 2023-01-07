import { CONFIG } from "../../config/app.config"
import SessionStorage from "../../components/sessionStorage/SessionStorage.ts";

const TokenProvider = () => {
    if(CONFIG.PRODUCTION){
        const storage = SessionStorage();
        return storage.getItem("auth");
    }

    return CONFIG.DEFAULT_TOKEN;

}

export default TokenProvider