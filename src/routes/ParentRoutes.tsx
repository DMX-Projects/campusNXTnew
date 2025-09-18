import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

// import ParentDashboard from "../components/Dashboard/ParentDashboard";
import Inbox from "../pages/ChairpersonModule/parent/Inbox";
 import Noticeboard from "../pages/ChairpersonModule/parent/Noticeboard";

import YourChildClassroom from "../pages/ChairpersonModule/parent/Yourchildclassroom";
 import YourchildResults from "../pages/ChairpersonModule/parent/Yourchildresults";
 import YourChildHostelAttendance from "../pages/ChairpersonModule/parent/Yourchildhostelattendence";
import Feedetails from "../pages/ChairpersonModule/parent/Feedetails";
 import TalkToMentor from "../pages/ChairpersonModule/parent/Talktomentor";
 import Ticketraised from "../pages/ChairpersonModule/chairpersonparent/Ticketraised";
import Parentdirectory from "../pages/FacultyModules/Parentdirectory";
import Parentnotifications from "../pages/FacultyModules/Parentnotificatins";
import Parentmessages from "../pages/FacultyModules/Parentmessages";
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
