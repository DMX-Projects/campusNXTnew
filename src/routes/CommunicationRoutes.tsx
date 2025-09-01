 import HomeDashboard from '../components/Dashboard';
 import PostWall from '../pages/Communication/PostWall';
 import Notification from '../pages/Communication/Notification';
 import Messages from '../pages/Communication/Messages';
 import WhatsApp from '../pages/Communication/WhatsApp';
 import Mail from '../pages/Communication/Mail';
 import MCredits from '../pages/Communication/MCredits';
 import Reports from '../pages/Communication/Reports';
 
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const CommunicationRoute: React.FC = () => {

  return (
    <Routes>
      {/* Default Home Route */}
      <Route index element={<HomeDashboard activeSection="Academics" />} />
      <Route path = "post-on-wall" element ={<PostWall/>}/>
      <Route path = "send-push-notification" element = {<Notification/>}/>
      <Route path = "send-sms" element = {<Messages/>}/>
      <Route path ="send-whatsapp" element = {<WhatsApp/>}/>
      <Route path ="send-email" element ={<Mail/>}/>
      <Route path ="message-credits" element ={<MCredits/>}/>
      <Route path ="reports" element ={<Reports/>}/>
       

      
      {/* Users Routes
      <Route path="users" element={<Users />} />
      <Route path="users/add" element={<AddUser />} />
      <Route path="users/edit/:id" element={<EditUser />} />
      <Route path="users/profile/:id" element={<UserProfile />} />
      
      {/* Settings Routes */}
      {/* <Route path="settings" element={<Settings />} />
      <Route path="settings/general" element={<GeneralSettings />} />
      <Route path="settings/security" element={<SecuritySettings />} /> */}
      
      {/* Reports Routes */}
      {/* <Route path="reports" element={<Reports />} />
      <Route path="analytics" element={<Analytics />} /> */}
      
      {/* Catch all for invalid home routes */}
       {/* <Route path="*" element={<Navigate to="/home" replace />} />  */}
    </Routes>
  );
};

export default CommunicationRoute;