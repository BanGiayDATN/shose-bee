import { Link } from "react-router-dom";
import "./style-header.css"
import { FileSearchOutlined , ShoppingCartOutlined,UserOutlined,EnvironmentOutlined} from '@ant-design/icons';
function SalesHeader() {

    const fields =[
        {
            classIcon: "header-icon",
            icon: <FileSearchOutlined /> ,
            className: "title-header",
            title: "Tra cứu đơn hàng"
        },
        {
            classIcon: "header-icon",
            icon: <EnvironmentOutlined /> ,
            className: "title-header",
            title: "Tìm kiếm cửa hàng"
        },
        {
            classIcon: "header-icon",
            icon: <UserOutlined /> ,
            className: "title-header",
            title: "Đăng nhập"
        },
        // {
        //     classIcon: "header-icon",
        //     icon: <ShoppingCartOutlined /> ,
        //     className: "title-header",
        //     title: `Giỏ hàng (${1})`
        // },
       
    ]
    return (
        <div className="header">
           
           {fields.map((field,index) =>{
           return(
            <div key={index}>
                 <Link to="#" className={field.className}>
             <span className={field.classIcon}>{field.icon}</span>  
            {field.title}
            </Link>
           </div>
           )
           })}
         
        </div>
        
    );
}


export default SalesHeader;
