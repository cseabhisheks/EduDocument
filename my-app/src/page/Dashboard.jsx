import Stats from "../layout/Stats";
import QuickActions from "../layout/QuickActions";
import RecentDocuments from "../layout/RecentDocument";
import AnnouncementsCard from "../layout/AnnouncementsCard";


const Dashboard = () => {
    return (

        <>
            <Stats />
            <QuickActions />
            <div className="grid md:grid-cols-2 p-10 gap-5">
                <RecentDocuments />
                <AnnouncementsCard />
            </div>
    
        </>


    );
};

export default Dashboard;