import { manifest } from './manifest';
import { handler } from './handler';
import { test } from './test';

const provider = {
  name: 'anvatods',
  manifest,
  handler,
  test
};

export default provider;
