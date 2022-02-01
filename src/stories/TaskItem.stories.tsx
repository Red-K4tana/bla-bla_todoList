import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {TaskItem} from "../components/TaskItem";
import {ReduxStoreProviderDecorator, taskId_2_2, todolistId_2} from "./decorators/ReduxStoreProviderDecorator";



export default {
  title: 'TODOLIST/TaskItem',
  component: TaskItem,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TaskItem>;

const Template: ComponentStory<typeof TaskItem> = (args) => <TaskItem {...args} />;

export const TaskItemStory = Template.bind({});

TaskItemStory.args = {
    todolistId: todolistId_2,
    taskId: taskId_2_2,
};

