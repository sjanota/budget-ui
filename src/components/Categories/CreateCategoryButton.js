import React from 'react';
import { OpenModalButton } from '../sbadmin2';
import CreateButton from '../sbadmin2/utilities/CreateButton';
import { useCreateCategory } from '../gql/categories';
import { CategoryModal } from './CategoryModal';
import { useDictionary } from '../sbadmin2/utilities/Lang';
import PropTypes from 'prop-types';

export function CreateCategoryButton({ onClickRef }) {
  const [createCategory] = useCreateCategory();
  const { categories } = useDictionary();
  return (
    <OpenModalButton
      onClickRef={onClickRef}
      renderButton={props => <CreateButton {...props} />}
      renderModal={props => (
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
