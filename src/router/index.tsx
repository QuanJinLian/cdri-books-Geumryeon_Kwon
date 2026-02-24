import { createBrowserRouter, RouteObject } from "react-router";
import { MainLayout } from "@/MainLayout";

const publicRouter: RouteObject[] = [
  {
    id: "main",
    path: "/",
    element: <MainLayout />,
    // children: [],
  },
];

// 로그인 로직 필요시 private router 추가
const routerConfig = {
  publicRouter: createBrowserRouter(publicRouter, {
    future: {
      v7_relativeSplatPath: true,
    },
  }),
};

export { publicRouter, routerConfig };
