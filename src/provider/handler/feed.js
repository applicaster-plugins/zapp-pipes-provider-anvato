import { api } from '../../api';
import { createFeedItem } from '../../utils';
import { mapItem } from '../../mappers/mapItem';

export async function feed(params) {
  const { title: ptitle } = params;

  try {
    const result = await api.feed();
    const entry = result.map(mapItem);
    return createFeedItem(entry, ptitle);
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
