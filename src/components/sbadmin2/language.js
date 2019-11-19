import React, { createContext, useContext } from 'react';
import { useSBAdmin2 } from './context';
import PropTypes from 'prop-types';
import { capitalize } from '../../util/capitalize';

const DictionaryContext = createContext();

export function DictionaryProvider({ dictionaries, children }) {
  const { user } = useSBAdmin2();
  return (
    <DictionaryContext.Provider value={dictionaries[user.locale]}>
      {children}
    </DictionaryContext.Provider>
  );
}

DictionaryProvider.propTypes = {
  dictionaries: PropTypes.object,
  children: PropTypes.node,
};

export const useDictionary = () => useContext(DictionaryContext);

export function withDictionary(prop, Component, readPropName) {
  return props => {
    readPropName = readPropName || `read${capitalize(prop)}`;
    const readDict = props[readPropName];
    const newProps = { ...props };
    delete newProps[readPropName];
    const dictionary = useDictionary();
    if (readDict) {
      newProps[prop] = readDict(dictionary);
    }
    return <Component {...newProps} />;
  };
}
