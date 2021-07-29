import { createContext } from 'react';

const ThemeContext = createContext('This is the default value!'); //createContext(defaultValue) --> the defaultValue argument 
// is only used when a component does not have a matching Provider above it in the tree

export default ThemeContext;