// CurrencyMarket.tsx
import React from "react";
import { Card, Row, Col, Tag, Button } from "antd";
import { PieChartOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

// 定义币种数据类型
export interface CurrencyData {
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

interface CurrencyMarketProps {
  currencyData: CurrencyData[];
}

// 自定义图标组件
const DiamondOutlined = () => <span style={{ fontSize: '18px' }}>◆</span>;
const SunOutlined = () => <span style={{ fontSize: '18px' }}>☀</span>;
const LinkOutlined = () => <span style={{ fontSize: '18px' }}>🔗</span>;

const CurrencyMarket: React.FC<CurrencyMarketProps> = ({ currencyData }) => {
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
    <Card
      style={{
        marginTop: "24px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <PieChartOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          <span>主要币种行情 ({currencyData.length}种)</span>
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
  );
};

export default CurrencyMarket;
