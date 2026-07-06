import { useState } from 'react';
import { useNavigate } from "react-router";
import './index.css';
import TextBox from '../../components/TextBox';
import BoschButton from '../../components/BoschButton';

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSave = () => {
        var payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        //chamada de api para registrar
    };

    return (
        <div className="divForm">
            <div className="formTitle">
                <h1 className="mainTitle">Crie sua conta</h1>
                <h3 className="mainSubtitle">Já tem uma conta? Faça <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/login")}>login</span>.</h3>
            </div>
            <div className="divInput">
                <h3 className="inputTitle">Nome:</h3>
                <TextBox placeholder="e.g.: João" text={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="divInput">
                <h3 className="inputTitle">Sobrenome:</h3>
                <TextBox placeholder="e.g.: Silva" text={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="divInput">
                <h3 className="inputTitle">Email:</h3>
                <TextBox placeholder="e.g.: joao.silva@br.bosch.com" text={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="divInput">
                <h3 className="inputTitle">Senha:</h3>
                <TextBox type="password" placeholder="Digite sua senha" text={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="divInput">
                <h3 className="inputTitle">Confirme sua senha:</h3>
                <TextBox type="password" placeholder="Confirme sua senha" text={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="divButton">
                <BoschButton type="primary" text="Salvar" onClick={handleSave} />
            </div>
        </div>
    );
}

export default Register;
