# Blokay React

## Installation

```bash
npm install @blokay/react
```

## Usage

### Configure Blokay Provider

```tsx
import { BlokayProvider } from "@blokay/react";
let data: any = {}; // send any data
let session = await createSession(data);
const businessId = process.env.VITE_BLOKAY_BUSINESS_ID;

render(
  <BlokayProvider businessId={businessId}>
    <App />
  </BlokayProvider>
);
```

### SignIn SignOut, Call Block

```tsx
import { SignIn, SignOut, SignForm, Block } from "@blokay/react";

function View() {
  return (
    <div>
      <SignIn>
        <Block neuronKey="reporte.cuentas.proveedor" />
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
``` -->

## Author

[Blokay](https://blokay.com)

## License

MIT
