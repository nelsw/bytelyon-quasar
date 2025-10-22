import { type JobProps } from 'src/models/job';
import { type ItemProps } from 'src/models/item';

export interface JobItemsProps {
  job: JobProps;
  items: Array<ItemProps>;
}
