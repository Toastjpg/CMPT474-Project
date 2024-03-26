import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'

// NOTE
// https://medium.com/@jimenezraul1981/integrating-auth0-with-react-and-node-js-express-56078ec4f572
export function Auth0Shard({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      // NOTE: https://stackoverflow.com/questions/40354720/angular2-with-auth0-do-i-need-to-hide-my-clientid-and-domain
      domain="dev-h8ei3oqr6d8raypd.us.auth0.com"
      clientId="7mwVRJhEkvKcj2aoG3MWVwFMc7KJNAct"
      authorizationParams={{
        // NOTE: https://stackoverflow.com/questions/76614201/auth0-loginlogout-profile-not-working-react-typescript
        redirectUri: window.location.origin
      }}>
      {children}
    </Auth0Provider>
  )
}

