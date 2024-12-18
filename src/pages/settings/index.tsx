import React from 'react';
import Layout from '../../componets/Layout';
import UnderDevelopment from '../../componets/underDevelopment';

const Settings: React.FC = () => {
  const isUnderDevelopment = true; 

  if (isUnderDevelopment) {
    return <UnderDevelopment />;
  }
  return (
    <Layout>
      <div className="p-6 h-full w-full flex flex-col">
        <h1 className="text-2xl font-semibold text-orange-500">Configurações</h1>
        <p className="mt-2 text-orange-400">Aqui você pode ajustar suas preferências.</p>
      </div>
    </Layout>
  );
};

export default Settings;
