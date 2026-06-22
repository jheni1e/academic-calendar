import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";

function Home() {
  return (
    <>
      <div style={{ outline: "none", minHeight: "100vh" }}>
        <div className="divTitle" />
        <div className="divCalendar">
          <MonthlyCalendar />
        </div>
      </div>
    </>
  );
}

export default Home;
