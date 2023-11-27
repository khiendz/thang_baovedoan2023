import React from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { login, userService } from 'services';
import { useRouter } from 'next/router';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const FormLogin: React.FC<any> = (props: any) => {

  const router = useRouter();

  const onFinish = async (values: any) => {

    try {
      const result = await login(values.username, values.password);
      if (result && result.status == 200) 
      {
        props.onCancel()
      }

    } catch {

    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal 
      open={props?.open} 
      onCancel={props.onCancel}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: "Làm ơn nhập tên đăng nhập!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Làm ơn nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Lưu đăng nhập"
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormLogin;
