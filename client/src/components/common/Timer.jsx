import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Container, Box } from '@mui/material';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useState, useEffect, useRef } from 'react';
import { Slider, Button } from '@mui/material';
import pomodoroApi from '../../api/pomodoroApi';

class pomodoro {
	constructor(_id, isPaused, secondsLeft, totalSeconds, status, type) {
		this._id = _id;
		this.isPaused = isPaused;
		this.secondsLeft = secondsLeft;
		this.totalSeconds = totalSeconds;
		this.status = status;
		this.type = type;
		this.minutes = Math.floor(this.secondsLeft / 60);
		this.seconds = this.secondsLeft % 60;
	}

	_id;
	isPaused;
	secondsLeft;
	totalSeconds;
	status;
	type;
	minutes;
	seconds;
}

const Timer = () => {
	const [check, setCheck] = useState(false);
	const [pomodoroObj, setPomodoroObj] = useState(new pomodoro(-1, true, 25 * 60, 25 * 60, 'pause', 'work'));
	const [workMin, setWorkMin] = useState(25);
	const [breakMin, setBreakMin] = useState(5);

	const MIN = 0;
	const MAX = 100;

	let percentage = Math.round(
		(pomodoroObj.secondsLeft / pomodoroObj.totalSeconds) * 100
	);

	const settings = () => {
		setCheck(!check);
	};

	const timerSettings = (newValue, sliderType) => {
		if (sliderType === 'work') {
			setWorkMin(newValue);
		} else if (sliderType === 'break') {
			setBreakMin(newValue);
		}
	};

	const createPomodoro = async () => {
		const workTime_seconds = workMin * 60;
		const breakTime_seconds = breakMin * 60;
		await pomodoroApi.create({
			time: workTime_seconds,
			break_time: breakTime_seconds,
		});
		setCheck(false);
	};

	const SetPomodoro = async () => {
		const workTime_seconds = workMin * 60;
		const breakTime_seconds = breakMin * 60;
		await pomodoroApi.update(pomodoroObj._id, {
			time: workTime_seconds,
			break_time: breakTime_seconds,
		});
		setCheck(false);
		return pomodoro_work();
	}

	const pomodoro_work = async () => {
		const pomodoroRes = await pomodoroApi.getAll();
		if (pomodoroRes.length > 0) {

			// setWorkMin(Math.floor(pomodoroRes[0].secondsLeft / 60));
			// setBreakMin(Math.floor(pomodoroRes[0].break_time / 60));

			console.log(pomodoroRes[0].time);
			console.log(pomodoroRes[0].break_time);

			setPomodoroObj(
				new pomodoro(
					pomodoroRes[0]._id,
					pomodoroRes[0].isPaused,
					pomodoroRes[0].secondsLeft,
					pomodoroRes[0].totalSeconds,
					pomodoroRes[0].status,
					pomodoroRes[0].type
				)
			);
		} else {
			await createPomodoro();
			return pomodoro_work();
		}
	}

	const handleStatus = async () => {
		if (pomodoroObj.isPaused) {
			await pomodoroApi.updatestatus(pomodoroObj._id, {
				status: 'play',
			});
			return pomodoro_work();
		} else {
			await pomodoroApi.updatestatus(pomodoroObj._id, {
				status: 'pause',
				time: pomodoroObj.secondsLeft,
			});
			return pomodoro_work();

		}
	};

	useEffect(() => {
		pomodoro_work();
	}, []);

	useEffect(() => {
		const pomodoroInterval = setInterval(() => {
			if (pomodoroObj.isPaused || (pomodoroObj.secondsLeft <= 0 && pomodoroObj.type === 'break')) {
				return;
			}
			if (pomodoroObj.secondsLeft <= 0 && pomodoroObj.type === 'work') {
				pomodoro_work();
				return;
			}

			const leftSeconds = pomodoroObj.secondsLeft - 1;
			let seconds = leftSeconds % 60;
			if (seconds < 10) seconds = '0' + seconds;
			setPomodoroObj(new pomodoro(pomodoroObj._id, pomodoroObj.isPaused, leftSeconds, pomodoroObj.totalSeconds, pomodoroObj.status, pomodoroObj.type));
		}, 1000);
		return () => clearInterval(pomodoroInterval);

	}, [pomodoroObj]);

	return (
		<Container component='main' maxWidth='xs'>
			{!check && (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Box sx={{ marginTop: '20px' }}>
						<CircularProgressbar
							value={percentage}
							text={pomodoroObj.minutes + ':' + (pomodoroObj.seconds < 10 ? "0" + pomodoroObj.seconds : pomodoroObj.seconds)}
							styles={buildStyles({
								textColor: '#fff',
								pathColor: pomodoroObj.type === 'work' ? 'red' : 'green',
								tailColor: 'rgba(255,255,255,.2)',
							})}
						/>
					</Box>
					<Box
						sx={{
							justifyContent: 'center',
							display: 'flex',
							marginTop: '20px',
						}}
					>
						{pomodoroObj.isPaused ? (
							<PlayCircleOutlineOutlinedIcon
								fontSize='large'
								onClick={handleStatus}
							/>
						) : (
							<PauseCircleOutlineOutlinedIcon
								fontSize='large'
								onClick={handleStatus}
							/>
						)}
					</Box>
					<Button
						variant='outlined'
						startIcon={<SettingsOutlinedIcon />}
						onClick={settings}
						sx={{ marginTop: '20px' }}
					>
						Settings
					</Button>
				</div>
			)}
			{check && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<h1 style={{ justifyContent: 'center', textAlign: 'center' }}>
						Settings
					</h1>
					<Box
						sx={{
							justifyContent: 'center',
							marginTop: '20px',
						}}
					>
						<label>Work: {workMin}:00</label>
						<Slider
							step={5}
							value={workMin}
							valueLabelDisplay='auto'
							min={MIN}
							max={MAX}
							onChange={(event, newValue) => timerSettings(newValue, 'work')}
						/>
						<label>Break: {breakMin}:00</label>
						<Slider
							step={5}
							value={breakMin}
							valueLabelDisplay='auto'
							min={MIN}
							max={MAX}
							onChange={(event, newValue) => timerSettings(newValue, 'break')}
							color='secondary'
						/>
					</Box>
					<Button
						variant='contained'
						color='primary'
						sx={{ marginTop: '50px', marginLeft: '70px', marginRight: '70px' }}
						onClick={SetPomodoro}
					>
						Set
					</Button>
					<Button
						variant='contained'
						color='error'
						sx={{ marginTop: '50px', marginLeft: '70px', marginRight: '70px' }}
						onClick={settings}
					>
						Back
					</Button>
				</div>
			)}
		</Container>
	);
};

export default Timer;
