const getPostCount = async () => {
    const c = await getMembersAPI(id);
    setCount(c);
  };

  useEffect(() => {
    getPostCount();
  });

  // axios 도 만들어야 함