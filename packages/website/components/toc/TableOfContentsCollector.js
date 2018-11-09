import { withTableOfContents } from './TableOfContentsProvider';

const TableOfContentsCollector = ({ id, level, title, addTableOfContentsItem }) => {
  addTableOfContentsItem({ id, level, title });
  return null;
};

export default withTableOfContents(TableOfContentsCollector);
