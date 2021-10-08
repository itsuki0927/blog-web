import { CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export enum PublishState {
  Draft = 0, // 草稿
  Published = 1, // 已发布
  Recycle = 2, // 回收站
}

const publishStateMap = new Map(
  [
    { id: PublishState.Draft, name: '草稿', icon: <EditOutlined />, color: 'orange' },
    { id: PublishState.Published, name: '已发布', icon: <CheckOutlined />, color: 'green' },
    { id: PublishState.Recycle, name: '回收站', icon: <DeleteOutlined />, color: 'red' },
  ].map(item => [item.id, item])
);

export const ps = (state: PublishState) => publishStateMap.get(state)!;

export const publishStates = Array.from<ReturnType<typeof ps>>(publishStateMap.values());
