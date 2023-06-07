import "./new.scss";
// import Sidebar from "./../../../sidebar/Sidebar";
// import Navbar from "./../../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const New = ({ inputs, title, onChangeForm, onSubmit }) => {


  return (
    <form>
      {inputs.map((input) => (
        <div className="formInput" key={input.id}>
          <label>{input.label}</label>
          <input type={input.type} name={input.label} placeholder={input.placeholder} onChange={onChangeForm} value={input.test} />
        </div>
      ))}
      <button onClick={onSubmit}>Send</button>
    </form>
  );
};

export default New;
