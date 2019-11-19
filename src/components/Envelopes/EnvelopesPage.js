import React, { useRef } from 'react';
import { Page } from '../sbadmin2';
import { EnvelopesListPanel } from './EnvelopesListPanel';
import { CategoriesListPanel } from '../Categories/CategoriesListPanel';
import { GlobalHotKeys } from 'react-hotkeys';

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
  return (
    <Page>
      <GlobalHotKeys
        keyMap={keyMap}
        handlers={handlers(createEnvelopeFunRef, createCategoryFunRef)}
      />
      <Page.Header readTitle={d => d.sidebar.pages.envelopes} />
      <EnvelopesListPanel createFunRef={createEnvelopeFunRef} />
      <CategoriesListPanel createFunRef={createCategoryFunRef} />
    </Page>
  );
}
