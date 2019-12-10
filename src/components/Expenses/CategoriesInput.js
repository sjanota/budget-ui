import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useGetCategories } from '../gql/categories';
import { WithQuery } from '../gql/WithQuery';
import { Combobox, IconButton, useDictionary } from '../sbadmin2';
import { Size, Variant } from '../sbadmin2/bootstrap';
import { AmountInput } from './AmountInput';

export function CategoriesInput({ formData }) {
  const query = useGetCategories();
  const { expenses } = useDictionary();
  return (
    <WithQuery query={query}>
      {({ data }) => (
        <>
          <small className='d-flex align-items-center mb-3'>
            {expenses.modal.labels.categories}
            <IconButton
              icon={faPlus}
              variant={Variant.primary}
              size={Size.sm}
              onClick={() =>
                formData.push({
                  category: { id: null },
                  amount: null,
                })
              }
              type='button'
              borderless
            />
          </small>
          {formData.map((categoryFormData, idx) => (
            <Form.Group
              as={Row}
              key={categoryFormData.categoryID.init() || idx}
              className='d-flex align-items-center'
            >
              <Col sm={6}>
                <Combobox
                  _ref={categoryFormData.categoryID}
                  defaultValue={categoryFormData.categoryID.init()}
                  allowedValues={data.categories.map(({ id, name }) => ({
                    id,
                    label: name,
                  }))}
                  required
                />
              </Col>
              <Col className='pr-0'>
                <AmountInput
                  placeholder={expenses.modal.labels.amount}
                  formData={categoryFormData.amount}
                />
              </Col>
              <Col sm={1} className='px-0'>
                <IconButton
                  icon={faMinus}
                  variant={Variant.danger}
                  size={Size.sm}
                  onClick={() => formData.removeAt(idx)}
                  type='button'
                  borderless
                />
              </Col>
            </Form.Group>
          ))}
        </>
      )}
    </WithQuery>
  );
}

CategoriesInput.propTypes = {
  formData: PropTypes.array.isRequired,
};
