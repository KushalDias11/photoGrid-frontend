import React from "react";
import photoLibrary from "../../../redux/photo-library";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row, Col, Button, Progress } from "reactstrap";

class PhotoGrid extends React.Component {
  /**
   * photoGrid constructor
   * @param {object} prop values for this component
   * @constructor
   */
  constructor(props) {
    super(props);

    this.gotBack = this.gotBack.bind(this);
  }

  /**
   * Dispatch get grid request
   */
  componentDidMount() {
    const userId = this.props.match.params.uid;
    this.props.fetchGridRequest(parseInt(userId));
  }

  /**
   * change user location to photo list page
   */
  gotBack() {
    this.props.history.push("/");
  }

  render() {
    const { photos } = this.props;
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm={12}>
              <h1>Your Photo Grid</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <div className="main-wrapper">
                {photos.fetchingGrid || photos.gridList.length === 0 ? (
                  <Progress animated value="100" />
                ) : (
                  <div
                    className="react-photo-gallery--gallery"
                    style={{ display: "block" }}
                  >
                    <div style={{ display: "flex", flexFlow: "row wrap" }}>
                      {photos.gridList.data.map(photo => {
                        return (
                          <Col sm={12} md={6} lg={3} key={photo.id}>
                            <div className="image" style={{ width: "100%" }}>
                              <label htmlFor={photo.id}>
                                <img
                                  id={photo.id}
                                  alt="picAlt"
                                  src={photo.pictureUrl}
                                  height="257"
                                  width="257"
                                  style={{
                                    width: "100%",
                                    display: "block",
                                    cursor: "pointer"
                                  }}
                                />
                              </label>
                            </div>
                          </Col>
                        );
                      })}
                    </div>
                    <Button color="primary" onClick={() => this.gotBack()}>
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photos
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchGridRequest: photoLibrary.actions.fetchGridRequest
    },
    dispatch
  );
};

export default connect(mapStateToProps, matchDispatchToProps)(PhotoGrid);
