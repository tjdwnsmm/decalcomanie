import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainFeed } from '../pages/FeedPage/MainFeed';
import { PerfumeFeed } from '../pages/FeedPage/PerfumeFeed';
import SearchTabPage from '../pages/SearchPage/SearchTabPage';
import SearchMyPerfume from '../pages/SearchPage/SearchMyPerfume';
import Post from '../pages/PostPages/Post';
import PostDetail from '../pages/PostDetailPage/PostDetail';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main-feed" element={<MainFeed />}></Route>
        <Route path="/perfume-feed" element={<PerfumeFeed />}></Route>
        <Route path="/search" element={<SearchTabPage />}></Route>
        <Route path="/search-myperfume" element={<SearchMyPerfume />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/post-detail" element={<PostDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
