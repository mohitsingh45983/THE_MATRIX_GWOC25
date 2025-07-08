import { Container, Row, Col } from "react-bootstrap";

const ExploreMore = () => {
  const sarees = [
    {
      title: "Read Pleated Sarees",
      description: "Draping under 60 seconds!",
      image:
        "https://www.koskii.com/cdn/shop/products/koskii-peach-threadwork-semi-crepe-designer-saree-saus0022636_peach__4_1400x.jpg?v=1670488483",
    },
    {
      title: "Embroidered Sarees",
      description: "Intricate Elegance to Make a Statement",
      image:
        "https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414",
    },
    {
      title: "Printed Sarees",
      description: "Vibrant Patterns for Every Occasion!",
      image:
        "https://www.koskii.com/cdn/shop/products/koskii-lavender-mirrorwork-net-designer-saree-saus0021303_lavender_3_1800x1800.jpg?v=1661854696",
    },
    {
      title: "Classic Sarees",
      description: "Timeless Drapes That Never Go Out",
      image:
        "https://www.koskii.com/cdn/shop/products/koskii-red-stonework-satin-designer-saree-saus0022634_red__2_1400x.jpg?v=1670491333",
    },
  ];

  return (
    <Container fluid className="mt-4 mb-5 px-0">
      <p className="mb-4 text-start" style={{ fontSize: "25px" }}>
        Explore More
      </p>
      <Row className="gx-3 gy-3 d-flex flex-wrap ">
        {/* Equal gap between rows and cols */}
        {sarees.map((saree, index) => (
          <Col md={6} key={index}>
            <div className="position-relative overflow-hidden">
              <img
                src={saree.image}
                alt={saree.title}
                className="img-fluid w-100"
                style={{
                  height: "250px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center text-white"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  cursor: "pointer",
                }}
              >
                <p className="text-start ms-4" style={{ fontSize: "20px" }}>
                  {saree.title}
                </p>
                <p className=" text-start ms-4" style={{ fontSize: "13px" }}>
                  {saree.description} <br /> Shop Now
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExploreMore;
