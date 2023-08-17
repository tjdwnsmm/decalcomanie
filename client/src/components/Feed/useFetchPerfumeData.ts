import { useState, useEffect } from 'react';
import axios from '../../api/apiController';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import { EachFeedInfo, FeedDetail } from '../../types/FeedInfoType';

interface FetchProps {
  heartCnt: number;
  lastArticleId: number;
  id: string;
}

// const [urlTab, setUrlTab] = useState('');

export const useFetchPerfumeDatas = ({
  heartCnt,
  lastArticleId,
  id,
}: FetchProps) => {
  const [datas, setDatas] = useState<EachFeedInfo[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDatas = async (
    id: string,
    heartCnt: number,
    lastArticleId: number,
  ) => {
    try {
      setIsLoading(true); // Set isLoading to true before making the API call
      const response = await axios.post(`/sns/perfume/${id}`, {
        dataSize: 20,
        heartCnt: heartCnt === -1 ? null : heartCnt,
        lastArticleId: lastArticleId === -1 ? null : lastArticleId,
      });

      setIsLastPage(
        response.data[0].lastPage ? response.data[0].lastPage : false,
      );
      //console.log('response', response);
      setDatas((prevDatas) => [...prevDatas, ...response.data]);

      //console.log(datas);

      //console.log(
      //   `지난 마지막 article id : ${lastArticleId} && 지난 마지막 찜 갯수 : ${heartCnt}`,
      // );
    } catch (error) {
      // console.error('Error fetching datas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // setUrlTab(urlTab);
    //console.log(`isLast? ${isLastPage}`);
    if (!isLastPage && !isLoading) {
      fetchDatas(id, heartCnt, lastArticleId);
      //console.log(`${pageNumber + 1}번째 호출!`);
    }
  }, [pageNumber, isLastPage]);

  const loadMore = () => {
    if (!isLastPage && !isLoading) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  return {
    data: datas,
    hasNextPage: !isLastPage,
    isFetching: pageNumber > 0 && isLastPage,
    fetchNextPage: loadMore,
    isLoading: isLoading,
  };
};
