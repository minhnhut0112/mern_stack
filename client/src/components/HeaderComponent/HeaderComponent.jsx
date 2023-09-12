import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Dropdown, Row } from "antd";
import Search from "antd/es/input/Search";
import React from "react";
import "./style.scss";

const items = [
  {
    key: "1",
    label: "as",
  },
  {
    key: "2",
    label: "a danger item",
  },
];

const HeaderComponent = () => {
  return (
    <div>
      <Row className="header">
        <Col className="header__left" span={6}>
          SPACE SNEAKERS
        </Col>
        <Col className="header__center" span={10}>
          col-8
        </Col>
        <Col className="header__right" span={8}>
          <div>
            <Search
              placeholder="search"
              allowClear
              // onSearch={onSearch}
              style={{
                width: 150,
              }}
            />
          </div>
          <div className="header__right__shoppingcart">
            <ShoppingCartOutlined />
          </div>
          <div></div>
          <div>
            <Dropdown menu={{ items }}>
              <button href="#" onClick={(e) => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} />
              </button>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
