import RecommendedUser from "../users/RecommendedUser"
import SearchBar from '../ui/SearchBar';

export default function RecommendedBar() {
  return (
    <div className='flex flex-col border-l h-screen'>
      <SearchBar />
      <RecommendedUser />
    </div>
  )
}
