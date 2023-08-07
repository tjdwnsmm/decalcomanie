import { useState, useEffect } from 'react';
import axios from '../../api/apiController';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import { Filter } from '../../pages/SearchPage/SearchTabPage';

interface FetchProps {
  filter?: Filter;
  searchKeyword: string;
  newSearch: boolean;
}
export const useFetchDatas = ({
  filter,
  searchKeyword,
  newSearch,
}: FetchProps) => {
  const [datas, setDatas] = useState<PerfumeDetail[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDatas = async () => {
    try {
      setIsLoading(true); // Set isLoading to true before making the API call
      const response = await axios.post('/perfume/search', {
        keyword: searchKeyword,
        brand: filter?.brandId ? filter.brandId : [],
        gender: filter?.gender ? filter.gender : [],
        scent: filter?.scentId ? filter.scentId : [],
      });

      console.log(`적용된 필터 ! : ${JSON.stringify(filter)}`);
      // console.log(
      //   `초기응답 : ${JSON.stringify(datas)} && 새로운 응답 :  ${JSON.stringify(
      //     response.data,
      //   )}`,
      // );
      console.log(`필터 적용한 여부 : ${newSearch}`);
      setDatas((prevDatas) => [...prevDatas, ...response.data]);

      console.log(datas);
      localStorage.setItem('searchResults', JSON.stringify(datas));

      /**
       * !지금 여기 나중에 무한 스크롤 백 코드 받으면 거기서 알려주는 값으로!
       * 이 코드는 지워도됨
       */

      if (pageNumber > 10) {
        setIsLastPage(true);
      }
    } catch (error) {
      console.error('Error fetching datas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(`isLast? ${isLastPage}`);
    if (!isLastPage && !isLoading) {
      fetchDatas();
      console.log(`${pageNumber + 1}번째 호출!`);
    }
  }, [pageNumber, 50, isLastPage]);

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
