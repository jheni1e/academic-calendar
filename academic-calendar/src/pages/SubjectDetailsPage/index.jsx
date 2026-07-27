import BoschButton from "../../components/BoschButton";
import "./index.css";
import { useState, useEffect } from "react";
import { deleteData, getData } from '../../utils/apiBack';
import { useNavigate, useParams } from "react-router-dom";
import chevronLeft from "../../images/chevronLeft.png";
import deleteIcon from "../../images/deleteIcon.png";
import Dialog from "../../components/Dialog";
import { toastSuccess, toastError } from "../../components/BoschToast";

function SubjectDetails() {
    const { id } = useParams();
    const [subject, setSubject] = useState(null);
    const [instructors, setInstructors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        initUserInfo();
        loadInstructors();
        loadSubjectInfo();
    }, []);

    const initUserInfo = async () => {
        const edv = sessionStorage.getItem("user");

        if (!edv) {
            navigate("/login");
            return;
        }

        const user = await getData(`/user/edv/${edv}`);

        if (user.user.role === "APPRENTICE") {
            navigate("/unauthorized");
            return;
        }
    }

    const loadSubjectInfo = async () => {
        try {
            const data = await getData(`/subject/${id}`);

            setSubject(data);
        } catch (error) {
            toastError(`Erro: ${error.message}`)
        }
    };

    const loadInstructors = async () => {
        try {
            const data = await getData(`/subject/instructors/${id}`);

            setInstructors(data);
        } catch (error) {
            toastError(`Erro: ${error.message}`)
        }
    }

    const handleDelete = async (item) => {
        try {
            const response = await deleteData(`/subject/${subject.subject_id}/instructor/${item.instructor.user_id}`);
    
            if (!response) {
                toastError("Erro ao remover instrutor.");
                return;
            }

            toastSuccess("Instrutor removido com sucesso");
            loadInstructors();
        } catch (error) {
            toastError(`Erro: ${error.message}`);
        }
    };

    return (
        <>
            <div className="container-details-page">
                <div className="container-header">
                    <div className="title">
                        <img src={chevronLeft} style={{ "width": "30px", "height": "30px", "cursor": "pointer" }} onClick={() => navigate('/materias')} />
                        <h1>{subject?.name}</h1>

                        <BoschButton
                            text="+ Adicionar Instrutor"
                            type="secondary"
                            style={{ width: "250px" }}
                            onClick={() => setIsModalOpen(!isModalOpen)}
                        />
                    </div>
                </div>

                <div>
                    {instructors.map((item, index) => (
                        <div
                            key={item.instructor.id ?? index}
                            className="instructor-item"
                        >
                            <span>{item.instructor.name}</span>

                            <img
                                src={deleteIcon}
                                style={{ "width": "30px", "height": "30px", "cursor": "pointer" }}
                                onClick={() => handleDelete(item)}
                            />
                        </div>
                    ))}
                </div>
                {isModalOpen &&
                    <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar instrutor" type="instructor" />
                }
            </div>
        </>
    );
}

export default SubjectDetails;
