import React from "react";
import arrayMove from "array-move";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import "react-toastify/dist/ReactToastify.css";
import photoLibrary from "../../../redux/photo-library";
import { Container, Row, Col, Button, Progress } from "reactstrap";
import SortableList from "../../components/SortableList";

class PhotoList extends React.Component {
  /**
   * photoList constructor
   * @param {object} prop values for this component
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      itemsImage: this.props.gridList ? this.props.gridList.data : [],
      savingGrid: false,
      initialLoad: true
    };

    this.onSelectImage = this.onSelectImage.bind(this);
    this.getActiveSTtaus = this.getActiveSTtaus.bind(this);
  }

  /**
   * Sorting when user drag and drop and update state
   * @param {number, number} old index and New index of image
   */
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ itemsImage }) => ({
      itemsImage: arrayMove(itemsImage, oldIndex, newIndex)
    }));
  };

  /**
   * Dispatch get photo list request
   */
  componentDidMount() {
    this.props.photoListRequest();
  }

  /**
   * Update state when user select image from image list
   * @param {object} image details object
   */
  onSelectImage(image) {
    let images = this.state.itemsImage;
    let PhotoExist = false;
    if (images.length > 0) {
      images.forEach(item => {
        if (item.id === image.id) {
          PhotoExist = true;
        }
      });
      if (PhotoExist) {
        const dddimages = images.filter(function(item) {
          return item.id !== image.id;
        });
        images = dddimages;
        this.setState({ itemsImage: images });
      } else {
        if (this.state.itemsImage.length === 9) {
          toast.warn("You can select upto 9 photos only!", {
            position: toast.POSITION.TOP_RIGHT
          });
        } else {
          images.push(image);
          this.setState({ itemsImage: images });
        }
      }
    } else {
      images.push(image);
      this.setState({ itemsImage: images });
    }
  }

  /**
   * Update state depending on user already has a grid saved
   */
  static getDerivedStateFromProps(props, state) {
    if (!props.photos.fetchingGrid && !props.photos.fetchingList) {
      if (
        props.photos.gridList.data.length > 0 &&
        state.initialLoad &&
        props.photos.photoList.id
      ) {
        let images = [];
        props.photos.gridList.data.forEach(gridItem => {
          props.photos.photoList.entries.forEach(listItem => {
            if (gridItem.pictureId === listItem.id) {
              images.push(listItem);
            }
          });
        });
        return {
          itemsImage: images,
          initialLoad: false
        };
      }
    }
    return {
      ...state
    };
  }

  /**
   * Set checkbox value of an image
   * @param {object, object[Array]} Image to set check status, image list to cross check.
   * @returns {boolean}  true if image selected and false if not
   */
  getActiveSTtaus(photo, photos) {
    let imageExist = false;
    if (photos.gridList.data.length > 0) {
      photos.gridList.data.forEach(gridItem => {
        if (gridItem.pictureId === photo.id) {
          imageExist = true;
        }
      });
      return imageExist;
    } else {
      let imageExist = false;
      this.state.itemsImage.forEach(element => {
        if (element.id === photo.id) {
          imageExist = true;
        }
      });
      return imageExist;
    }
  }

  /**
   * Save user picked and arranged images
   * @param {string, object[Array]} userId, grid image list.
   */
  saveMyGrid(userId, gridList) {
    const imgIds = [];
    this.state.itemsImage.forEach(element => {
      imgIds.push({ id: element.id, url: element.picture });
    });
    const gridObject = {
      user_id: userId,
      grid_pictures: imgIds
    };
    this.setState({ savingGrid: true });
    if (gridList.data.length > 0) {
      this.props.updateGridRequest(gridObject);
    } else {
      this.props.createGridRequest(gridObject);
    }
  }

  /**
   * Set button text
   * @returns {string} loading id saving data else save
   */
  getButtonText() {
    return this.state.savingGrid ? "Loading..." : "Save";
  }

  render() {
    const { photos } = this.props;

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm={12}>
              <div className="main-wrapper">
                {photos.fetchingList ||
                photos.fetchingGrid ||
                photos.photoList.length === 0 ? (
                  <span className="progress-bar-mid">
                    <Progress animated value="100" />
                  </span>
                ) : (
                  <div
                    className="react-photo-gallery--gallery"
                    style={{ display: "block" }}
                  >
                    <div style={{ display: "flex", flexFlow: "row wrap" }}>
                      {photos.photoList.entries.map(photo => {
                        return (
                          <Col sm={12} md={6} lg={3} key={photo.id}>
                            <div className="image" style={{ width: "100%" }}>
                              <input
                                type="checkbox"
                                id={photo.id}
                                defaultChecked={
                                  this.getActiveSTtaus(photo, photos)
                                    ? "checked"
                                    : ""
                                }
                                disabled={
                                  !this.getActiveSTtaus(photo, photos) &&
                                  this.state.itemsImage.length === 9
                                    ? true
                                    : false
                                }
                              />
                              <label htmlFor={photo.id}>
                                <img
                                  id={photo.id}
                                  alt="picAlt"
                                  src={photo.picture}
                                  height="257"
                                  width="257"
                                  style={{
                                    width: "100%",
                                    display: "block",
                                    cursor: "pointer"
                                  }}
                                  onClick={() =>
                                    this.state.itemsImage.length === 9 &&
                                    !this.getActiveSTtaus(photo, photos)
                                      ? null
                                      : this.onSelectImage(photo)
                                  }
                                />
                              </label>
                            </div>
                          </Col>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div>
                  <div>
                    {this.state.itemsImage.length > 0 ? (
                      <React.Fragment>
                        <h2>Selected Photos (Drag and drop as you want the order to be)</h2>
                        <SortableList
                          items={this.state.itemsImage}
                          onSortEnd={this.onSortEnd}
                          axis="xy"
                        />
                        <span className="btn-adjust">
                        <Button
                          color="primary"
                          onClick={() =>
                            this.saveMyGrid(
                              photos.photoList.author.id,
                              photos.gridList
                            )
                          }
                        >
                          {this.getButtonText()}
                        </Button>
                        </span>
                        
                      </React.Fragment>
                    ) : null}
                  </div>
                </div>
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
      photoListRequest: photoLibrary.actions.photoListRequest,
      createGridRequest: photoLibrary.actions.createGridRequest,
      updateGridRequest: photoLibrary.actions.updateGridRequest
    },
    dispatch
  );
};

export default connect(mapStateToProps, matchDispatchToProps)(PhotoList);
