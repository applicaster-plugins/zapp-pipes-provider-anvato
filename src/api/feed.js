import axios from 'axios';
import { config } from '../config';

export async function feed(url) {
  try {
    const response = await axios.get(url);
    const result = response.data.docs;
    return result;
  } catch (err) {}
}
