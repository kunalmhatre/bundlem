import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Header from '../Header';

import './page-layout.css';

const propTypes = {
  setHeader: PropTypes.bool,
  setFooter: PropTypes.bool,
  headerTitle: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const defaultProps = {
  setHeader: true,
  setFooter: true,
  headerTitle: {
    id: 'defaultMessage',
    defaultMessage: 'Default message',
  },
};

/**
 * Layout for all the pages in the app
 * @param {boolean} setHeader - Renders header when set to true
 * @param {boolean} setFooter - Renders footer when set to true
 * @param {object} headerTitle - Header title to be shown
 * @param {object} children - React component to render as a child
 */
function PageLayout({
  setHeader,
  setFooter,
  headerTitle,
  children,
}) {
  return (
    <Row className="page-layout-blue">
      <Col span={22} offset={1}>
        {setHeader ? <Header /> : null}
        {<section>{children}</section>}
        {setFooter ? <footer /> : null}
      </Col>
    </Row>
  );
}

PageLayout.propTypes = propTypes;
PageLayout.defaultProps = defaultProps;

export default React.memo(PageLayout);
