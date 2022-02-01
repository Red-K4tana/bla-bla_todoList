import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Provider} from "react-redux";
import {store} from "../store";
import {AppWithRedux} from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


export default {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],

} as ComponentMeta<typeof AppWithRedux>;


/*const Template: ComponentStory<typeof AppWithRedux> = (args) => <Provider store={store}> <AppWithRedux/></Provider>;*/
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/>;

export const AppWithReduxStory = Template.bind({});

AppWithReduxStory.args = {};


