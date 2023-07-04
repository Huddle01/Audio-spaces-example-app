import { BasicIcons } from "@/assets/BasicIcons";
import Peers from "./Peers/Peers";

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
    headerData: "Peers",
    component: <Peers />,
  },
};

export default ViewComponent;
