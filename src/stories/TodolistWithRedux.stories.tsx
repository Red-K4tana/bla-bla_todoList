import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {TodolistWithRedux} from "../TodolistWithRedux";
import {ReduxStoreProviderDecorator, todolistId_1} from "./decorators/ReduxStoreProviderDecorator";


export default {
  title: 'TODOLIST/TodolistWithRedux',
  component: TodolistWithRedux,
  decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof TodolistWithRedux>;


const Template: ComponentStory<typeof TodolistWithRedux> = (args) => <TodolistWithRedux {...args} />;

export const TodolistWithReduxStory = Template.bind({});

TodolistWithReduxStory.args = {
  todolistId: todolistId_1
};


