import { useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import SidebarProject from "../../../components/sidebar/SidebarProject";
import TableCategory from "./TableCategory";

const Category = () => {

  const categorys = useSelector((state) => state.category.categorys.value);

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
                <TableCategory rows={categorys} />
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;
