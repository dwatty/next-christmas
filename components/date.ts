import { parseISO, format } from 'date-fns'

export default function Date({ dateString }: { dateString: string }) {

  const date = parseISO(dateString);
  const fDate = format(date, 'LLLL d, yyyy');
  return fDate;

}