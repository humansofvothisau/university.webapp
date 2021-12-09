import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from "react";

type Props = {
  setStudentCode: React.Dispatch<React.SetStateAction<string>>;
};

const FormSBD: React.FC<Props> = ({ setStudentCode }) => {
  const { sm } = useBreakpoint();

  const onFinish = (values: any) => {
    setStudentCode(values.studentCode);
  };
  return (
    <Form
      name="sbd-search"
      onFinish={onFinish}
      layout={sm ? "inline" : "vertical"}
    >
      <Form.Item
        label="Số báo danh"
        name="studentCode"
        rules={[
          {
            required: true,
            message: "Điền số báo danh của bạn vào để tra cứu!",
          },
        ]}
        style={!sm ? { marginBottom: "10px" } : {}}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          Tra cứu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSBD;
