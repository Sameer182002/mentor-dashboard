import axios from '../axios'

export function getUpcomingbookedSessions() {
    return axios.get(`/ta-session/booked`);
}