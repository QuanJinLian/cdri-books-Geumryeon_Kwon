import { RouterProvider } from 'react-router-dom';
import './assets/style/reset.scss';
import './assets/style/main.scss';
import { routerConfig } from './router';

function App() {
  //로그인 화면이 없어 해당 로직 없음
  const router = routerConfig.publicRouter;

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
