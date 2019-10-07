import {
  getArrayFieldValue,
  createMediaGroupItem,
  getVideoSource
} from '../utils';
import moment from 'moment';

export function mapItem(
  auth_id,
  image_key = 'image_base',
  _free = true,
  freeItems = [],
  nonFreeItems = []
) {
  return item => {
    try {
      const {
        guid,
        title: _title,
        description: _summary,
        pubDate: _published,
        link: _link
      } = item;

      const published = moment(
        new Date(getArrayFieldValue(_published))
      ).format();

      const id = getArrayFieldValue(guid, true)._;
      const title = getArrayFieldValue(_title);
      const summary = getArrayFieldValue(_summary);

      const images = item['media:thumbnail'][0];

      const imageKeys = [`url:${image_key}`];
      let media_group = imageKeys
        .map(imageKey => {
          try {
            const arr = imageKey.split(':');
            if (images.$[arr[0]]) {
              return createMediaGroupItem(images.$[arr[0]], arr[1]);
            }
          } catch (err) {
            return null;
          }
        })
        .filter(i => i);

      const link = {
        type: 'text/html',
        rel: 'alternate',
        href: `hearst://play?voditemid=${id}`
      };

      const videos = item['media:group'][0]['media:content'].map(
        video => video.$
      );
      const { src, duration } = getVideoSource(videos);
      const content = { src, type: 'video/hls' };
      const videoAds = [];

      let free = _free;
      if (freeItems && freeItems.indexOf(id) > -1) {
        free = true;
      } else if (nonFreeItems && nonFreeItems.indexOf(id) > -1) {
        free = false;
      }

      const requires_authentication = !free;
      const ds_product_ids = auth_id ? auth_id.split(',') : [];
      const extensions = {
        free,
        auth_id,
        videoAds,
        duration,
        requires_authentication,
        ds_product_ids
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
  };
}
