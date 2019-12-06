import PropTypes from 'prop-types';
import React from 'react';

import CreateButton from '../common/CreateButton';
import { useCreateCategory } from '../gql/categories';
import { OpenModalButton } from '../sbadmin2';
import { useDictionary } from '../sbadmin2/language';
import { CategoryModal } from './CategoryModal';

export function CreateCategoryButton({ onClickRef }) {
  const [createCategory] = useCreateCategory();
  const { categories } = useDictionary();
  return (
    <OpenModalButton
      onClickRef={onClickRef}
      button={props => <CreateButton {...props} />}
      modalContent={props => (
        <CategoryModal
          title={categories.modal.createTitle}
          init={{ name: '', envelope: { id: null }, description: '' }}
          onSave={createCategory}
          {...props}
        />
      )}
    />
  );
}

CreateCategoryButton.propTypes = {
  onClickRef: PropTypes.shape({ current: PropTypes.any }),
};
