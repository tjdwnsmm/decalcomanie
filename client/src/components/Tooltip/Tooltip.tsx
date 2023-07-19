import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ReactComponent as QuestionSvg } from '../../assets/img/question.svg';

const StyledQuestionSvg = styled(QuestionSvg)`
  padding: 0px 25px 0px 20px;
`;

export default function PositionedTooltips() {
  return (
    <Box sx={{ width: 25 }}>
      <Grid container justifyContent="center">
        <Tooltip
          title="추천을 원하시면 해당 토글을 활성화 해주세요."
          placement="top"
          followCursor
        >
          <Box>
            <StyledQuestionSvg />
          </Box>
        </Tooltip>
      </Grid>
    </Box>
  );
}
