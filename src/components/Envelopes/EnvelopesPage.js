import React, { useRef } from 'react';
import { Page } from '../sbadmin2';
import { EnvelopesListPanel } from './EnvelopesListPanel';
import { CategoriesListPanel } from '../Categories/CategoriesListPanel';
import { GlobalHotKeys } from 'react-hotkeys';
import { useDictionary } from '../sbadmin2/utilities/Lang';

const keyMap = {
  createEnvelope: 'e',
  createCategory: 'c',
};

const handlers = (createEnvelopeFunRef, createCategoryFunRef) => ({
  createEnvelope: () => createEnvelopeFunRef.current(),
  createCategory: () => createCategoryFunRef.current(),
});

export default function EnvelopesPage() {
  const createEnvelopeFunRef = useRef();
  const createCategoryFunRef = useRef();
  const { sidebar } = useDictionary();
  return (
    <Page>
      <GlobalHotKeys
        keyMap={keyMap}
        handlers={handlers(createEnvelopeFunRef, createCategoryFunRef)}
      />
      <Page.Header>{sidebar.pages.envelopes}</Page.Header>
      <EnvelopesListPanel createFunRef={createEnvelopeFunRef} />
      <CategoriesListPanel createFunRef={createCategoryFunRef} />
    </Page>
  );
}
