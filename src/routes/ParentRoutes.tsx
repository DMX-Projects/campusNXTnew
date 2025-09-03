import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

// import ParentDashboard from "../components/Dashboard/ParentDashboard";
import Inbox from "../pages/parent/Inbox";
 import Noticeboard from "../pages/parent/Noticeboard";

import YourChildClassroom from "../pages/parent/Yourchildclassroom";
 import YourchildResults from "../pages/parent/Yourchildresults";
 import YourChildHostelAttendance from "../pages/parent/Yourchildhostelattendence";
import Feedetails from "../pages/parent/Feedetails";
 import TalkToMentor from "../pages/parent/Talktomentor";
 import Ticketraised from "../pages/chairpersonparent/Ticketraised";
import Parentdirectory from "../FacultyModules/Parentdirectory";
import Parentnotifications from "../FacultyModules/Parentnotificatins";
import Parentmessages from "../FacultyModules/Parentmessages";
const ParentRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="inbox" element={<Inbox />} />
                <Route path="child-classroom" element={<YourChildClassroom />} />
                 <Route path="child-hostel-attendance" element={<YourChildHostelAttendance  />} />
                <Route path="child-result" element={<YourchildResults />} />
                <Route path="notice-board" element={<Noticeboard />} />
                <Route path="fee-details" element={<Feedetails   />} />
                <Route path="talk-to-mentor" element={<TalkToMentor />} />
                <Route path="ticket-raised" element={<Ticketraised />} />
                <Route path="parent-directory" element={<Parentdirectory />} />
                <Route path="parent-notifications" element={<Parentnotifications />} />
                <Route path="parent-messages" element={<Parentmessages />} />
        </Routes>
    );
};

export default ParentRoutes;
