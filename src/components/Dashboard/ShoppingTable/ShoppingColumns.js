export const shopping_columns = [
    {
      title: "Item name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Brand",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Remove",
      dataIndex: "expiration_date",
      key: "expiration_date",
    },
  ];
  