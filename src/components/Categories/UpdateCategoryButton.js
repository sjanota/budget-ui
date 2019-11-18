import React from 'react';
import { OpenModalButton, FaIconLink, FaIcon } from '../sbadmin2';
import { CategoryModal } from './CategoryModal';
import PropTypes from 'prop-types';
import { useUpdateCategory } from '../gql/categories';
import { useDictionary } from '../sbadmin2/utilities/Lang';
import { Variant } from '../sbadmin2/bootstrap';

export function UpdateCategoryButton({ category }) {
  const [updateEnvelope] = useUpdateCategory();
  const { categories } = useDictionary();
  const onSave = input => {
    updateEnvelope(category.id, input);
  };
  return (
    <OpenModalButton
      renderButton={props => (
        <FaIconLink icon={FaIcon.Edit} variant={Variant.primary} {...props} />
      )}
      renderModal={props => (
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
