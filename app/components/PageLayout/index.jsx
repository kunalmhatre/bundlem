import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import Header from '../Header';
import Footer from '../Footer';
import headerMessages from '../Header/messages';
import messages from './messages';
import './page-layout.css';

const propTypes = {
  setHeader: PropTypes.bool,
  setFooter: PropTypes.bool,
  headerTitle: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  headerTitleString: PropTypes.string,
  setString: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const defaultProps = {
  setHeader: true,
  setFooter: true,
  headerTitle: headerMessages.defaultHeaderTitle,
  headerTitleString: 'Bundlem',
  setString: false,
};

/**
 * Layout for all the pages used in the app
 * @param {boolean} [setHeader=true] - Renders header when set to true
 * @param {boolean} [setFooter=true] - Renders footer when set to true
 * @param {object} headerTitle - Header title to be shown (react-intl message object)
 * @param {string} [headerTitleString=Bundlem] - Header title in string
 * @param {boolean} [setString=false] - States whether the header title is in string format
 * @param {object} children - React component to render as a child
 */
function PageLayout({
  setHeader,
  setFooter,
  headerTitle,
  headerTitleString,
  setString,
  children,
}) {
  const footerProps = {
    linkTitles: [
      messages.source,
      messages.reportIssue,
      messages.story,
      messages.author,
    ],
    links: [
      'https://github.com/kunalmhatre/bundlem/',
      'https://github.com/kunalmhatre/bundlem/issues/new/choose',
      'https://kunalmhatre.com/bundlem/',
      'https://kunalmhatre.com/',
    ],
  };

  return (
    <Row className="page-layout theme-blue">
      <Col span={22} offset={1}>
        <div className="page-layout-header-content">
          {
            setHeader ? (
              <Header
                headerTitle={headerTitle}
                headerTitleString={headerTitleString}
                setString={setString}
              />
            ) : null
          }
          {<section className="page-layout-content">{children}</section>}
        </div>
        {setFooter ? <Footer {...footerProps} /> : null}
      </Col>
    </Row>
  );
}

PageLayout.propTypes = propTypes;
PageLayout.defaultProps = defaultProps;

export default React.memo(PageLayout);
