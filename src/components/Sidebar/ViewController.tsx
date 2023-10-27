import { BasicIcons } from '@/assets/BasicIcons';
import Peers from './Peers/Peers';
import Chat from '../Chat/Chat';

export type TViewComponent = {
  [key: string]: {
    icon: JSX.Element;
    headerData: string;
    component: JSX.Element;
  };
};

const ViewComponent: TViewComponent = {
  peers: {
    icon: BasicIcons.peers,
    headerData: 'Peers',
    component: <Peers />,
  },
  chat: {
    icon: BasicIcons.peers,
    headerData: 'Chat',
    component: <Chat />,
  },
};

export default ViewComponent;
