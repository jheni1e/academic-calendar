import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import './index.css';
import TextBox from '../../components/TextBox';
import BoschButton from '../../components/BoschButton';
import { getData, postData } from '../../utils/apiBack';
import { toastError, toastSuccess, toastWarning } from '../../components/BoschToast';

function Register() {
    const [edv, setEDV] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        initUserInfo();
    }, []);

    const initUserInfo = async () => {
        const edv = sessionStorage.getItem("user");
        const user = await getData(`/user/edv/${edv}`);

        if (user) {
            navigate("/home");
            return;
        }
    }

    const handleSave = async () => {
        try {
            if (password != confirmPassword) {
                toastWarning("As senhas devem ser iguais.");
                return;
            }

            const payload = {
                edv: parseInt(edv),
                name: name,
                birthdate: new Date(birthdate).toISOString(),
                password: password,
                role: "APPRENTICE"
            };

            const created = await postData("/user", payload);

            if (!created) {
                toastError("Falha ao se registrar.");
                return;
            }

            navigate("/login");
            toastSuccess("Registrado com sucesso!");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="divForm">
            <div className="formTitle">
                <h1 className="mainTitle">Crie sua conta</h1>
                <h3 className="mainSubtitle">Já tem uma conta? Faça <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/login")}>login</span>.</h3>
            </div>
            <div className="divInput">
                <h3 className="inputTitle">Nome:</h3>
                <TextBox placeholder="e.g.: João Silva" text={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="divInput">
                <h3 className="inputTitle">EDV:</h3>
                <TextBox placeholder="e.g.: 9290XXXX" text={edv} onChange={(e) => setEDV(e.target.value)} />
            </div>
            <div className="divInput">
                <h3 className="inputTitle">Data de nascimento:</h3>
                <TextBox placeholder="e.g.: XX/XX/XXXX" type="date" text={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
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
