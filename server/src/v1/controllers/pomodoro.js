const Pomodoro = require('../models/pomodoro');

class pomodoro {
    constructor(isPaused, secondsLeft, totalSeconds, status, type) {
        this.isPaused = isPaused;
        this.secondsLeft = secondsLeft;
        this.totalSeconds = totalSeconds;
        this.status = status;
        this.type = type;
        this.minutes = Math.floor(this.secondsLeft / 60);
        this.seconds = this.secondsLeft % 60;
    }

    isPaused;
    secondsLeft;
    totalSeconds;
    status;
    type;
    minutes;
    seconds;
}

exports.create = async (req, res) => {
    try {
        const { time, break_time } = req.body;
        const pomo = await Pomodoro.find({ user: req.user._id });

        if (pomo.length === 0) {
            const pomodoro = await Pomodoro.create({
                user: req.user._id,
                time: time,
                totaltime: time,
                break_time: break_time,
            });
            res.status(201).json(pomodoro);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAll = async (req, res) => {
    try {
        let pomodoros = await Pomodoro.find({ user: req.user._id });
        let pomodoro = new Array();
        for (let i = 0; i < pomodoros.length; i++) {
            const date = new Date();
            // pomodoros[i].time -= (date.getTime() - pomodoros[i].created_at.getTime()) / 1000;
            //   const totaltime = pomodoros[i].time;

            if (pomodoros[i].status != 'pause') {
                pomodoros[i].time = Math.floor(
                    pomodoros[i].time - (date.getTime() - pomodoros[i].created_at.getTime()) / 1000
                );
            }

            if (pomodoros[i].time < 0) {
                const breakRest = pomodoros[i].break_time;
                if (breakRest < 0) {
                    await Pomodoro.findOneAndDelete({ _id: pomodoros[i]._id });
                    return res
                        .status(200)
                        .json(await Pomodoro.find({ user: req.user._id }));
                } else {
                    await Pomodoro.findOneAndUpdate( { _id: pomodoros[i]._id }, {
                        time: breakRest,
                        totaltime: breakRest,
                        status: 'pause',
                        created_at: new Date(),
                        type: 'break',
                        break_time: -1,
                    });
                    pomodoros = await Pomodoro.find({ user: req.user._id });
                }
            }

            pomodoro.push({
                _id: pomodoros[i]._id,
                isPaused: pomodoros[i].status == 'pause',
                secondsLeft: pomodoros[i].time,
                totalSeconds: pomodoros[i].totaltime,
                break_time: pomodoros[i].break_time,
                status: pomodoros[i].status,
                type: pomodoros[i].type,
            });
        }
        res.status(200).json(pomodoro);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { time, break_time } = req.body;

        const pomodoros = await Pomodoro.find({ user: req.user._id });
        if (pomodoros.length) {
            pomo = await Pomodoro.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    type: 'work',
                    time: time,
                    totaltime: time,
                    break_time: break_time,
                    created_at: new Date(),
                }
            );
        }
        res.status(200).json(pomodoros);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updatestatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, time } = req.body;
        let pomo;
        if (status != 'pause') {
            pomo = await Pomodoro.findOneAndUpdate(
                { _id: id },
                {
                    status,
                    created_at: new Date(),
                }
            );
        } else {
            pomo = await Pomodoro.findOneAndUpdate(
                { _id: id },
                {
                    status: status,
                    time: time,
                }
            );
        }
        res.status(200).json(pomo);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Pomodoro.findOneAndDelete({ _id: id });
        res.status(200).json('Pomodoro deleted');
    } catch (err) {
        res.status(500).json(err);
    }
};
