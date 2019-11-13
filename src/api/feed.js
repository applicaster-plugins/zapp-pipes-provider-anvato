import axios from 'axios';
import { config } from '../config';

export async function feed() {
  try {
    const response = await axios.get(config.api.baseUrl);
    const result = response.data.docs;
    return result;
  } catch (err) {}
}
