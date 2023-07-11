import { useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import SidebarProject from "../../../components/sidebar/SidebarProject";
import TableBrand from "./TableBrand";

const Brand = () => {

  const brands = useSelector((state) => state.brand.brands.value);

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
                <TableBrand  rows={brands} />
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Brand;
