import { act } from 'react-dom/test-utils';
import wait from 'waait';

export async function actAndUpdate(component, f) {
  await act(async () => {
    f();
    await wait(0);
    component.update();
  });
}
