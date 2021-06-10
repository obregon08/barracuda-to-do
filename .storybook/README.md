# Storybook

**DEFINITION:** Storybook is an open source tool for developing UI components in isolation for React, Vue, Angular, and more.
It makes building stunning UIs organized and efficient.

It's not a component kit like Material-UI or Bootstrap. Storybook is "a browser" or "catalog" to preview how components look like.
Storybook serves as the sample integration for each component.

URL: https://storybook.js.org/

## Methodology (aka the development process):

1. A developer starts working on a component by creating the component's shell structure.

```tsx
// file: MyComponent.tsx

import { FunctionComponent } from "react"

const MyComponent: FunctionComponent = () => {
  return <div>Hello world</div>
}

export default MyComponent
```

2. The developer creates a "ComponentName.stories.tsx" file to preview the component in Storybook.

```tsx
// file: MyComponent.stories.tsx

import { Meta, Story } from "@storybook/react"

import MyComponent from "./MyComponent"

export default {
  // this file will render on Storybook's sidebar under "UI > organisms > MyComponent"
  title: "ui/organisms/MyComponent",
  component: MyComponent,
  argTypes: {},
} as Meta

const Template: Story = (args, { globals }) => <MyComponent {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {}
```

3. The developer starts Storybook by calling `yarn sb`. A browser window will open on `http://localhost:9001/`.
   The newly created "story" for the component should display in the sidebar.
   You can use the search bar to look for it as well.
4. The developer continues working on the component until it's ready for QA to review it.

5. The QA engineer will compare the component with the provided design mocks and functionality specs by browsing Storybook.

## Mock data:

Most of the time we develop a component that needs to fetch data from the DB. We don't need "real" data when testing
the component in Storybook, so we need to provide mock data for it.

Given that components use "react hooks" to fetch data via Axios, we need to mock the Axios network requests.

Let's look at the sample "FacilitiesList". It's fetching data using the "useFacilities" hooks, which calls `/api/facilites/`.

```tsx
// file: /ui/organisms/FacilitiesList.tsx

import { FunctionComponent } from "react"
import styled from "styled-components"

import useFacilities from "../../providers/useFacilities"
import Loading from "../atoms/Loading"

const Wrapper = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.darkGray};
  align-self: flex-start;
  padding: 10px;
  margin: 10px;
`

const FacilitiesList: FunctionComponent = () => {
  // specific name for each response, since we might have multiple data fetching hooks here
  const { data: facilities, isLoading: isLoadingFacilities, error: errorOnFacilities } = useFacilities()

  return (
    <Wrapper>
      <p>This is a list of facilities:</p>

      {isLoadingFacilities ? (
        <Loading />
      ) : (
        <>
          {!errorOnFacilities ? (
            <ul>
              {facilities.map((f) => (
                <li key={f.id}>{f.name}</li>
              ))}
            </ul>
          ) : (
            <div>There was an error loading facilities</div>
          )}
        </>
      )}
    </Wrapper>
  )
}

export default FacilitiesList
```

How do we write a Story to mock the request to `/api/facilities/`? First we create the "ComponentName.mock.tsx" file.

```tsx
// file: /ui/organisms/FacilitiesList.mock.tsx

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import MockAdapter from "axios-mock-adapter"

const facilitiesListApiMock = (apiMock: MockAdapter): void => {
  apiMock.onGet("/api/facilities/").reply(200, [
    {
      id: 1,
      name: "This is mocked facility A",
    },
    {
      id: 2,
      name: "This is mocked facility B",
    },
  ])
}

export default facilitiesListApiMock
```

And then create the actual story that imports both the mock and the component.

```tsx
// file: /ui/organisms/FacilitiesList.stories.tsx

import { Meta, Story } from "@storybook/react"

import AxiosMock from "../../services/AxiosMock"
import facilitiesListApiMock from "./FaciliitiesList.mock"
import FacilitiesList from "./FacilitiesList"

export default {
  title: "ui/organisms/FacilitiesList",
  component: FacilitiesList,
  argTypes: {},
  decorators: [
    (Story) => (
      <AxiosMock mock={facilitiesListApiMock}>
        <Story />
      </AxiosMock>
    ),
  ],
} as Meta

const Template: Story = (args, { globals }) => <FacilitiesList {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {}
```

## Components with shared state

Given a component that uses a hook to read/write data that is shared with other components
(à la Redux, but using singletone react hooks instead), reset the state every time the story loads.
Otherwise, setting a value on one story might affect how another story is rendered.

```tsx
// file: Notifications.tsx
// This file renders a component with a list of notifications and adds notifications to the shared "store".

import { FunctionComponent } from "react"

import { setNotifications, useNotifications } from "../../providers/useNotifications"

const Notifications: FunctionComponent = () => {
  // here we read notifications
  const notifications = useNotifications()

  const handleSetNotifications = () => {
    // here we set notifications
    setNotifications([...notifications, { id: Math.random(), message: "New Notification" }])
  }

  return (
    <div>
      <p>
        Notifications share some data with other components: <br />
        ====================================== <br />
        Current notifications <br />
      </p>
      <ul>
        {notifications?.map((notification, i) => (
          <li key={notification.id}>
            #{i + 1} - {notification.message}
          </li>
        ))}
      </ul>
      <p>
        <button type="button" className="btn btn-primary" onOpenDrawer={handleSetNotifications}>
          Add notification
        </button>
      </p>
    </div>
  )
}

export default Notifications
```

The story that renders the component but resets the shared store before rendering the story:

```tsx
// file: Notifications.stories.tsx

import { Meta, Story } from "@storybook/react"
import { useEffect } from "react"

import { initData, setNotifications, useNotifications } from "../../providers/useNotifications"
import Notifications from "./Notifications"

export default {
  title: "ui/organisms/Notifications",
  component: Notifications,
  argTypes: {},
  decorators: [
    (Story) => {
      useNotifications()

      // Reset the hook's state on Story load. This will avoid rendering the story with data
      // from interaction with other stories. You could set mock data here if you need to just
      // by providing an arbitrary value to `initData`.
      // IMPORTANT: This will clear the store state when you switch Storybook's language in the UI.
      useEffect(() => {
        try {
          setNotifications(initData)
        } catch (err) {
          // we know it's going to throw an error on the first call
          // since it's expected, just silently swallow the error
        }
      }, [])

      return <Story />
    },
  ],
} as Meta

const Template: Story = (args, { globals }) => <Notifications {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {}
```
