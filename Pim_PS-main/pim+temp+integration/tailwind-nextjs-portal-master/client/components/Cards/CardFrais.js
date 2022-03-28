import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Col,
  Divider,
  notification,
  Row,
  Space,
  Spin,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";
import CardModal from "./CardModal";
import axios from "axios";
import { useSelector } from "react-redux";
import Title from "antd/lib/typography/Title";
import {
  AddOutlined,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@material-ui/icons";
import moment from "moment";
import FraisModal from "./FraisModal";

const { TabPane } = Tabs;
export default function CardFrais() {
  const auth = useSelector((state) => state.auth);
  const [type, settype] = useState("ALL");
  const [loading, setloqding] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    console.log("authauth", auth);
    setloqding(true)
    async function callapi() {
      await axios
        .get(`/api/users/frais/${auth.user.id}/${type}`)
        .then((res) => {
          console.log("response", res);
          setdata(res.data?.con);
          setloqding(false);
        })
        .catch((err) => {
          notification.error({
            message: "something is wrong",
            description: err,
          });
          setloqding(false)
        });
    }
    callapi();
  }, [type]);
  function handleSave(data) {
    console.log("dataaa", data);
  }
  const [visible, setvisible] = useState(false);
  const [display, setdisplay] = useState(false);
  const [create, setcreate] = useState(false);
  const [record, setrecord] = useState({});
  const onCancel = () => {
    setvisible(false);
    setrecord([]);
    setcreate(false);
    setdisplay(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
      render: (text) =>
        String(text).substring(String(text).length - 5, String(text).length),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("YYYY/MM/DD"),
      sorter: {
        compare: (a, b) => moment(a.date) > moment(b.date),
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "HT (€)",
      dataIndex: "HT",
      key: "ht",
      render: (text) => text + " €",
    },
    {
      title: "TTC (€)",
      dataIndex: "TTC",
      key: "ttc",
      render: (text) => text + " €",
    },
    {
      title: "TVA (€)",
      dataIndex: "TVA",
      key: "tva",
      render: (text) => text + " €",
    },
    {
      title: "Montant rembourser",
      dataIndex: "MontantRemb",
      key: "montantrm",
      render: (text) => text + " €",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "Status",
      render: (status) => (
        <Tag color="volcano" key={0}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setdisplay(true);
              setrecord(record);
              setcreate(false);
              setvisible(true);
            }}
            style={{ border: "none" }}
          >
            <RemoveRedEyeOutlined />
          </Button>
          <Button
            onClick={() => {
              setdisplay(false);
              setrecord(record);
              setcreate(false);
              setvisible(true);
            }}
            style={{ border: "none" }}
          >
            {" "}
            <EditOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  const handlechange = (e) => {
    let type = "";

    switch (Number(e)) {
      case 1:
        type = "ALL";
        break;
      case 2:
        type = "NF";
        break;
      case 3:
        type = "FR";
        break;
      case 4:
        type = "TR";
        break;
      case 5:
        type = "FK";
        break;
      case 6:
        type = "GD";
        break;
      case 7:
        type = "FT";
        break;
      default:
        type = "ALL";
    }
    settype(type);
    console.log("typee", type);
  };
  const content = (
    <Spin spinning={loading}>
      <Row>
        <Col span={22}></Col>
        <Col span={2}>
          <Button
            onClick={() => {
              setdisplay(false);
              setcreate(true);
              setvisible(true);
            }}
            icon={
              <AddOutlined
                style={{
                  position: "relative",
                  fontSize: "1rem",
                  marginBottom: "3px",
                  marginRight: "3px",
                }}
              />
            }
            style={{
              width: "80px",
              marginBottom: "1rem",
              borderRadius: "10px",
              border: "solid 1px",
            }}
          >
            Add
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            pagination={{ pageSize: 5 }}
            size="middle"
            columns={columns}
            dataSource={data}
          />
        </Col>
      </Row>
    </Spin>
  );

  return (
    <>
      <Card
        title={
          <p
            style={{ color: "#ffffff", fontWeight: "bolder", fontSize: "30px" }}
          >
            Mes Frais
          </p>
        }
        style={{ textAlign: "center", backgroundColor: "#8473f5" }}
      >
        <Card>
          <Tabs
            type="card"
            tabBarStyle={{ color: "black" }}
            defaultActiveKey="1"
            onChange={handlechange}
          >
            <TabPane tab="Tous" key="1">
              {content}
            </TabPane>
            <TabPane tab="Notes de frais" key="2">
              {content}
            </TabPane>

            <TabPane tab="Forfait Repas" key="3">
              {content}
            </TabPane>
            <TabPane tab="Ticket Restaurant" key="4">
              {content}
            </TabPane>
            <TabPane tab="Frais kilométriques" key="5">
              {content}
            </TabPane>
            <TabPane tab="Grands déplacements" key="6">
              {content}
            </TabPane>
            <TabPane tab="Frais de Télétravail" key="7">
              {content}
            </TabPane>
          </Tabs>
        </Card>
      </Card>

      <FraisModal
        visible={visible}
        onCancel={onCancel}
        display={display}
        create={create}
        record={record}
        onsave={handleSave}
      />
    </>
  );
}
