import "./index.css";

function NotFound() {
  return (
    <>
      <div style={{ outline: "none", minHeight: "100vh" }}>
        <div className="divMain">
          <h1 className="mainTitle">Página não encontrada ou você não tem permissão para visualizar.</h1>
          <div className="divNotFound" />
        </div>
      </div>
    </>
  );
}

export default NotFound;
