import React, { useEffect, useState } from "react";

const data = [
  {
    id: "1",
    name: "Jane",
    lastName: "Doe",
    age: "25"
  },
  {
    id: "2",
    name: "James",
    lastName: "Doe",
    age: "40"
  },
  {
    id: "3",
    name: "Alexa",
    lastName: "Doe",
    age: "27"
  },
  {
    id: "4",
    name: "Jane",
    lastName: "Brown",
    age: "40"
  }
];

export default function Fillter() {
  const [peopleInfo, setPeopleInfo] = useState({ sizes: [{}] });
  const [dataCheck, setData] = useState([])
  const toggleHandler = (e, item) => {
   
    if (e.target.checked) {
      console.log(item);
      const dataChecks  = dataCheck
      dataCheck.push(item)
      
      // var datas = peopleInfo.sizes;
      // datas.push(item)
      setPeopleInfo(dataChecks);
      console.log(dataChecks);
    } else {
      // remove from list
      console.log(typeof peopleInfo);
      if (typeof peopleInfo === 'object' && peopleInfo !== null) {
        var index = dataCheck.findIndex((people) => people.id !== item.id)
        var datas = dataCheck;
       
        datas.splice(index, 1)
        setPeopleInfo(
          datas
        );
        console.log(datas);
      }
    }

  };


  return (
    <div className="App">

{data.map((item, index) => (
  <div className="" key={index}>
    <input type="checkbox" name="" value={item} onChange={(e) => toggleHandler(e,item)} id="" /> {item.name}
  </div>
))}

    </div>
  );
}
