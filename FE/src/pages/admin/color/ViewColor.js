import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import SidebarProject from "../../../components/sidebar/SidebarProject";
import TableColor from "./TableColor";
const Sole = () => {

    const color = useSelector((state) => state.sole.soles.value);
  
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
                  <TableColor rows={color} />
                  </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Sole;