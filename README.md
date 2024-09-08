# Blokay React

## Installation

```bash
npm install @blokay/react
```

## Usage

### SignIn SignOut, Call Block

```tsx
import { SignIn, SignOut, SignForm, Block } from "@blokay/react";

function View() {
  return (
    <div>
      <SignIn>
        <web-component blockKey="test" />
      </SignIn>
      <SignOut>
        <SignForm />
      </SignOut>
    </div>
  );
}
```

<!--
### Get Raw JSON

```ts
const callRaw = (blockKey: string, data?: any) => {};
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
``` -->

## Author

[Blokay](https://blokay.com)

## License

MIT
