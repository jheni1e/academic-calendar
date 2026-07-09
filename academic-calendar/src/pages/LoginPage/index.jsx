import './index.css';
import { useState } from 'react';
import { useNavigate } from "react-router";
import TextBox from '../../components/TextBox';
import BoschButton from '../../components/BoschButton';
import boschImage from "../../images/bosch-renningen.jpg";
import { toastSuccess, toastError, toastWarning } from '../../components/BoschToast';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email || !password) {
            toastWarning("Preencha todos os campos.");
            return;
        }

        var payload = {
            email: email,
            password: password
        };

        //chamada de api para logar
    };

    return (
        <div className="divMain">
            <div className="divBackground"></div>

            <div className="divCard">
                <div className="divImage">
                    <img src={boschImage} alt="Bosch" />
                </div>

                <div className="divLogin">
                    <div className="formTitle">
                        <h1 className="mainTitle">Seja bem-vindo!</h1>
                    </div>

                    <div className="divInput">
                        <h3 className="inputTitle">Email</h3>
                        <TextBox placeholder="Insira seu email" type="email" text={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="divInput">
                        <h3 className="inputTitle">Senha</h3>
                        <TextBox type="password" placeholder="Digite sua senha" text={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="divButton">
                        <BoschButton type="primary" text="Entrar" onClick={handleLogin} />
                    </div>

                    <h3 className="subtitle">
                        Ainda não tem uma conta? Registre-se{" "}
                        <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/register")}>aqui</span>.
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Login;
