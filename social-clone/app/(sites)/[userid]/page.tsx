import RecommendedBar from "@/Components/Layout/RecommendedBar";
import SideBar from "@/Components/Layout/SideBar";
import UserProfile from "@/Components/users/UserProfile";

const page = () => {
  return (
    <main className="flex overflow-hidden w-full h-screen">
      <SideBar />
      <UserProfile />
      <div className="max-lg:hidden">
        <RecommendedBar />
      </div>
    </main>
  );
};

export default page;
