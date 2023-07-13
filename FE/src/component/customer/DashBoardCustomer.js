import SalesHeader from "./header/Header";
import HeaderMenu from "./menu/Menu";

const DashBoardCustomer = ({ children }) => {
  return (
    <div>
      <div>
        <SalesHeader />
      </div>
      <div>
        <HeaderMenu />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashBoardCustomer;
