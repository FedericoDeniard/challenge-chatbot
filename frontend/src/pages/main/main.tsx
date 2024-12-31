import { Chat } from "../../components/chat";
import "./main.css";

export const MainPage = () => {
  return (
    <div className="mainPage-container">
      <div className="mainPage-NavBar">
        <h1>SushiScript</h1>
      </div>
      <div className="mainPage-Content">
        <Chat />
      </div>
      <div className="mainPage-Footer"></div>
      <div className="mainPage-SideBar"></div>
      <div className="mainPage-Modal"></div>
    </div>
  );
};
