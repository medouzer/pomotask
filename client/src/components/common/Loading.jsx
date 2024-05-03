import { box, circularProgress } from '@mui/material';

const Loading = (props) => {
  return (
    <box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: props.fullheight ? '100vh' : '100%',
      }}
    >
      <circularProgress />
    </box>
  );
};

export default Loading;
