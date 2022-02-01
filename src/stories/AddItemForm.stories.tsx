import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {AddItemForm} from "../components/AddItemForm";



export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
    args: {
        addItem: action('click add item'),
    }
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    nameButton: 'add item'
};

