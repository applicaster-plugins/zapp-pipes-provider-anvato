import { createMediaGroupItem } from '../utils';
import moment from 'moment';
import { config } from '../config';

export function mapItem(item) {
  try {
    const {
      obj_id: id,
      c_title_s: title,
      c_description_s: summary,
      c_ts_publish_l: _published,
      u_site_link_s: _link,
      media_url,
      thumbnails
    } = item;

    const published = moment(new Date(_published)).format();

    let media_group = thumbnails
      .map(imageItem => {
        try {
          const { url, role } = imageItem;
          const key = config.imageKeyMapping[role]
            ? config.imageKeyMapping[role]
            : 'image_base';
          return createMediaGroupItem(url, key);
        } catch (err) {
          return null;
        }
      })
      .filter(i => i);

    const link = {
      type: 'text/html',
      rel: 'alternate',
      href: _link
    };

    const src = media_url;
    const content = { src, type: 'video/hls' };

    let free = true;

    const extensions = {
      free
    };

    return {
      type: {
        value: 'video'
      },
      id,
      title,
      published,
      summary,
      media_group,
      content,
      link,
      extensions
    };
  } catch (err) {
    return {};
  }
}
