import renderer from 'react-test-renderer';
import OpenModalButton from './OpenModalButton';
import React from 'react';
import { mount } from 'enzyme';
import { actAndUpdate } from '../../../../testing';

it('OpenModalButton renders with minimal props', () => {
  const component = renderer.create(
    <OpenModalButton
      renderButton={props => <button {...props} />}
      renderModal={() => <div />}
    />
  );
  expect(component).toMatchSnapshot();
});

describe('OpenModalButton', () => {
  const renderButton = props => <button {...props} />;

  const Modal = () => <div />;
  const renderModal = props => <Modal {...props} />;
  const onClickRef = { current: null };

  const component = mount(
    <OpenModalButton
      renderButton={renderButton}
      renderModal={renderModal}
      onClickRef={onClickRef}
    />
  );

  it('modal is initialy hidden', () => {
    expect(component.find(Modal).prop('show')).toBe(false);
  });

  it('onClickRef points to button onClick', () => {
    expect(onClickRef.current).toBe(component.find('button').prop('onClick'));
  });

  it('click on rendered button opens modal', async () => {
    await actAndUpdate(component, () => {
      component.find('button').simulate('click');
    });

    expect(component.find(Modal).prop('show')).toBe(true);
  });

  it('modal onHide closes modal', async () => {
    await actAndUpdate(component, () => {
      component.find(Modal).prop('onHide')();
    });
    expect(component.find(Modal).prop('show')).toBe(false);
  });
});
