import {createRoot} from 'react-dom/client';
import {Button} from 'ui';
import {api} from '#preload';

const root = createRoot(document.getElementById('app')!);

api.invoke('sum', {a: 1, b: 2}).then(sum => {
  console.log(sum);
});
root.render(
  <div>
    Hello World
    <Button />
  </div>,
);
