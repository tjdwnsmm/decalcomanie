import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainFeed } from '../pages/FeedPage/MainFeed';
import { PerfumeFeed } from '../pages/FeedPage/PerfumeFeed';
import SearchTabPage from '../pages/SearchPage/SearchTabPage';
import SearchMyPerfume from '../pages/SearchPage/SearchMyPerfume';
import PerfumeDetail from '../pages/PerfumePage/PerfumeDetail';
import PostDetail from '../pages/PostDetailPage/PostDetail';
import { MyDrawerPage } from '../pages/DrawerPage/MyDrawerPage';
import FollowList from '../pages/MyPage/FollowList';
import Post from '../pages/PostPages/Post';
import MainPage from '../pages/MainPage/MainPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/main-feed" element={<MainFeed />}></Route>
        <Route path="/perfume-feed/:id" element={<PerfumeFeed />}></Route>
        <Route path="/search" element={<SearchTabPage />}></Route>
        <Route path="/search-myperfume" element={<SearchMyPerfume />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/post-detail" element={<PostDetail />}></Route>
        <Route path="/perfume-detail/:id" element={<PerfumeDetail />}></Route>
        <Route path="/my-drawer" element={<MyDrawerPage />}></Route>
        <Route path="/follow-list" element={<FollowList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
