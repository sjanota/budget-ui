import React, { createContext, useContext } from 'react';
import { useSBAdmin2 } from './context';
import PropTypes from 'prop-types';

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

export function withColumnNames(columns, dictionary) {
  return columns.map(c => ({ ...c, text: dictionary[c.dataField] || '' }));
}
