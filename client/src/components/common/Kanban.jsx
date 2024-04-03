import { Box, Button, Typography, Divider } from '@mui/material';

const Kanban = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button>Add section</Button>
        <Typography variant='body2' fontWeight='700'>
          {/* {sections.length} Sections */}
        </Typography>
      </Box>
      <Divider sx={{ margin: '10px 0' }} />
    </>
  );
};

export default Kanban;
