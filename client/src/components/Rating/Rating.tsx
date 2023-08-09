import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { styled as MUstyled } from '@mui/material/styles';
import { styled } from 'styled-components';
import { perfumeInfos } from '../../types/PostInfoType';

interface AddRatingProps {
  perfumes: perfumeInfos[];
  rates: number[];
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

export default function AddRating({ perfumes, rates }: AddRatingProps) {
  return (
    <>
      <Stack spacing={0}>
        {perfumes.map((perfume, index) => (
          <StyledDiv key={perfume.perfumeId}>
            <PerfumeRatingBox name={perfume.nameOrg} />
            <StyledRating
              name={`rating-${perfume.perfumeId}`}
              defaultValue={rates[index]}
              precision={1}
            />
          </StyledDiv>
        ))}
      </Stack>
    </>
  );
}
