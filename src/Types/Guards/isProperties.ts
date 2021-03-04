import Property from '../Property';
import isProperty from './isProperty';
const isProperties = (
  property: Property | Property[]
): property is Property[] => !isProperty(property);
export default isProperties;
