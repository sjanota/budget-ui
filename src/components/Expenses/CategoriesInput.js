import React from 'react';
import { ClickableIcon, Icon } from '../sbadmin2';
import { useGetCategories } from '../gql/categories';
import { WithQuery } from '../gql/WithQuery';
import { Form, Row, Col } from 'react-bootstrap';
import { useDictionary } from '../sbadmin2';
import { Combobox } from '../sbadmin2/utilities/Combobox';
import { Variant, Size } from '../sbadmin2/bootstrap';
export function CategoriesInput({ formData }) {
  const query = useGetCategories();
  const { expenses } = useDictionary();
  return (
    <WithQuery query={query}>
      {({ data }) => (
        <>
          <small className="d-flex align-items-center">
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
            />
          </small>
          {formData.map((categoryFormData, idx) => (
            <Form.Group
              as={Row}
              key={categoryFormData.categoryID.init() || idx}
              className="d-flex align-items-center"
            >
              <Col sm={7}>
                <Combobox
                  _ref={categoryFormData.categoryID}
                  defaultValue={categoryFormData.categoryID.init()}
                  allowedValues={data.categories.map(({ id, name }) => ({
                    id,
                    label: name,
                  }))}
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  required
                  placeholder={expenses.modal.labels.amount}
                  defaultValue={categoryFormData.amount.init()}
                  ref={categoryFormData.amount}
                  step="0.01"
                />
              </Col>
              <Col sm={1}>
                <ClickableIcon
                  icon="minus"
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    console.log(categoryFormData, idx);
                    formData.removeAt(idx);
                  }}
                />
              </Col>
            </Form.Group>
          ))}
        </>
      )}
    </WithQuery>
  );
}
