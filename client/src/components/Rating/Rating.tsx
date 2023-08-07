import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { styled as MUstyled } from '@mui/material/styles';
import { styled } from 'styled-components';
import { perfumeInfos, gradeDto } from '../../types/PostInfoType';

interface AddRatingProps {
  perfumes: perfumeInfos[];
  grades: gradeDto[];
}

interface PerfumeRatingBoxProps {
  name: string;
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  width: 300px;
`;

const StyledRating = MUstyled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'var(--primary-color)',
  },
});

function PerfumeRatingBox({ name }: PerfumeRatingBoxProps) {
  return <>{name}</>;
}

export default function AddRating({ perfumes, grades }: AddRatingProps) {
  return (
    <>
      <Stack spacing={0}>
        {perfumes.map((perfume) => {
          const grade = grades.find((item) => item.perfumeId === perfume.perfumeId);
          const rate = grade ? grade.rate : 0;

          return (
            <StyledDiv key={perfume.perfumeId}>
              <PerfumeRatingBox name={perfume.nameOrg} />
              <StyledRating name={`rating-${perfume.perfumeId}`} defaultValue={rate} precision={1} />
            </StyledDiv>
          );
        })}
      </Stack>
    </>
  );
}
