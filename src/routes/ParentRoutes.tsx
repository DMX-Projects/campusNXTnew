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
// import { i } from "framer-motion/client";
// Or, if the file is named 'Dashboard/index.tsx':
// import ParentDashboard from "../pages/Parent/Dashboard";

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

            {/* <Route path="/parent/feedetails" element={<Feedetails   />} />
            <Route path="/parent/noticeboard" element={<Noticeboard />} />
            <Route path="/parent/child-classroom" element={<YourChildClassroomAttendance />} />
            <Route path="/parent/your-child-results" element={<YourChildResults />} />
           
            <Route path="/parent/talk-to-mentor" element={<TalkToMentor />} /> */}
            {/* <Route path="*" element={<Navigate to="/parent/inbox" replace />} /> */}
        </Routes>
    );
};

export default ParentRoutes;
