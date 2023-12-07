import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';
import GamificationList from './components/Admin/GamificationList';
import LeaderboardTable from './components/LeaderboardTable';
//Home hesegt ali componentiig harahiig hereglegchiin erhees shaltgaalj tohiruulj ugsun
const HomeContainer = () => {
  const [userInfo] = useAtom(userInfoAtom);
  return (
    <>
      <div className="w-screen h-screen">
        {userInfo.role === 'Admin' && <GamificationList />}
        {userInfo.role === 'Student' && <LeaderboardTable />}
      </div>
    </>
  );
};
export default HomeContainer;
