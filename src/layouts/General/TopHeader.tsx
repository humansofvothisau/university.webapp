import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import GeneralMenu from "./Menu";

const TopHeader: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <Header style={{ background: "white" }}>
      <nav>
        <GeneralMenu inDrawer={false} />
        <MenuOutlined
          className="bars-menu"
          onClick={() => setShowDrawer(true)}
          style={{ fontSize: "30px" }}
        />
        <Drawer
          title="HOV UniInfo"
          placement="left"
          closable={true}
          closeIcon={<CloseOutlined />}
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
          width="355px"
        >
          <GeneralMenu inDrawer={true} />
        </Drawer>
      </nav>
    </Header>
  );
};

export default TopHeader;
