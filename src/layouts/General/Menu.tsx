import {
  BugFilled,
  FacebookFilled,
  FireFilled,
  GithubFilled,
  InfoCircleFilled,
  MenuOutlined,
  ReadFilled,
} from "@ant-design/icons";
import { Grid, Menu } from "antd";
import React from "react";
import {
  Link,
  RouteComponentProps,
  useHistory,
  withRouter,
} from "react-router-dom";

const { SubMenu } = Menu;

const { useBreakpoint } = Grid;

// Types
type Props = {
  inDrawer: boolean;
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const GeneralMenu: React.FC<Props & RouteComponentProps> = ({
  inDrawer,
  setDrawer,
}) => {
  const { md } = useBreakpoint();

  // Handle selected key
  const history = useHistory();
  let currentKey = history.location.pathname;
  if (currentKey === "/") {
    currentKey = "/home";
  }
  if (currentKey.includes("/university/")) {
    currentKey = "/university";
  }

  return (
    <Menu
      overflowedIndicator={<MenuOutlined />}
      theme="light"
      mode={md ? "horizontal" : "inline"}
      style={!md && !inDrawer ? { display: "none" } : { borderRight: "none" }}
      selectedKeys={[currentKey.slice(1)]}
    >
      <Menu.Item
        key="logo"
        className="logo"
        onClick={inDrawer ? () => setDrawer(false) : () => {}}
      >
        {/* <a href="https://humansofvothisau.com" target="_blank" rel="noreferrer">
          
        </a> */}
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/SiteLogo.png"}
            alt="ntranphongseBlog-logo"
          />
        </Link>
      </Menu.Item>

      <Menu.Item
        key="university"
        icon={<ReadFilled />}
        onClick={inDrawer ? () => setDrawer(false) : () => {}}
      >
        <Link to="/university">Tra cứu điểm chuẩn ĐH, CĐ</Link>
      </Menu.Item>
      <Menu.Item
        key="tot-nghiep-thpt"
        icon={<FireFilled />}
        onClick={inDrawer ? () => setDrawer(false) : () => {}}
      >
        <Link to="/tot-nghiep-thpt">Tra cứu điểm thi Tốt nghiệp THPT</Link>
      </Menu.Item>

      <SubMenu key="report" title="Báo cáo lỗi" icon={<BugFilled />}>
        <Menu.Item
          key="messenger"
          icon={<FacebookFilled />}
          onClick={inDrawer ? () => setDrawer(false) : () => {}}
        >
          <a
            href="https://www.m.me/HumansVTS/"
            target="_blank"
            rel="noreferrer"
          >
            Messenger
          </a>
        </Menu.Item>
        <Menu.Item
          key="github-issue"
          icon={<GithubFilled />}
          onClick={inDrawer ? () => setDrawer(false) : () => {}}
        >
          <a
            href="https://github.com/humansofvothisau"
            target="_blank"
            rel="noreferrer"
          >
            Github Issue
          </a>
        </Menu.Item>
      </SubMenu>

      <Menu.Item
        key="website"
        icon={<InfoCircleFilled />}
        onClick={inDrawer ? () => setDrawer(false) : () => {}}
      >
        <a href="https://humansofvothisau.com" target="_blank" rel="noreferrer">
          Website
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(GeneralMenu);
