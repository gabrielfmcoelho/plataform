import type { UserConfig } from 'types/user-config';

export const mockUserConfigs: UserConfig[] = [
  {
    id: 1,
    userId: 1,
    serviceConfigs: [
      {
        serviceId: 1,
        isPinned: true
      },
      {
        serviceId: 2,
        isPinned: false
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    serviceConfigs: [
      {
        serviceId: 1,
        isPinned: false
      },
      {
        serviceId: 2,
        isPinned: false
      },
    ],
  }
];