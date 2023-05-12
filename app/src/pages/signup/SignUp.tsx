import { Button, Form, Input, Typography, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import { getRequestUrl } from "../../utils";

const { Title } = Typography;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const res = await fetch(getRequestUrl(`/api/auth/signup`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ...values,
      }),
    }).then((res) => res.json());
    console.log(res);

    if(res) {
      message.success('注册成功，请登录');
      navigate('/signin');
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 50 }}>
          注册界面
        </Title>
        <Form
          name="login"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: "请输入邮箱" },
              // { pattern: /^1\d{10}$/, message: "手机3号格式错误！" },
            ]}
          >
            <Input placeholder="请输入邮箱" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: "请输入密码" },
              // { pattern: /^1\d{10}$/, message: "手机号格式错误！" },
            ]}
          >
            <Input
              placeholder="请输入密码"
              style={{ width: "100%" }}
              type="password"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default SignUp;
