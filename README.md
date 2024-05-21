# Blokay React

## Installation

```bash
npm install @blokay/react
```

## Usage

### Create Session

```ts
import { createSession } from "@blokay/react";
let data: any = {}; // send any data
let session = await createSession(data);
```

### Call block

```tsx
import { Block, useSession } from "@blokay/react";

function MyView() {
  let session = useSession();

  return (
    <Block
      neuronKey="view.users"
      session={session}
      onSuccess={(data) => console.log(data)}
      onError={(error) => console.log(error)}
    />
  );
}
```

### Get Raw JSON

```ts
const callRaw = (neuronKey: string, data?: any) => {};
```

```tsx
import { callRaw, useSession } from "@blokay/react";

function MyView() {
  let session = useSession();

  const submit = () => {
    let data = {
      taskName: "This is a example title",
      taskType: "task",
    };
    callRaw("task.create", data).then((data) => {
      console.log(data);
    });
  };
}
```
