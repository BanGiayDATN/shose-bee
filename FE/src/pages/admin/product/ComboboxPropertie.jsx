import React, { useState } from 'react'
import { Dropdown, FormControl } from 'react-bootstrap';



const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="a"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));


// const CustomMenu2 = React.forwardRef(
//   ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
//     const [value, setValue] = useState("");

//     return (
//       <div
//         ref={ref}
//         style={style}
//         className={className}
//         aria-labelledby={labeledBy}
//       >
//         <ul className="list-unstyled">
//           {React.Children.toArray(children).filter(
//             (child) =>
//               !value || child.props.children.toLowerCase().startsWith(value)
//           )}
//         </ul>
//       </div>
//     );
//   }
// );

function ComboboxPropertie({item, CustomMenu, nameCombobox, onchange}) {
  const [value, setValue] = useState();
  const [name, setName] = useState(nameCombobox);
 
  const changValue = (event) => {
    
    // const index = item.findIndex(obj => (obj.id == val));
    // console.log(item[index]);
    // setName(item[index].name)
    // onchange(event)
    console.log(event);
  }

  return (
    <>
      <Dropdown onSelect={changValue} value={value}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
          <div className='form-select'> {name}</div>
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          {item.map(item => {
            return (
              <Dropdown.Item key={item.id} eventKey={item.id.toString()}>
                {item.name}
              </Dropdown.Item>
            );
          })}
          
        </Dropdown.Menu>
      </Dropdown>
      {/* */}
    </>
  )
}

export default ComboboxPropertie