import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Todolist} from "../Todolist";
import {action} from "@storybook/addon-actions";
import {v1} from "uuid";


export default {
  title: 'TODOLIST/Todolist',
  component: Todolist,
  args: {
    changeTodolistTitle: action('change Todolist Title'),
    removeTodolist: action('remove Todolist'),
    changeFilter: action('change filter todolist'),
    removeTaskItem: action('remove task item'),
    addTask: action('add task item'),
    changeTaskStatus: action('change Task Status'),
    changeTaskTitle: action('change Task Title'),

  },
} as ComponentMeta<typeof Todolist>;


const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />;

export const TodolistAllStory = Template.bind({});

TodolistAllStory.args = {
  todolistID: '999',
  title: 'todo-storybook',
  filter: 'All',
  tasks: [
      {id: '01', title: "CSS", isDone: false},
      {id: '02', title: "JS", isDone: true},
    ],
};
export const TodolistActiveStory = Template.bind({});

TodolistActiveStory.args = {
  todolistID: '999',
  title: 'todo-storybook',
  filter: 'Active',
  tasks: [
      {id: '01', title: "CSS", isDone: false},
    ],
};

