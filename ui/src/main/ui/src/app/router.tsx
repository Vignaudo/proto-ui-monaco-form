import React, { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';

import { paths } from '@/config/paths';


export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: async () => {
        const module = await import('./routes/landing');
        return { element: <module.default /> };
      },
    },
    {
      path: paths.settings.path,
      lazy: async () => {
        const module = await import('./routes/editor');
        return { element: <module.default /> };
      },
    },
    {
      path: '*',
      lazy: async () => {
        const module = await import('./routes/not-found');
        return { element: <module.default /> };
      },
    },
  ]);

export const AppRouter = () => {

  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};