import Card from '@/components/Card';
import Loading from '@/components/Loading';
import { EyeOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useState } from 'react';
import styles from './style.module.scss';

const Item = () => {
  return (
    <div className={styles.item}>
      <Image src='http://resources.fivewoods.xyz/avatar.jpg' alt='cover' width={70} height={70} />
      <span className={styles.title}>title 1</span>
      <span className={styles.right}>
        <EyeOutlined style={{ marginRight: 5 }} />
        132
      </span>
    </div>
  );
};
const LeaderBoard = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Card title='排行榜' bodyStyle={{ padding: '12px 12px' }}>
      {loading ? '玩命敲代码中...' : <Item />}
    </Card>
  );
};

export default LeaderBoard;
