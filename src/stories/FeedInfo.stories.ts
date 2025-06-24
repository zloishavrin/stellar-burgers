import { FeedInfoUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/FeedInfo',
  component: FeedInfoUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof FeedInfoUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFeedInfo: Story = {
  args: {
    feed: {
      total: 12,
      totalToday: 2
    },
    readyOrders: [
      {
        _id: '1',
        name: 'Burger',
        status: 'done',
        number: 123,
        createdAt: '2024-01-01T12:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
        ingredients: []
      },
      {
        _id: '2',
        name: 'Burger 2',
        status: 'done',
        number: 124,
        createdAt: '2024-01-01T12:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
        ingredients: []
      }
    ],
    pendingOrders: [
      {
        _id: '3',
        name: 'Burger 3',
        status: 'pending',
        number: 125,
        createdAt: '2024-01-01T12:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
        ingredients: []
      }
    ]
  }
};
