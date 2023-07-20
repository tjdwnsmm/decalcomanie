import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { styled as MUstyled } from '@mui/material/styles';

const StyledRating = MUstyled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'var(--primary-color)',
  },
});

export default function HalfRating() {
  return (
    <Stack spacing={1}>
      <StyledRating name="half-rating" defaultValue={0} precision={0.5} />
    </Stack>
  );
}
