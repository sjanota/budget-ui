import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { useUpdateCategory } from '../gql/categories';
import { ClickableIcon, OpenModalButton, useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { CategoryModal } from './CategoryModal';

export function UpdateCategoryButton({ category }) {
  const [updateEnvelope] = useUpdateCategory();
  const { categories } = useDictionary();
  const onSave = input => {
    updateEnvelope(category.id, input);
  };
  return (
    <OpenModalButton
      button={props => (
        <ClickableIcon icon={faEdit} variant={Variant.primary} {...props} />
      )}
      modalContent={props => (
        <CategoryModal
          title={categories.modal.editTitle}
          init={category}
          onSave={onSave}
          {...props}
        />
      )}
    />
  );
}

UpdateCategoryButton.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
