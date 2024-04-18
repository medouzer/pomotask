import axiosClient from './axiosClient';

const pomodoroApi = {
  create: (param) => axiosClient.post('pomodoros', param),
  getAll: () => axiosClient.get('pomodoros'),
  updatestatus: (id, param) => axiosClient.put(`pomodoros/updatestatus/${id}`, param),
  update: (id, param) => axiosClient.put(`pomodoros/update/${id}`, param),
};

export default pomodoroApi;
