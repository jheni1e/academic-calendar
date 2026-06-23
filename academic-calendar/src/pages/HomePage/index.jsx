import MenuSideBar from "../../components/MenuSideBar";
import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";

function Home() {
  return (
    <>
      <div className="body">
        <MenuSideBar />
        <div className="content">
          <MonthlyCalendar />
        </div>
      </div>
    </>
  );
}

export default Home;
