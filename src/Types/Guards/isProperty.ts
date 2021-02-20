import Property from '../Property';
const isProperty = (property: Property | Property[]): property is Property =>
  typeof property[0] === 'string';
export default isProperty;
