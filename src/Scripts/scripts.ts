import { Url } from '../Types';
const scripts: {
  previous: string;
  current: string;
  action: (url: Url) => void;
}[] = [];
export default scripts;
