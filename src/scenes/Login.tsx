import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";




export default function Login() {
    const navigate = useNavigate();
    const startGame = () => {
        navigate("/game");
    }
    return (
        <LoginForm startGame={startGame}/>
    );
}