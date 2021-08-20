
import { Card, Col, Row } from 'antd';


const DashboardCards = () => {
    return (
        <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Total Materials" bordered={false}>
              7
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Expired Materials" bordered={false}>
              2
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Reports In Progress" bordered={false}>
              6
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Finished Reports" bordered={false}>
              7
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default DashboardCards
