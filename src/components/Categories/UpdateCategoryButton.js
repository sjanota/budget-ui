import React from 'react';
import { OpenModalButton, ClickableIcon, Icon } from '../sbadmin2';
import { CategoryModal } from './CategoryModal';
import PropTypes from 'prop-types';
import { useUpdateCategory } from '../gql/categories';
import { useDictionary } from '../sbadmin2/language';
import { Variant } from '../sbadmin2/bootstrap';

export function UpdateCategoryButton({ category }) {
  const [updateEnvelope] = useUpdateCategory();
  const { categories } = useDictionary();
  const onSave = input => {
    updateEnvelope(category.id, input);
  };
  return (
    <OpenModalButton
      button={props => (
        <ClickableIcon icon={Icon.Edit} variant={Variant.primary} {...props} />
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
