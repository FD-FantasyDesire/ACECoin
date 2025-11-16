import React from 'react';
import styles from './index.less';
import {BulbOutlined, FileTextOutlined} from '@ant-design/icons';
import homeJpeg from '@/pages/home/home.jpeg';
import {history} from 'umi';

const HomePage = () => {
    const navigateToBasicInfo = (pathname: string) => {
        localStorage.setItem('curpath', pathname);
        history.push('/'+pathname);
    };

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${homeJpeg})` }}>
          <div className={styles.title}>ACECoin数字货币投研平台</div>
            <div className={styles.menuGrid}>
                {/* 左上：基础信息管理 */}
                <div className={`${styles.menuItem} ${styles.topLeft}`}>
                    <button onClick={() => navigateToBasicInfo("basic-info")} className={styles.menuButton}>
                        <FileTextOutlined style={{ fontSize: '5rem' }} />
                        <div>基础信息管理</div>
                    </button>
                </div>

                {/* 中间：业务操作管理 */}
              {/*<div className={`${styles.menuItem} ${styles.center}`}>*/}
              {/*    <button onClick={() => navigateToBasicInfo("warehouse-mng")} className={styles.menuButton}>*/}
              {/*        <SettingOutlined style={{ fontSize: '6rem' }} />*/}
              {/*        <div>业务操作管理</div>*/}
              {/*    </button>*/}
              {/*</div>*/}

                {/* 右上：可视化查询管理 */}
              {/*<div className={`${styles.menuItem} ${styles.topRight}`}>*/}
              {/*    <button onClick={() => navigateToBasicInfo("warehouse-mng")} className={styles.menuButton}>*/}
              {/*        <TableOutlined style={{ fontSize: '5rem' }} />*/}
              {/*        <div>可视化查询管理</div>*/}
              {/*    </button>*/}
              {/*</div>*/}

                {/* 左下：智能化集成管理 */}
              {/*<div className={`${styles.menuItem} ${styles.bottomLeft}`}>*/}
              {/*    <button onClick={() => navigateToBasicInfo("warehouse-mng")} className={styles.menuButton}>*/}
              {/*        <UngroupOutlined style={{ fontSize: '5rem' }} />*/}
              {/*        <div>智能化集成管理</div>*/}
              {/*    </button>*/}
              {/*</div>*/}

                {/* 右下：预警报警管理 */}
                <div className={`${styles.menuItem} ${styles.bottomRight}`}>
                  <button onClick={() => navigateToBasicInfo("monitor")} className={styles.menuButton}>
                        <BulbOutlined style={{ fontSize: '5rem' }} />
                        <div>预警报警管理</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
