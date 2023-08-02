import { Modal, Input, Select, Button, Form, Row, Col } from "antd";
import { useAppDispatch } from "../../../../app/hook";
import tinycolor from "tinycolor2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ColorApi } from "../../../../api/employee/color/Color.api";
import { SetColor } from "../../../../app/reducer/Color.reducer";

const AddColorModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const initialValues = {
    name: "",
    status: "DANG_SU_DUNG",
  };

  const [listColor, setListColor] = useState([]);

  const getColorName = (color) => {
    const colorObj = tinycolor(color);
    return colorObj.toName() || colorObj.toHexString();
  };

  const getList = () => {
    ColorApi.getAllCode().then((res) => {
      setListColor(res.data.data);
      dispatch(SetColor(res.data.data));
    });
  };

  useEffect(() => {
    getList();
  }, []);

  // Trong hàm handleOk, chúng ta gọi form.validateFields() để kiểm tra và lấy giá trị
  // hàm onCreate để xử lý dữ liệu
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có đồng ý thêm không?",
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk: () => resolve(values),
            onCancel: () => reject(),
          });
        });
      })
      .then((values) => {
        //   BrandApi.create(values)
        //     .then((res) => {
        //       dispatch(CreateBrand(res.data.data));
        //       toast.success("Thêm thành công");
        //       form.resetFields();
        //       onCancel();
        //     })
        //     .catch((error) => {
        //       toast.error("Thêm thất bại");
        //       console.log("Create failed:", error);
        //     });
      })
      .catch(() => {
        // Xử lý khi người dùng từ chối xác nhận
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setAddModalVisible(false);
    onCancel();
  };

  return (
    <>
      <Modal
        title="Chọn kích cỡ "
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 16,
          }}
        >
          <Button
            onClick={() => setAddModalVisible(true)}
            icon={<FontAwesomeIcon icon={faPlus} />}
          >
            Thêm kích thước
          </Button>
        </div>
        <Row gutter={[16, 16]}></Row>
      </Modal>

      <Modal
        title="Thêm màu sắc"
        visible={isAddModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Thêm
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" initialValues={initialValues}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Bảng màu"
                name="code"
                rules={[
                  { required: true, message: "Vui lòng nhập tên thương hiệu" },
                  { max: 50, message: "Tên thương hiệu tối đa 50 ký tự" },
                ]}
              >
                <Input
                  type="color"
                  style={{ height: "250px" }}
                  onChange={(e) => {
                    const maMau = e.target.value;
                    const tenMau = getColorName(maMau);
                    form.setFieldsValue({ name: tenMau }); // Cập nhật giá trị cho trường "Tên màu sắc"
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Mã màu sắc"
                name="code"
                rules={[
                  { required: true, message: "Vui lòng nhập mã màu" },
                  { max: 50, message: "Tên thương hiệu tối đa 50 ký tự" },
                ]}
              >
                <Input placeholder="Tên mã màu" style={{ height: "40px" }} />
              </Form.Item>
              <Form.Item
                label="Tên màu sắc"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên màu" },
                  { max: 50, message: "Tên thương hiệu tối đa 50 ký tự" },
                ]}
              >
                <Input placeholder="Tên màu sắc" style={{ height: "40px" }} />
              </Form.Item>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái" },
                ]}
              >
                <Select defaultValue="DANG_SU_DUNG">
                  <Select.Option value="DANG_SU_DUNG">
                    Đang sử dụng
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddColorModal;
