import axios from "axios";

export async function stats(){
    const res=await axios.get('https://babu2.pythonanywhere.com/stats');
    return res.data;
}