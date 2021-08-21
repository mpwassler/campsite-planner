const responseGraph =    {
      nodes: [
        {
          name: 'grand teton national park',
          type: 'activity',
          properties: {
            name: 'grand teton national park',
            lat: 43.8431892,
            lon: -110.6058014
          }
        },
        {
          name: 'Gros Ventre Campground',
          type: 'campsite',
          properties: {
            name: 'Gros Ventre Campground',
            lat: 43.6163233,
            lon: -110.6668715
          }
        },
        {
          name: 'Headwaters Campground at Flagg Ranch',
          type: 'campsite',
          properties: {
            name: 'Headwaters Campground at Flagg Ranch',
            lat: 44.1059239,
            lon: -110.6710516
          }
        },
        {
          name: 'Colter Bay Campground',
          type: 'campsite',
          properties: {
            name: 'Colter Bay Campground',
            lat: 43.9046609,
            lon: -110.6403078
          }
        },
        {
          name: 'Blackrock Ranger District',
          type: 'campsite',
          properties: {
            name: 'Blackrock Ranger District',
            lat: 43.8242,
            lon: -110.3528
          }
        },
        {
          name: 'TETON CANYON',
          type: 'campsite',
          properties: { name: 'TETON CANYON', lat: 43.7566667, lon: -110.9188889 }
        },
        {
          name: 'Signal Mountain Lodge Campground',
          type: 'campsite',
          properties: {
            name: 'Signal Mountain Lodge Campground',
            lat: 43.8407684,
            lon: -110.6152045
          }
        },
        {
          name: 'REUNION FLAT',
          type: 'campsite',
          properties: { name: 'REUNION FLAT', lat: 43.7575, lon: -110.9513889 }
        },
        {
          name: 'Hatchet/Flagstaff Area',
          type: 'campsite',
          properties: { name: 'Hatchet/Flagstaff Area', lat: 43.82, lon: -110.348 }
        },
        {
          name: 'Colter Bay RV Park',
          type: 'campsite',
          properties: { name: 'Colter Bay RV Park', lat: 43.905642, lon: -110.641324 }
        },
        {
          name: 'Lizard Creek Campground',
          type: 'campsite',
          properties: {
            name: 'Lizard Creek Campground',
            lat: 44.0040604,
            lon: -110.6884271
          }
        }
      ],
      edges: [
        {
          from: 'grand teton national park',
          to: 'Gros Ventre Campground',
          weight: 44.82
        },
        {
          from: 'grand teton national park',
          to: 'Headwaters Campground at Flagg Ranch',
          weight: 41.75
        },
        {
          from: 'grand teton national park',
          to: 'Colter Bay Campground',
          weight: 23.61
        },
        {
          from: 'grand teton national park',
          to: 'Blackrock Ranger District',
          weight: 27.82
        },
        {
          from: 'grand teton national park',
          to: 'Signal Mountain Lodge Campground',
          weight: 6.86
        },
        {
          from: 'grand teton national park',
          to: 'Hatchet/Flagstaff Area',
          weight: 28.08
        },
        {
          from: 'grand teton national park',
          to: 'Colter Bay RV Park',
          weight: 22.77
        },
        {
          from: 'grand teton national park',
          to: 'Lizard Creek Campground',
          weight: 33.45
        },
        {
          from: 'Gros Ventre Campground',
          to: 'grand teton national park',
          weight: 44.82
        },
        {
          from: 'Headwaters Campground at Flagg Ranch',
          to: 'grand teton national park',
          weight: 41.75
        },
        {
          from: 'Colter Bay Campground',
          to: 'grand teton national park',
          weight: 23.61
        },
        {
          from: 'Blackrock Ranger District',
          to: 'grand teton national park',
          weight: 27.82
        },
        {
          from: 'Signal Mountain Lodge Campground',
          to: 'grand teton national park',
          weight: 6.86
        },
        {
          from: 'Hatchet/Flagstaff Area',
          to: 'grand teton national park',
          weight: 28.08
        },
        {
          from: 'Colter Bay RV Park',
          to: 'grand teton national park',
          weight: 22.77
        },
        {
          from: 'Lizard Creek Campground',
          to: 'grand teton national park',
          weight: 33.45
        }
      ]
    }

export default responseGraph