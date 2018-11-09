import { withTableOfContents } from './TableOfContentsProvider';

const TableOfContentsCollector = ({ url, level, title, addTableOfContentsItem }) => {
  addTableOfContentsItem({ url, level, title });
  return null;
};

export default withTableOfContents(TableOfContentsCollector);
