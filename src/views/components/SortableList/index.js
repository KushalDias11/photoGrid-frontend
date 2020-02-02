import React from "react";
import { Container, Row, Col } from "reactstrap";
import { SortableContainer } from "react-sortable-hoc";
import SortableItem from "../SortableElement";

/**
 * component to hold selected images
 * @param {object} Array of images
 * @returns {html} Html object to hold sortable list
 */
const SortableList = SortableContainer(({ items }) => {
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <div
            className="react-photo-gallery--gallery"
            style={{ display: "block" }}
          >
            <div style={{ display: "flex", flexFlow: "row wrap" }}>
              {items.map((value, index) => (
                <SortableItem
                  key={`item-${value.id}`}
                  index={index}
                  value={value}
                />
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default SortableList;
