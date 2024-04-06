import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import boardApi from '../api/boardApi';
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StartBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Kanban from '../components/common/Kanban';

const Board = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardApi.getOne(boardId);
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsFavourite(res.isFavourite);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    };
    getBoard();
  }, [boardId]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton variant='outlined'>
          {isFavourite ? (
            <StarOutlinedIcon color='warning' />
          ) : (
            <StartBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant='outlined' color='error'>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <box>
          {/* for emoji picker */}
          <TextField
            value={title}
            placeholder='Untitled'
            variant='outlined'
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
              '& .MuiOutlinedInput-root': {
                fontSize: '2rem',
                fontWeight: '700',
              },
            }}
          />
          <TextField
            value={description}
            placeholder='Add a descreption here'
            variant='outlined'
            multiline
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
              '& .MuiOutlinedInput-root': { fontSize: '0.8rem' },
            }}
          />
        </box>
        <Box>
          {/* board code */}
          <Kanban data={sections} boardId={boardId} />
        </Box>
      </Box>
    </>
  );
};

export default Board;
