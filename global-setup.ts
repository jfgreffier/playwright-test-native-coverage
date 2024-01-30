import * as fs from 'fs';
import * as path from 'path';

const C8Output = path.join(process.cwd(), 'coverage/tmp');

async function globalSetup() {
  await fs.promises.rm(C8Output, { force: true, recursive: true });
}

export default globalSetup;
