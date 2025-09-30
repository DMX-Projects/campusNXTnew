import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DataManagement from '../pages/PrincipalModules/Administration/DataManagement';


const MasterRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/home/data-management" element={<DataManagement />} />

    </Routes>
  );
};

export default MasterRoutes;