import React from 'react';
import PropTypes from 'prop-types';
import { ClickableIcon, Icon } from '../sbadmin2';
import { useGetCategories } from '../gql/categories';
import { WithQuery } from '../gql/WithQuery';
import { Form, Row, Col } from 'react-bootstrap';
import { useDictionary } from '../sbadmin2';
import { Combobox } from '../sbadmin2/utilities/Combobox';
import { Variant, Size } from '../sbadmin2/bootstrap';
import { AmountInput } from './AmountInput';

export function CategoriesInput({ formData }) {
  const query = useGetCategories();
  const { expenses } = useDictionary();
  return (
    <WithQuery query={query}>
      {({ data }) => (
        <>
          <small className="d-flex align-items-center mb-3">
            {expenses.modal.labels.categories}
            <ClickableIcon
              icon={Icon.Plus}
              variant={Variant.primary}
              size={Size.sm}
              onClick={() =>
                formData.push({
                  category: { id: null },
                  amount: null,
                })
              }
              type="button"
            />
          </small>
          {formData.map((categoryFormData, idx) => (
            <Form.Group
              as={Row}
              key={categoryFormData.categoryID.init() || idx}
              className="d-flex align-items-center"
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
              <Col className="pr-0">
                <AmountInput
                  placeholder={expenses.modal.labels.amount}
                  formData={categoryFormData.amount}
                />
              </Col>
              <Col sm={1} className="px-0">
                <ClickableIcon
                  icon="minus"
                  variant="danger"
                  size="sm"
                  onClick={() => formData.removeAt(idx)}
                  type="button"
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
