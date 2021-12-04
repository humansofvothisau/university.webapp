import { Alert, Button, Form, InputNumber, Select, Typography } from "antd";

import React, { useState } from "react";

import IThptData from "../../interfaces/IThptData";
import { calculateTHPT, TotNghiep } from "../../utils/calculationUtils";

const { Option } = Select;

type Props = {
  data: IThptData;
};

const initialResult: TotNghiep = {
  mark: 0.0,
  result: false,
};
const checkBelowOne = (data: Array<number | undefined>) => {
  return data.some((value) => {
    return value && value <= 1;
  });
};

const FormTotNghiep: React.FC<Props> = ({ data }) => {
  const [education, setEducation] = useState(data.ngoaiNgu ? "thpt" : "gdtx");
  const [isEducationInvalid, setIsEducationInvalid] = useState(false);
  const [result, setResult] = useState(initialResult);

  let checkList: Array<number | undefined> = [data.toan, data.nguVan];
  if (data.ngoaiNgu) {
    checkList.push(data.ngoaiNgu);
  }
  if (data.khtn) {
    checkList.push(data.vatLi, data.hoaHoc, data.sinhHoc);
  }
  if (data.khxh) {
    checkList.push(data.diaLi, data.lichSu, data.gdcd);
  }

  let isBelowOne = checkBelowOne(checkList);

  const MarkList = {
    KhuyenKhich: [0, 1, 1.5, 2, 2.5, 3, 3.5, 4],
    UuTien: [0, 0.25, 0.5, 0.75],
  };

  const handleEducationChange = (value: any) => {
    setIsEducationInvalid(false);
    if (value === "thpt" && !data.ngoaiNgu) {
      setIsEducationInvalid(true);
      return;
    }
    setEducation(value);
  };

  const onFinish = (values: any) => {
    const education = values.education;
    const average = values.dtb;
    const bonus = values.kk;
    const more = values.plus;
    const tohop = data.khtn ? data.khtn : data.khxh;
    var result = calculateTHPT(
      education,
      average,
      data.toan,
      data.nguVan,
      data.ngoaiNgu,
      tohop,
      bonus,
      more
    );

    setResult(result);
  };
  return (
    <>
      <h4>Tính điểm xét tốt nghiệp</h4>
      {isBelowOne ? (
        <Alert
          message={
            <>
              Xin chia buồn cùng bạn nhưng trong số các bài thi của bạn có ít
              nhất 1 bài thi <em>dưới 1 điểm</em> nên bạn đã{" "}
              <strong>rớt tốt nghiệp!</strong>
            </>
          }
          type="error"
        />
      ) : (
        <>
          <Form
            name="tot-nghiep-thpt"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              education: education,
              kk: "0",
              plus: "0",
            }}
          >
            <Form.Item
              label="Đối tượng"
              name="education"
              style={{ marginBottom: "10px" }}
            >
              <Select onChange={(value) => handleEducationChange(value)}>
                <Option value="thpt">Giáo dục THPT</Option>
                <Option value="gdtx">Giáo dục thường xuyên</Option>
              </Select>
            </Form.Item>
            {isEducationInvalid && (
              <Form.Item
                name="education-error"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <Alert
                  type="error"
                  message={
                    <span>
                      Bạn không có dữ liệu bài thi <strong>Ngoại ngữ</strong> do
                      đó đối tượng <em>Giáo dục THPT</em> không phù hợp!
                    </span>
                  }
                  style={{ marginTop: "10px" }}
                />
              </Form.Item>
            )}

            <Form.Item style={{ marginBottom: "10px" }}>
              <Typography.Paragraph>
                Toán: {data.toan}, Ngữ văn: {data.nguVan}
                {education === "thpt" ? `, Ngoại ngữ: ${data.ngoaiNgu}` : ``}
              </Typography.Paragraph>
              <Typography.Paragraph>
                Trung bình bài thi{" "}
                {data.khtn ? `KHTN: ${data.khtn}` : `KXH: ${data.khxh}`}
              </Typography.Paragraph>
            </Form.Item>
            <Form.Item
              name="dtb"
              label="Điểm trung bình lớp 12"
              rules={[
                {
                  required: true,
                  message: "Điền điểm trung bình lớp 12 vô bạn êii",
                },
              ]}
            >
              <InputNumber
                placeholder="8.4"
                min={0.0}
                max={10.0}
                decimalSeparator="."
                step={0.1}
              />
            </Form.Item>
            <Form.Item name="kk" label="Điểm khuyến khích">
              <Select>
                {MarkList.KhuyenKhich.map((value) => (
                  <Option value={value} key={`kk_${value}`}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="plus" label="Điểm ưu tiên">
              <Select>
                {MarkList.UuTien.map((value) => (
                  <Option value={value} key={`plus_${value}`}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                disabled={isEducationInvalid ? true : undefined}
                htmlType="submit"
              >
                Tính điểm
              </Button>
            </Form.Item>
          </Form>
          {result.mark !== 0.0 ? (
            result.result ? (
              <Alert
                type="success"
                message={
                  <>
                    Chúc mừng bạn đã <em>đậu tốt nghiệp</em>! Số điểm tốt nghiệp
                    của bạn là <strong>{result.mark}</strong>
                  </>
                }
              />
            ) : (
              <Alert
                type="error"
                message={
                  <>
                    Rất tiếc, bạn đã <em>rớt tốt nghiệp</em>, số điểm tốt nghiệp
                    của bạn là <strong>{result.mark}</strong>
                  </>
                }
              />
            )
          ) : (
            <> </>
          )}
        </>
      )}
    </>
  );
};

export default FormTotNghiep;
