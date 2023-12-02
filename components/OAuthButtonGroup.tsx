import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import { GitHubIcon, GoogleIcon, TwitterIcon } from './ProviderIcons'
import { useSession, signIn, signOut } from 'next-auth/react';

const providers = [
  // { name: 'Google', icon: <GoogleIcon /> },
  // { name: 'Twitter', icon: <TwitterIcon /> },
  { name: 'GitHub', icon: <GitHubIcon /> },
]

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="secondary" spacing="4">
    {providers.map(({ name, icon }) => (
      <Button onClick={() => signIn()} key={name} flexGrow={1}>
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
)