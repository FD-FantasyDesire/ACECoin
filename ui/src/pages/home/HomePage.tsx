import React from "react";
import { 
  Avatar, Button, Card, Col, Dropdown, Layout, Menu, Row, Statistic, Typography 
} from "antd";
import { 
  FileSearchOutlined, MessageOutlined, PieChartOutlined, UserOutlined 
} from "@ant-design/icons";
import { history } from '@umijs/max';

const { Header, Content } = Layout;

// 定义快速入口项的类型
interface QuickEntryItem {
  title: string;
  icon: React.ReactElement;
  color: string;
  desc: string;
  path: string;
}

const HomePage: React.FC = () => {

  const menu = (
    <Menu>
      <Menu.Item key="profile">个人中心</Menu.Item>
      <Menu.Item key="settings">设置</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  // 处理快速入口点击事件
  const handleQuickEntryClick = (path: string): void => {
    history.push(path);
  };

  // 快速入口配置数据
  const quickEntries: QuickEntryItem[] = [
    {
      title: "消息列表",
      icon: <MessageOutlined />,
      color: "#1890ff",
      desc: "查看每日采集的市场消息",
      path: '/tool/gen/import'
    },
    {
      title: "持仓数据",
      icon: <PieChartOutlined />,
      color: "#52c41a",
      desc: "查看当前资产占比与历史变化",
      path: '/basic-info'
    },
    {
      title: "建议报告",
      icon: <FileSearchOutlined />,
      color: "#faad14",
      desc: "查看AI生成的持仓调整建议",
      path: '/tool'
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      {/* 顶部导航栏 */}
      <Header
        style={{
          background: "linear-gradient(90deg, #1890ff, #722ed1)",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <div>💎 ACECoin数字货币投研平台</div>
        <Dropdown overlay={menu} placement="bottomRight">
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <Avatar
              icon={<UserOutlined />}
              style={{ marginRight: "8px", backgroundColor: "#87d068" }}
            />
            <span>张三</span>
          </div>
        </Dropdown>
      </Header>

      {/* 内容区 */}
      <Content style={{ padding: "24px" }}>
        {/* 数据统计区 */}
        <Row gutter={16}>
          <Col span={8}>
            <Card
              bodyStyle={{ padding: "12px" }}
              style={{ borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              <Statistic
                title="未读消息数"
                value={12}
                prefix={<MessageOutlined />}
                valueStyle={{ fontSize: "18px", color: "#1890ff", fontWeight: "bold" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bodyStyle={{ padding: "12px" }}
              style={{ borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              <Statistic
                title="当前总资产估值 (USD)"
                value={10000000}
                precision={2}
                prefix={<Typography.Text style={{ fontSize: "18px", color: "#52c41a" }}>$</Typography.Text>}
                valueStyle={{ fontSize: "18px", color: "#52c41a", fontWeight: "bold" }}
              />
            </Card>
          </Col>
        </Row>

        {/* 快速入口区 */}
        <Row gutter={16} style={{ marginTop: "15px" }}>
          {quickEntries.map((item: QuickEntryItem, index: number) => (
            <Col span={6} key={index}>
              <Card
                hoverable
                bodyStyle={{ padding: "16px", minHeight: "75px" }}
                style={{
                  textAlign: "center",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                actions={[
                  <Button 
                    type="link" 
                    onClick={() => handleQuickEntryClick(item.path)}
                  >
                    进入
                  </Button>
                ]}
                title={item.title}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: `${item.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    style: { fontSize: "24px", color: item.color },
                  })}
                </div>
                <p style={{ marginTop: "6px", fontSize: "13px", color: "#555" }}>
                  {item.desc}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;