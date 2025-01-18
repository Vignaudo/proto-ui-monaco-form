import React from 'react';
import { useNavigate } from 'react-router';
import  MainLayout  from '@/components/layouts/main';
import logo from '../../assets/logo.svg';
import { Button } from '@/components/ui/button';


const LandingRoute = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <>
      Hello
      </>
    </MainLayout>
  );
};

export default LandingRoute;