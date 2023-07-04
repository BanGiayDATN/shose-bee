import { Select, Space } from "antd";

const Combox = ({ options, defaultValue, onChange,renderOptionLabel }) => {
  const handleChange = (value) => {
    console.log("Selected value:", value);
    if (onChange) {
      onChange(value);
    }
  };

  const renderSelectOptions = (optionsList) => {
    return optionsList.map((option) => (
      <Select.Option key={option.id} value={option.id}>
        {renderOptionLabel(option)}
      </Select.Option>
    ));
  };

  return (
    <Space wrap>
      <Select
        defaultValue={defaultValue}
        style={{ width: 200 }}
        onChange={handleChange}
      >
        {renderSelectOptions(options)}
      </Select>
    </Space>
  );
};

export default Combox;
