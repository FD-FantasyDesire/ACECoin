import React from "react";
import {
  Avatar, Button, Card, Col, Dropdown, Layout, Menu, Row, Statistic, Typography, Tag
} from "antd";
import {
  FileSearchOutlined, MessageOutlined, PieChartOutlined, UserOutlined,
  ArrowUpOutlined, ArrowDownOutlined, DollarCircleOutlined,
  LineChartOutlined, FundOutlined, GoldOutlined, FireOutlined,
  RocketOutlined, CrownOutlined, SafetyCertificateOutlined,
  ThunderboltOutlined, StarOutlined, TrophyOutlined, BulbOutlined
} from "@ant-design/icons";
import { history } from '@umijs/max';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

// 定义快速入口项的类型
interface QuickEntryItem {
  title: string;
  icon: React.ReactElement;
  color: string;
  desc: string;
  path: string;
}

// 定义币种数据类型
interface CurrencyData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  icon: React.ReactElement;
  color: string;
}

// 自定义图标组件
const DiamondOutlined = () => <span style={{ fontSize: '18px' }}>◆</span>;
const SunOutlined = () => <span style={{ fontSize: '18px' }}>☀</span>;
const LinkOutlined = () => <span style={{ fontSize: '18px' }}>🔗</span>;

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
      path: '/messages'
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

  // 币种行情数据 - 扩展至15个币种
  const currencyData: CurrencyData[] = [
    {
      symbol: "BTC",
      name: "比特币",
      price: 45218.75,
      change24h: 1250.50,
      changePercent: 2.84,
      volume: 28563400000,
      marketCap: 886452000000,
      icon: <CrownOutlined />,
      color: "#f7931a"
    },
    {
      symbol: "ETH",
      name: "以太坊",
      price: 2385.60,
      change24h: 45.30,
      changePercent: 1.94,
      volume: 15678300000,
      marketCap: 286742000000,
      icon: <DiamondOutlined />,
      color: "#627eea"
    },
    {
      symbol: "BNB",
      name: "币安币",
      price: 312.45,
      change24h: -8.75,
      changePercent: -2.73,
      volume: 1256340000,
      marketCap: 47852000000,
      icon: <RocketOutlined />,
      color: "#f3ba2f"
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: 102.35,
      change24h: 5.25,
      changePercent: 5.41,
      volume: 2856340000,
      marketCap: 44215000000,
      icon: <SunOutlined />,
      color: "#00ffbd"
    },
    {
      symbol: "XRP",
      name: "瑞波币",
      price: 0.5732,
      change24h: 0.0125,
      changePercent: 2.23,
      volume: 1567830000,
      marketCap: 31245000000,
      icon: <ThunderboltOutlined />,
      color: "#23292f"
    },
    {
      symbol: "ADA",
      name: "卡尔达诺",
      price: 0.4923,
      change24h: -0.0234,
      changePercent: -4.54,
      volume: 452178000,
      marketCap: 17542000000,
      icon: <BulbOutlined />,
      color: "#0033ad"
    },
    {
      symbol: "AVAX",
      name: "Avalanche",
      price: 34.67,
      change24h: 1.23,
      changePercent: 3.68,
      volume: 785634000,
      marketCap: 13256000000,
      icon: <FireOutlined />,
      color: "#e84142"
    },
    {
      symbol: "DOT",
      name: "波卡币",
      price: 6.98,
      change24h: -0.34,
      changePercent: -4.65,
      volume: 325178000,
      marketCap: 8945000000,
      icon: <SafetyCertificateOutlined />,
      color: "#e6007a"
    },
    {
      symbol: "LINK",
      name: "Chainlink",
      price: 18.23,
      change24h: 0.45,
      changePercent: 2.53,
      volume: 485634000,
      marketCap: 10742000000,
      icon: <LinkOutlined />,
      color: "#2a5ada"
    },
    {
      symbol: "LTC",
      name: "莱特币",
      price: 71.85,
      change24h: 1.23,
      changePercent: 1.74,
      volume: 425178000,
      marketCap: 5321000000,
      icon: <GoldOutlined />,
      color: "#bfbbbb"
    },
    {
      symbol: "BCH",
      name: "比特币现金",
      price: 235.67,
      change24h: -5.23,
      changePercent: -2.17,
      volume: 325634000,
      marketCap: 4621000000,
      icon: <DollarCircleOutlined />,
      color: "#8dc351"
    },
    {
      symbol: "XLM",
      name: "恒星币",
      price: 0.1256,
      change24h: 0.0034,
      changePercent: 2.78,
      volume: 185178000,
      marketCap: 3421000000,
      icon: <StarOutlined />,
      color: "#14b6e7"
    },
    {
      symbol: "UNI",
      name: "Uniswap",
      price: 6.34,
      change24h: 0.23,
      changePercent: 3.76,
      volume: 285634000,
      marketCap: 4785000000,
      icon: <FundOutlined />,
      color: "#ff007a"
    },
    {
      symbol: "ATOM",
      name: "Cosmos",
      price: 9.87,
      change24h: -0.45,
      changePercent: -4.36,
      volume: 225178000,
      marketCap: 3621000000,
      icon: <TrophyOutlined />,
      color: "#2e3148"
    },
    {
      symbol: "ACE",
      name: "ACECoin",
      price: 15.75,
      change24h: 2.35,
      changePercent: 17.52,
      volume: 125000000,
      marketCap: 785000000,
      icon: <LineChartOutlined />,
      color: "#1890ff"
    }
  ];

  // 格式化数字
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num.toFixed(2);
  };

  // 获取涨跌幅颜色和图标
  const getChangeStyle = (change: number) => {
    if (change > 0) {
      return {
        color: '#f5222d',
        icon: <ArrowUpOutlined />,
        tagColor: 'red'
      };
    } else if (change < 0) {
      return {
        color: '#52c41a',
        icon: <ArrowDownOutlined />,
        tagColor: 'green'
      };
    }
    return {
      color: '#999',
      icon: null,
      tagColor: 'default'
    };
  };

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
                prefix="$"
                valueStyle={{ fontSize: "18px", color: "#52c41a", fontWeight: "bold" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bodyStyle={{ padding: "12px" }}
              style={{ borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              <Statistic
                title="今日收益"
                value={12500}
                precision={2}
                prefix="$"
                valueStyle={{ fontSize: "18px", color: "#f5222d", fontWeight: "bold" }}
                suffix={<ArrowUpOutlined style={{ color: '#f5222d' }} />}
              />
            </Card>
          </Col>
        </Row>

        {/* 快速入口区 */}
        <Row gutter={16} style={{ marginTop: "24px" }}>
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
                    key="enter"
                  >
                    进入
                  </Button>
                ]}
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
                <Title level={4} style={{ margin: '8px 0', fontSize: '16px' }}>
                  {item.title}
                </Title>
                <p style={{ marginTop: "6px", fontSize: "13px", color: "#555" }}>
                  {item.desc}
                </p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 币种行情展示区 */}
        <Card
          style={{
            marginTop: "24px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PieChartOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              <span>主要币种行情 (15种)</span>
            </div>
          }
          extra={<Button type="link">查看更多</Button>}
        >
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <Row gutter={[16, 16]}>
              {currencyData.map((currency, index) => {
                const changeStyle = getChangeStyle(currency.changePercent);
                return (
                  <Col span={24} key={index}>
                    <Card
                      size="small"
                      style={{ borderRadius: "8px" }}
                      bodyStyle={{ padding: "12px 16px" }}
                    >
                      <Row align="middle" gutter={16}>
                        <Col span={4}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                backgroundColor: `${currency.color}20`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "12px",
                              }}
                            >
                              {React.cloneElement(currency.icon, {
                                style: { fontSize: "18px", color: currency.color },
                              })}
                            </div>
                            <div>
                              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                {currency.symbol}
                              </div>
                              <div style={{ fontSize: '12px', color: '#999' }}>
                                {currency.name}
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col span={3}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                              ${currency.price < 1 ? currency.price.toFixed(4) : currency.price.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '12px', color: '#999' }}>
                              价格
                            </div>
                          </div>
                        </Col>

                        <Col span={3}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{
                              fontWeight: 'bold',
                              fontSize: '14px',
                              color: changeStyle.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {changeStyle.icon}
                              {Math.abs(currency.changePercent).toFixed(2)}%
                            </div>
                            <div style={{ fontSize: '12px', color: '#999' }}>
                              24h涨跌
                            </div>
                          </div>
                        </Col>

                        <Col span={3}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                              ${formatNumber(currency.change24h)}
                            </div>
                            <div style={{ fontSize: '12px', color: '#999' }}>
                              24h变化
                            </div>
                          </div>
                        </Col>

                        <Col span={4}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                              ${formatNumber(currency.volume)}
                            </div>
                            <div style={{ fontSize: '12px', color: '#999' }}>
                              交易量
                            </div>
                          </div>
                        </Col>

                        <Col span={4}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                              ${formatNumber(currency.marketCap)}
                            </div>
                            <div style={{ fontSize: '12px', color: '#999' }}>
                              市值
                            </div>
                          </div>
                        </Col>

                        <Col span={3}>
                          <Tag
                            color={changeStyle.tagColor}
                            style={{ margin: 0, width: '100%', textAlign: 'center' }}
                          >
                            {currency.changePercent > 0 ? '看涨' : currency.changePercent < 0 ? '看跌' : '平稳'}
                          </Tag>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default HomePage;
