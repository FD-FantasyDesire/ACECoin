import React, { useState, useEffect, useCallback } from 'react';
import { Table, Card, Select, DatePicker, Input, Row, Col, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { PieChartOutlined, FilterOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment'; // 导入 moment

// 定义消息类型接口
interface Message {
  id: number;
  coin_id: string;
  title: string;
  content: string;
  source: string;
  sentiment: '利好' | '利空' | '中性';
  created_at: string;
}

const MessagesList: React.FC = () => {
  // 状态管理
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredInfo, setFilteredInfo] = useState<Record<string, any>>({});
  const [sortedInfo, setSortedInfo] = useState<Record<string, any>>({});
  const [filters, setFilters] = useState({
    coinId: '',
    sentiment: '',
    dateRange: null,
    searchText: '',
  });

  // 模拟数据
  const mockData: Message[] = [
    {
      id: 1,
      coin_id: 'BTC',
      title: '比特币突破60000美元大关',
      content: '比特币价格再次突破60000美元关口，创下近期新高，市场情绪乐观。',
      source: 'CoinDesk',
      sentiment: '利好',
      created_at: '2024-05-01 10:30:00',
    },
    {
      id: 2,
      coin_id: 'ETH',
      title: '以太坊网络升级即将进行',
      content: '以太坊即将进行重要网络升级，预计将提高交易处理速度和降低费用。',
      source: 'CoinTelegraph',
      sentiment: '中性',
      created_at: '2024-05-01 09:15:00',
    },
    {
      id: 3,
      coin_id: 'SOL',
      title: 'Solana生态系统迎来新应用',
      content: '多个新应用加入Solana生态系统，进一步丰富了平台功能。',
      source: 'Solana News',
      sentiment: '利好',
      created_at: '2024-04-30 16:45:00',
    },
    {
      id: 4,
      coin_id: 'BTC',
      title: '监管机构发布加密货币新规定',
      content: '某国监管机构发布新的加密货币监管规定，市场反应谨慎。',
      source: 'Crypto Regulation',
      sentiment: '利空',
      created_at: '2024-04-30 14:20:00',
    },
    {
      id: 5,
      coin_id: 'USDT',
      title: 'Tether发行新一批USDT',
      content: 'Tether官方宣布发行新一批USDT稳定币，总量增加。',
      source: 'Tether Blog',
      sentiment: '中性',
      created_at: '2024-04-29 11:10:00',
    },
  ];

  // 模拟获取数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 实际项目中这里应该是API调用
        await new Promise(resolve => setTimeout(resolve, 500));
        setMessages(mockData);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 处理表格排序和筛选
  const handleChange = useCallback((pagination: any, filters: Record<string, any>, sorter: Record<string, any>) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  }, []);

  // 重置筛选条件
  const resetFilters = useCallback(() => {
    setFilteredInfo({});
    setSortedInfo({});
    setFilters({
      coinId: '',
      sentiment: '',
      dateRange: null,
      searchText: '',
    });
  }, []);

  // 筛选币种
  const handleCoinFilter = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, coinId: value }));
  }, []);

  // 筛选情感
  const handleSentimentFilter = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, sentiment: value }));
  }, []);



  // 搜索功能
  const handleSearch = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, searchText: value }));
  }, []);

  // 获取去重后的消息来源列表（添加 messages 依赖）
  const getUniqueSources = useCallback(() => {
    const sources = [...new Set(messages.map(item => item.source))];
    return sources.map(source => ({ text: source, value: source }));
  }, [messages]); // 依赖 messages

  // 根据筛选条件过滤数据
  const filteredMessages = React.useMemo(() => {
    return messages.filter(message => {
      // 币种筛选
      if (filters.coinId && message.coin_id !== filters.coinId) {
        return false;
      }
      
      // 情感筛选
      if (filters.sentiment && message.sentiment !== filters.sentiment) {
        return false;
      }
      
      // 关键词搜索
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        return (
          message.title.toLowerCase().includes(searchLower) ||
          message.content.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [messages, filters.coinId, filters.sentiment, filters.searchText]);

  // 表格列配置（使用动态生成的 sources 筛选）
  const columns: ColumnsType<Message> = [
    {
      title: '消息ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a: Message, b: Message) => a.id - b.id,
    },
    {
      title: '币种',
      dataIndex: 'coin_id',
      key: 'coin_id',
      width: 80,
      filters: [
        { text: 'BTC', value: 'BTC' },
        { text: 'ETH', value: 'ETH' },
        { text: 'SOL', value: 'SOL' },
        { text: 'USDT', value: 'USDT' },
      ],
      onFilter: (value: boolean | React.Key, record: Message) => record.coin_id === value,
      render: (text: string) => (
        <Tag color={text === 'BTC' ? 'blue' : text === 'ETH' ? 'purple' : text === 'SOL' ? 'green' : 'gray'}>
          {text}
        </Tag>
      ),
    },
    {
      title: '消息标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '消息内容摘要',
      dataIndex: 'content',
      key: 'content',
      ellipsis: { showTitle: true },
    },
    {
      title: '消息来源',
      dataIndex: 'source',
      key: 'source',
      filters: getUniqueSources(), // 使用动态生成的筛选选项
      onFilter: (value, record) => record.source === value,
    },
    {
      title: '消息情感',
      dataIndex: 'sentiment',
      key: 'sentiment',
      filters: [
        { text: '利好', value: '利好' },
        { text: '利空', value: '利空' },
        { text: '中性', value: '中性' },
      ],
      onFilter: (value, record) => record.sentiment === value,
      render: (text) => (
        <Tag color={text === '利好' ? 'green' : text === '利空' ? 'red' : 'gray'}>
          {text}
        </Tag>
      ),
    },
    {
      title: '消息采集时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 180,
      sorter: (a, b) => moment(a.created_at).diff(moment(b.created_at)), // 使用 moment 比较
    },
  ];

  return (
    <div style={{ padding: 24, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card
        title="消息列表"
        extra={
          <div>
            <Button type="text" icon={<PieChartOutlined />}>数据统计</Button>
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        {/* 筛选区域 */}
        <Row gutter={16} style={{ marginBottom: 16, alignItems: 'flex-end' }}>
          <Col span={4}>
            <label style={{ display: 'block', marginBottom: 8 }}>币种筛选</label>
            <Select
              placeholder="选择币种"
              allowClear
              style={{ width: '100%' }}
              value={filters.coinId}
              onChange={handleCoinFilter}
            >
              <Select.Option value="BTC">BTC</Select.Option>
              <Select.Option value="ETH">ETH</Select.Option>
              <Select.Option value="SOL">SOL</Select.Option>
              <Select.Option value="USDT">USDT</Select.Option>
            </Select>
          </Col>
          <Col span={4}>
            <label style={{ display: 'block', marginBottom: 8 }}>情感筛选</label>
            <Select
              placeholder="选择情感"
              allowClear
              style={{ width: '100%' }}
              value={filters.sentiment}
              onChange={handleSentimentFilter}
            >
              <Select.Option value="利好">利好</Select.Option>
              <Select.Option value="利空">利空</Select.Option>
              <Select.Option value="中性">中性</Select.Option>
            </Select>
          </Col>
          <Col span={8}>
            <label style={{ display: 'block', marginBottom: 8 }}>时间范围</label>
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              onChange={(_, dateStrings) => {
                // 仅记录日期字符串，避免Moment对象的类型问题
                setFilters(prev => ({ ...prev, dateRange: null }));
              }}
              placeholder={['开始日期', '结束日期']}
            />
          </Col>
          <Col span={6}>
            <label style={{ display: 'block', marginBottom: 8 }}>关键词搜索</label>
            <Input.Search
              placeholder="搜索标题或内容"
              allowClear
              enterButton="搜索"
              size="middle"
              value={filters.searchText}
              onChange={(e) => handleSearch(e.target.value)}
              onSearch={handleSearch}
            />
          </Col>
          <Col span={2}>
            <Button icon={<FilterOutlined />} onClick={resetFilters}>重置</Button>
          </Col>
        </Row>

        {/* 消息列表表格 */}
        <Table
          columns={columns}
          dataSource={filteredMessages}
          rowKey="id"
          loading={loading}
          onChange={handleChange}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条消息`,
          }}
          scroll={{ x: 1300 }}
        />
      </Card>
    </div>
  );
};

export default MessagesList;