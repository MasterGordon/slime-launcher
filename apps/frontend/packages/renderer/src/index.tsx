import {createRoot} from 'react-dom/client';
import {Button} from 'ui';

const root = createRoot(document.getElementById('app')!);

root.render(
  <div>
    Hello World
    <Button />
  </div>,
);
