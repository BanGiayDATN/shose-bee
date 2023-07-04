import { useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import SidebarProject from "../../../components/sidebar/SidebarProject";

const Sole = () => {

  const soles = useSelector((state) => state.sole.soles.value);

  return (
    <div>
      <div className="home">
        <SidebarProject />
        <div className="homeContainer">
          <Navbar />
          <div className="container" style={{ marginTop: "20px" }}>
            <div className="row"></div>
            <div className="row">
                {/* hiển thị table */}
                {/* <TableCategory rows={soles} /> */}
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sole;
