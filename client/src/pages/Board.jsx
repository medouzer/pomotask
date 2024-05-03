import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import boardApi from '../api/boardApi';
import { useNavigate } from 'react-router-dom';

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
import { useDispatch, useSelector } from 'react-redux';
import Kanban from '../components/common/Kanban';
import { setBoards } from '../redux/features/boardSlice';

let timer;
const timeout = 500;

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [icon, setIcon] = useState('');

  const boards = useSelector((state) => state.board.value);

  const getBoard = async () => {
    try {
      const res = await boardApi.getOne(boardId);
      setTitle(res.title);
      setDescription(res.description);
      setSections(res.sections);
      setIcon(res.icon);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBoard();
  }, [boardId]);

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...boards];
    const index = temp.findIndex((e) => e._id === boardId);
    temp[index] = { ...temp[index], title: newTitle };
    dispatch(setBoards(temp));
    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { title: newTitle });
      } catch (err) {
        console.log(err);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    let temp = [...boards];
    const index = temp.findIndex((e) => e._id === boardId);
    temp[index] = { ...temp[index], description: newDescription };
    dispatch(setBoards(temp));
    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { description: newDescription });
      } catch (err) {
        console.log(err);
      }
    }, timeout);
  };

  const deleteBoard = async () => {
    try {
      await boardApi.delete(boardId);
      const newList = boards.filter(e => e.id !== boardId)
      if (newList.length === 0) {
        navigate('/boards')
      } else {
        navigate(`/boards/${newList[0].id}`)
      }
      dispatch(setBoards(newList))
    } catch (err) {
      console.log(err);
    }
  }

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
        <IconButton variant='outlined' color='error' onClick={deleteBoard}>
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
            onChange={updateTitle}
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
            onChange={updateDescription}
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
