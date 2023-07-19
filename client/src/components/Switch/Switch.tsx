import { styled as MUstyled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from 'styled-components';
import Tooltip from '../Tooltip/Tooltip.tsx';

const Android12Switch = MUstyled(Switch)(({ theme }) => ({
  padding: 8,
  '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track':
    {
      backgroundColor: 'var(--primary-color)',
    },
  '& .css-j204z7-MuiFormControlLabel-root':
  {
    display: 'flex',
    marginRight: 0,
  },
  '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked': {
    color: 'var(--primary-color)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: 'var(--gray-color)',
    '&:before, &:after': {
      content: '""',
      top: '50%',
      transform: 'translateY(-50%)',
      height: 16,
    },
    '&:before': {
      left: 12,
    },
    '&:after': {
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
    backgroundColor: 'var(--white-color)',
  },
}));

const Section = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  font-weight: bold;
  width: 340px;
`;

export default function CustomizedSwitches() {
  return (
    <Section>
      공병<Tooltip></Tooltip>
      <FormGroup>
        <FormControlLabel control={<Android12Switch />} label="" />
      </FormGroup>
    </Section>
  );
}
