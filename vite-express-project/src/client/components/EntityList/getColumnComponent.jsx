import { EntityCard } from './EntityCard';
import { LoadingIndicator } from './LoadingIndicator';
import { ITEMS_PER_ROW } from './constants';
import _Footer from '../Footer';

const Footer = ({ style }) => {
  return (
    <div
      className="footer-wrapper flex items-end justify-center left-1/2"
      style={{ ...style, left: '50%', transform: 'translate(-50%)', width: '50%'}}>
      <_Footer />
    </div>
  )
}

export const getColumnComponent = ({
  currentLastRowIndex,
  isFetching,
  currentCount,
  totalCount,
  isArtists
}) => ({
  columnIndex,
  rowIndex,
  style,
  data
}) => {
  const currentIndex = rowIndex * ITEMS_PER_ROW + columnIndex;
  const isLoadedColumn = (rowIndex * ITEMS_PER_ROW + columnIndex) < currentCount;
  const isLoadingRow = rowIndex === currentLastRowIndex;
  const isFirstColumn = columnIndex === 0;
  const isLoadedAll = currentCount >= totalCount;
  const isFooterRow = rowIndex === currentLastRowIndex + 1;

  return isLoadedColumn ?
    <EntityCard style={style} data={data[currentIndex]} isArtists={isArtists} />
    : isLoadingRow && isFirstColumn && isFetching && !isLoadedAll
    ? <LoadingIndicator style={style} />
    : isFooterRow && isFirstColumn && currentCount !== 0
    ? <Footer style={style} />
    : null;    
};