import type { QTableColumn } from 'quasar';
import { Notify } from 'quasar';
import { exportFile } from 'quasar';
export const csv = (columns: QTableColumn[], rows: Record<string, unknown>[]) => {
  // naive encoding to csv format
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row,
            ),
          )
          .join(','),
      ),
    )
    .join('\r\n');

  const status = exportFile('table-export.csv', content, 'text/csv');

  if (status !== true) {
    Notify.create({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'mdi-alert',
    });
  } else {
    Notify.create({
      message: 'Table successfully downloaded',
      color: 'positive',
      icon: 'mdi-check-circle',
    })
  }
};

const wrapCsvValue = (
  val: string,
  formatFn?: (val: string | number, row: object) => string,
  row?: object,
) => {
  let formatted = val;
  if (formatFn !== void 0 && formatFn !== undefined && row != undefined) {
    formatted = formatFn(val, row);
  }

  formatted = formatted === void 0 || formatted === null ? '' : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
};
