import axios from '../axios'

export async function getTaAvailability(){
    const data = await axios.get('ta-availability/slots')
    return data || []

}
