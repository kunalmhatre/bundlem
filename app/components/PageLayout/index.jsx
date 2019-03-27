import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Header from '../Header';
import Footer from '../Footer';
import messages from '../Header/messages';

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
  headerTitle: messages.defaultHeaderTitle,
};

/**
 * Layout for all the pages used in the app
 * @param {boolean} [setHeader=true] - Renders header when set to true
 * @param {boolean} [setFooter=true] - Renders footer when set to true
 * @param {object} [headerTitle=Bundlem] - Header title to be shown (react-intl message object)
 * @param {object} children - React component to render as a child
 */
function PageLayout({
  setHeader,
  setFooter,
  headerTitle,
  children,
}) {
  return (
    <Row className="theme-blue">
      <Col span={22} offset={1}>
        {setHeader ? <Header headerTitle={headerTitle} /> : null}
        {<section>{children}</section>}
        {setFooter ? <Footer /> : null}
      </Col>
    </Row>
  );
}

PageLayout.propTypes = propTypes;
PageLayout.defaultProps = defaultProps;

export default React.memo(PageLayout);
