import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { styled as MUstyled } from '@mui/material/styles';
import { styled } from 'styled-components';

interface Perfume {
  name: string;
}

interface PerfumeRatingBoxProps {
  name: string;
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledRating = MUstyled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'var(--primary-color)',
  },
});

function PerfumeRatingBox({ name }: PerfumeRatingBoxProps) {
  return <>{name}</>;
}

export default function AddRating({ perfumes }: { perfumes: Perfume[] }) {
  return (
    <>
      <Stack spacing={0}>
        {perfumes.map((perfume, index) => (
          <StyledDiv>
            <PerfumeRatingBox key={index} name={perfume.name} />
            <StyledRating name="half-rating" defaultValue={0} precision={1} />
          </StyledDiv>
        ))}
      </Stack>
    </>
  );
}
