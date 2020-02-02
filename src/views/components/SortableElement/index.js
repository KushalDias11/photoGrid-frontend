import React from "react";
import { Col } from "reactstrap";
import { SortableElement } from "react-sortable-hoc";

/**
 * component to render single sortable time
 * @param {object} image object to render
 * @returns {html} Html object which holds sortable item
 */
const SortableItem = SortableElement(({ value }) => (
  <Col sm={12} md={6} lg={3}>
    <div className="image" style={{ width: "100%" }}>
      <img
        id={value.id}
        alt="picAlt"
        src={value.picture}
        height="257"
        width="257"
        style={{ width: "100%", display: "block", cursor: "pointer" }}
      />
    </div>
  </Col>
));

export default SortableItem;
