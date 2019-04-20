import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
import withSizes from 'react-sizes';

import ResourceInfo from '../../components/ResourceInfo';

const propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      notes: PropTypes.string,
      resourceType: PropTypes.string,
    }),
  ).isRequired,
  isMobile: PropTypes.bool.isRequired,
  xsDevice: PropTypes.bool.isRequired,
  smDevice: PropTypes.bool.isRequired,
  mdDevice: PropTypes.bool.isRequired,
  lgDevice: PropTypes.bool.isRequired,
  xlDevice: PropTypes.bool.isRequired,
  xxlDevice: PropTypes.bool.isRequired,
};

/**
 * ResourceList component
 * @param {array} resources - List of resources
 * @param {boolean} isMobile - Sets to true when width is < 767px
 * @param {boolean} xsDevice - Sets to true when width is <= 575px
 * @param {boolean} smDevice - Sets to true when width is >= 576px && <= 767px
 * @param {boolean} mdDevice - Sets to true when width is >= 768px && <= 991px
 * @param {boolean} lgDevice - Sets to true when width is >= 992px && <= 1199px
 * @param {boolean} xlDevice - Sets to true when width is >= 1200px && <= 1599px
 * @param {boolean} xxlDevice - Sets to true when width is >= 1600px
 */
function ResourceList({
  resources,
  isMobile,
  xsDevice,
  smDevice,
  mdDevice,
  lgDevice,
  xlDevice,
  xxlDevice,
}) {
  const cache = new CellMeasurerCache({
    defaultHeight: 250,
    fixedWidth: true,
  });
  const rowPropTypes = {
    key: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    style: PropTypes.shape({
      height: PropTypes.number,
      left: PropTypes.number,
      position: PropTypes.string,
      top: PropTypes.number,
      width: PropTypes.string,
    }).isRequired,
    parent: PropTypes.node.isRequired,
  };

  function rowRenderer({
    key,
    index,
    style,
    parent,
  }) {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure }) => (
          <div style={style}>
            <ResourceInfo
              resourceCount={index + 1}
              resourceType={resources[index].resourceType}
              resourceLink={resources[index].link}
              resourceTitle={resources[index].title}
              resourceNotes={resources[index].notes}
              onLoad={measure}
            />
          </div>
        )}
      </CellMeasurer>
    );
  }

  rowRenderer.propTypes = rowPropTypes;

  useEffect(() => {
    cache.clearAll(); // https://stackoverflow.com/a/43837929
  }, [
    cache,
    isMobile,
    xsDevice,
    smDevice,
    mdDevice,
    lgDevice,
    xlDevice,
    xxlDevice,
  ]);

  return (
    <React.Fragment>
      {
        isMobile ? (
          <section className="bundle-resource-list">
            <AutoSizer>
              {({ width, height }) => (
                <List
                  height={height || 766} // 766 is provided for testing purpose
                  width={width || 766}
                  rowHeight={cache.rowHeight}
                  rowCount={resources.length}
                  rowRenderer={rowRenderer}
                  scrollToIndex={0}
                />
              )}
            </AutoSizer>
          </section>
        ) : (
          <div className="bundle-resource-list">
            <AutoSizer>
              {({ width, height }) => (
                <List
                  height={height || 1920} // 1920 is provided for testing purpose
                  width={width || 1920}
                  rowHeight={cache.rowHeight}
                  rowCount={resources.length}
                  rowRenderer={rowRenderer}
                  scrollToIndex={0}
                />
              )}
            </AutoSizer>
          </div>
        )
      }
    </React.Fragment>
  );
}

ResourceList.propTypes = propTypes;

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767,
  xsDevice: width <= 575,
  smDevice: width >= 576 && width <= 767,
  mdDevice: width >= 768 && width <= 991,
  lgDevice: width >= 992 && width <= 1199,
  xlDevice: width >= 1200 && width <= 1599,
  xxlDevice: width >= 1600,
});

export default withSizes(mapSizesToProps)(ResourceList);
