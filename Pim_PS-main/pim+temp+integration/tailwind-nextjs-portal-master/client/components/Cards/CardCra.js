import React, { useEffect, useState } from "react";

import { Button, Card, Col, Divider, notification, Row, Typography } from "antd";
import CardModal from "./CardModal";
import axios from "axios";
import { useSelector } from "react-redux";
import Title from "antd/lib/typography/Title";

export default function CardCra() {
  const auth = useSelector((state) => state.auth);
  const [contract, setContract] = useState({});
  const [loading, setloqding] = useState(true);

  useEffect(() => {
    console.log("authauth", auth);
    axios
      .get(
        `/api/users/contrat/${auth.user.id}`
      )
      .then((res) => {
        setContract(res.data?.con);
        setloqding(false)
      })
      .catch((err) => {
        notification.error({message:"something is wrong",description:err})
      });
  }, []);

  const [visible, setvisible] = useState(false);
  const onCancel = () => {
    setvisible(false);
  };
  return (
    <>
      <Card title={<p style={{ color:"#ffffff"  , fontWeight:"bolder" , fontSize:"30px"}} >Mon Salaire</p>} style={{ textAlign: "center" , backgroundColor:"#8473f5" }} loading={loading} >
        <Row gutter={32} style={{ marginBottom: "30px" }}>
          <Col span={8}>
            <Card hoverable bordered>
              <Row>Contrat de travail: <b>{contract.type}</b></Row>
              <Row>
                <Typography>CA du mois: <b>{contract.rest_Total} $</b></Typography>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable>
              <Row>Solde avant disrubution: <b>{contract.salaryBf} $</b></Row>
              <Row>Solde aprés disrubution:  <b>{contract.salaryAf} $</b></Row>
            </Card>
          </Col>
          <Col span={8}>
            <Button
              size="large"
              style={{ margin: "25px 50px 0px 50px",borderRadius:"10px",background:"lightgray" }}
              onClick={() => window.print()}
            >
              <b>export PDF</b>
            </Button>
          </Col>
        </Row>
        <Row gutter={32} style={{ marginBottom: "30px" }}>
          <Col span={8}>
            <Card title="Mon congé payé" hoverable>
              <Row>Total N1: <b>{contract.TotaleN}</b></Row>
              <Row>Total N :0</Row>
              <Row>Conges restants: <b>{contract.netavant}</b></Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="CRA" hoverable>
              <Row>
                jours travialles : 15 jours
                <Col span={10}>
                  <Button onClick={() => setvisible(true)}>CRA</Button>
                </Col>
              </Row>
              <Row>jours de conges : 0,0 jours</Row>
              <Row>jours d'absence: 0,0 jours</Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Saisie" hoverable>
              <Row>Prime complemtaire <b>{contract.Prime}</b></Row>
              <Row>Reserve finonciere <b>{contract.Res}</b></Row>
              <Row>Chomage ... <b>{contract.chomage}</b></Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card hoverable>
              <Row gutter={32}>
                <Col span={12}>
                  <Title level={4}>Frais et charges </Title>
                <Divider />
                <Row>frais de gestion <b>{contract.Prime}$</b></Row>
                <Row>provision <b>{contract.Prime}$</b></Row>
                <Row>Charges sociales <b>{contract.Prime}$</b></Row>
                </Col>

                <Col span={12}><Title level={4}>Salaire </Title>
                <Divider />
                <Row>Salaire Bruit  <b>{contract.Prime} $</b></Row>
                <Row>Net avant impot  <b>{contract.Prime}$</b></Row>
                <Row>Reste a verser sur le mois <b>{contract.Prime}$</b></Row>
                </Col>
              </Row>
              <Row > <Col span={24}><p style={{textAlign:"center" , fontSize:"30px" , color:"lightblue", marginTop:"1.5rem"}}> Reste a verser sur le mois : <b>{contract.rest_Total}$</b> </p> </Col></Row>
            </Card>
          </Col>
        </Row>
      </Card>
      <CardModal visible={visible} onCancel={onCancel} />
    </>
  );


}
