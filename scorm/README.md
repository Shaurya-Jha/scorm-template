## Step 1 - Build it once
```
cd scorm-core
pnpm install
pnpm build
```

## Step 2 - Global link SCORM package
```
cd scorm-core
pnpm link --global
```

Think of this like:
> "publish locally to your machine"

## Step 3 - Link into any Course project
```
cd course-name
pnpm link --global @scorm/core
```

pnpm will:
> - NOT download anything
> - NOT copy files
> - create symlink -> live link to scorm package

## Step 4 - Use it in Vite

course-one/vite.config.ts
```js
import { defineConfig } from "vite";
import scormCfg from "./scorm.config";
import { scormPlugin } from "@scorm/core";

export default defineConfig({
  plugins: [scormPlugin(scormCfg)]
})
```

## Step 5 - Course config

scorm.config.ts
```js
export default {
  id: "course-one",
  title: "Course One",
  version: "1.0",
  scorm: "2004",
  launch: "index.html",
  output: "course-one.zip"
};
```

## Step 6 - Course build script
```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

## Step 7 - Build course
```
pnpm build
```

### Important

When you change SCORM engine anytime:
```bash
cd scorm-core
pnpm build
```
Courses instantly see updates because symlink points to dist.
No reinstall needed.

### Verify
To verify if the symlink is working or not, inside course do:
```bash
pnpm list @scorm/core
```

You should see:
```bash
linked from global store
```

### Unlink (if needed)

From course:
```bash
pnpm unlink @scorm/core
```

From scorm-core package:
```bash
pnpm unlink --global
```

⚠️ Important Production Rule

pnpm link is for:

local development


For CI / production builds you should also support:

pnpm add file:../org-name/scorm


I usually recommend:

dev → pnpm link
CI → file dependency


Best of both worlds.