export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Contents Management',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Category',
      url: '/category',
      icon: 'fa fa-th-large',
    },
    {
      name: 'Posts',
      url: '/post',
      icon: 'fa fa-file-text-o',
      children: [
        {
          name: 'Posts Lists',
          url: '/posts/list',
          icon: 'icon-puzzle',
        },
        {
          name: 'Add post',
          url: '/posts/add',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Series',
      url: '/series',
      icon: 'fa fa-files-o',
      children: [
        {
          name: 'Series Lists',
          url: '/series/list',
          icon: 'icon-puzzle',
        },
        {
          name: 'Add series',
          url: '/series/add',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      title: true,
      name: 'Users Management',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Users',
      url: '/user',
      icon: 'fa fa-user-o',
      children: [
        {
          name: 'Users Lists',
          url: '/users/list',
          icon: 'icon-puzzle',
        },
        {
          name: 'Add users',
          url: '/users/add',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Rank',
      url: '/rank',
      icon: 'fa fa-certificate',
    },
    {
      title: true,
      name: 'System Management',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Homepage Slider',
      url: '/homepage-slider',
      icon: 'fa fa-desktop',
    },
  ],
};
