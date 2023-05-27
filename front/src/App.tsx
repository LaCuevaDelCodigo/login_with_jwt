import { FC } from "react"
import { HomePage } from "./pages/HomePage";
import { MantineProvider } from '@mantine/core';

export const App: FC<{}> = () => {

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        primaryColor: 'indigo',
      }}
    >
      <HomePage />
    </MantineProvider>
  )
}
